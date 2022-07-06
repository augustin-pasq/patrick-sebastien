// Import des dépendances
const { Client, Intents } = require("discord.js");
const { MessageEmbed } = require("discord.js");
var cron = require("node-cron");

// Récupération des données des fichiers
const { token } = require("./config.json");
const data = require("./data.json");

// Création d"une instance de bot
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Parties du messages
const CHANNEL = "986235216479780884" //"682859559680868356";
const MESSAGE_HEAD = "Hey @everyone !"
const MESSAGE_BODY_1 = "fête ses"
const MESSAGE_BODY_2 = "ans aujourd'hui ! Souhaitez-lui un excellent anniversaire ! Bon anniversaire"
const MESSAGE_TAIL = "! :partying_face:"

// Détermine si une date est passée
function isPassed(date) {
	var today = new Date();
	date.setUTCFullYear(today.getUTCFullYear())
	var diff = today.getTime() - date.getTime();

	return (diff > 0) ? true : false;
}

// Fonction de calcul de l"âge
function getAge(date) {
	var diff = Date.now() - date.getTime();
	var age = new Date(diff);

	return Math.abs(age.getUTCFullYear() - 1970);
};

// Fonction de calcul du nombre de jours restants
function remainingDays(date) {
	var today = new Date();
	isPassed(date) ? date.setUTCFullYear(date.getUTCFullYear() + 1) : date;
	var diff = today.getTime() - date.getTime();

	return Math.trunc(Math.abs(diff / (1000 * 3600 * 24)) + 1);
};

function generateEmbed(embed) {
	for (i in data["members"]) {
		var date = new Date(data["members"][i]["year"], data["members"][i]["month"], data["members"][i]["day"]);
		embed.addField(data["members"][i]["name"], `${date.toLocaleDateString("fr-FR", { month: "long", day: "numeric" })} (${getAge(date)} ans)`, true);
	};
};

// Confirmation de lancement du bot
client.once("ready", () => {
	client.user.setActivity("le calendrier", { type: "WATCHING" })
	console.log("Logged in as Le Bot des Joyeux Lurons!");
});

// Envoi des messages d"anniversaire
client.on("ready", () => {
	cron.schedule("* * 0 * * *", () => {
		var today = new Date();

		for (i in data["members"]) {
			if (data["members"][i]["day"] === today.getDate() && data["members"][i]["month"] === today.getMonth()) {

				var date = new Date(data["members"][i]["year"], data["members"][i]["month"], data["members"][i]["day"]);
				var age = getAge(date);

				var message = `${MESSAGE_HEAD} ${data["members"][i]["id"]} ${MESSAGE_BODY_1} ${age} ${MESSAGE_BODY_2} ${data["members"][i]["name"]} ${MESSAGE_TAIL}`;
				client.channels.cache.get(CHANNEL).send(message);
			};
		};
	});
});

// Réponse aux commandes
client.on("interactionCreate", async interaction => {

	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === "birthdays") {
		var membersAge = [];
		for (i in data["members"]) {
			var date = new Date(data["members"][i]["year"], data["members"][i]["month"], data["members"][i]["day"]);
			var age = getAge(date);
			membersAge.push(age);
		};

		var avg = 0;
		for (i in membersAge) {avg += membersAge[i]};
		avg = avg / (membersAge.length);

		const birthdays = new MessageEmbed()
			.setColor("#DD2E44")
			.setTitle("Joyeux anniversaire !")
			.setDescription("Voici tous les anniversaires à souhaiter :")
			.setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Twemoji12_1f973.svg/1200px-Twemoji12_1f973.svg.png")
			.setTimestamp()
			.setFooter({ text: `Moyenne d"âge du serveur : ${Math.round(avg)} ans`, iconURL: "https://cdn.discordapp.com/app-icons/775422653636149278/385a2dbe8bbfd559675a1bd43dbf4990.png" })

		generateEmbed(birthdays);
		await interaction.reply({ embeds: [birthdays] });
	}

	else if (commandName === "next-birthday") {

		var date, age, member;
		for (var i = 2 ; i < data["members"].length ; i++) {
			var memberDate = new Date(data["members"][i]["year"], data["members"][i]["month"], data["members"][i]["day"]);

			date = memberDate;
			age = getAge(memberDate);
			member = i;

			if (!isPassed(memberDate)) break;
		};

		const nextBirthday = new MessageEmbed()
			.setColor("#DD2E44")
			.setTitle("Un anniversaire approche...")
			.setDescription(`Dans ${remainingDays(date)} jours, on arrosera les ${age + 1} ans de ${data["members"][member]["name"]} ! :tada:`)
			.setTimestamp()
			.setFooter({ text: "Le Bot des Joyeux Lurons", iconURL: "https://cdn.discordapp.com/app-icons/775422653636149278/385a2dbe8bbfd559675a1bd43dbf4990.png"})
		await interaction.reply({ embeds: [nextBirthday] });
	}

	else if (commandName === "birthday-info") {
		const givenMember = interaction.options.getUser("membre");

		var member = data["members"].find(member => member["id"] == `<@${givenMember["id"]}>`);

		if (member != undefined) {
			date = new Date(member["year"], member["month"], member["day"]);

			const birthdayInfo = new MessageEmbed()
				.setColor("#DD2E44")
				.setTitle(`L'anniversaire de ${member["name"]}`)
				.setDescription(`${member["name"]} fête son anniversaire le **${date.toLocaleDateString("fr-FR", { month: "long", day: "numeric" })}** et a donc actuellement **${getAge(date)} ans**. Son prochain anniversaire est dans **${remainingDays(date)} jours**. :birthday:`)
				.setTimestamp()
				.setFooter({ text: "Le Bot des Joyeux Lurons", iconURL: "https://cdn.discordapp.com/app-icons/775422653636149278/385a2dbe8bbfd559675a1bd43dbf4990.png" })
			await interaction.reply({ embeds: [birthdayInfo] });
		}

		else {
			const birthdayError = new MessageEmbed()
				.setColor("#DD2E44")
				.setTitle("Désolé, je n'ai trouvé d'anniversaire...")
				.setTimestamp()
				.setFooter({ text: "Le Bot des Joyeux Lurons", iconURL: "https://cdn.discordapp.com/app-icons/775422653636149278/385a2dbe8bbfd559675a1bd43dbf4990.png" })
			await interaction.reply({ embeds: [birthdayError] });
		}
	};
});

// Connexion du bot
client.login(token);