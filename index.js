// Import des dépendances
const { Client, Intents } = require('discord.js');
const { MessageEmbed } = require('discord.js');
var cron = require("node-cron");

// Récupération des données des fichiers
const { token } = require('./config.json');
const data = require('./data.json');

// Création d'une instance de bot
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Parties du messages
const CHANNEL = "682859559680868356";
const MESSAGE_HEAD = "Hey @everyone !"
const MESSAGE_BODY_1 = "fête ses"
const MESSAGE_BODY_2 = "ans aujourd'hui ! Souhaitez-lui un excellent anniversaire ! Bon anniversaire"
const MESSAGE_TAIL = "! :partying_face:"
const MESSAGE_SERVER_TAIL = " ans que nous nous sommes réunis sur ce serveur ! Le temps passe si vite en votre compagnie ! Souvenirs, souvenirs, le premier message du serveur est --> [*cliquez sur le lien*] https://discord.com/channels/682859558934151181/682859559680868356/682859906935685120 :heart:";

// Fonction de calcul de l'âge
function getAge(date) {
	var diff = Date.now() - date.getTime();
	var Age = new Date(diff);

	return Math.abs(Age.getUTCFullYear() - 1970 + 1);
};

// Confirmation de lancement du bot
client.once('ready', () => {
	client.user.setActivity("le calendrier", { type: "WATCHING" })
	console.log('Logged in as Le Bot des Joyeux Lurons!');
});

// Envoi des messages d'anniversaire
client.on("ready", () => {
	cron.schedule("* * * * * *", () => {
		var today = new Date();

		for (i in data['members']) {
			if (data['members'][i]['day'] === today.getDate() && data['members'][i]['month'] === today.getMonth()) {

				var date = new Date(data['members'][i]['year'], data['members'][i]['month'] + 1, data['members'][i]['day']);
				var age = getAge(date);

				// Anniversiare du serveur
				if (data['members'][i]['name'] === "Le serveur") {
					var message = `${MESSAGE_HEAD} Voilà maintenant ${age} ${MESSAGE_SERVER_TAIL}`;
					client.channels.cache.get(CHANNEL).send(message);
				}

				// Anniversaire des membres
				else {
					var message = `${MESSAGE_HEAD} ${data['members'][i]['id']} ${MESSAGE_BODY_1} ${age} ${MESSAGE_BODY_2} ${data['members'][i]['name']} ${MESSAGE_TAIL}`;
					client.channels.cache.get(CHANNEL).send(message);
				};
			};
		};
	});
});

// Réponse aux commandes
client.on('interactionCreate', async interaction => {

	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'birthdays') {
		var membersAge = [];
		for (i in data['members']) {
			var date = new Date(data['members'][i]['year'], data['members'][i]['month'] + 1, data['members'][i]['day']);
			var age = getAge(date);
			membersAge.push(age - 1);
		};
		const average = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

		const birthdays = new MessageEmbed()
			.setColor("#DD2E44")
			.setTitle("Hey ! Joyeux anniversaire !")
			.setDescription("Voici tous les anniversaires à souhaiter :")
			.setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Twemoji12_1f973.svg/1200px-Twemoji12_1f973.svg.png")
			.addFields(
				{ name: "Le serveur", value: `28 février (${membersAge[0]} ans)`, inline: true },
				{ name: "Notre mascotte Banga", value: `1er février (${membersAge[1]} ans)`, inline: true },
				{ name: "\u200B", value: "\u200B", inline: true },
				{ name: "Nico", value: `23 janvier (${membersAge[2]} ans)`, inline: true },
				{ name: "Cho7Korn", value: `9 février (${membersAge[3]} ans)`, inline: true },
				{ name: "Gavin's", value: `16 février (${membersAge[4]} ans)`, inline: true },
				{ name: "Dam", value: `26 février (${membersAge[5]} ans)`, inline: true },
				{ name: "Sainté", value: `3 avril (${membersAge[6]} ans)`, inline: true },
				{ name: "Augustin", value: `29 avril (${membersAge[7]} ans)`, inline: true },
				{ name: "Candice", value: `11 juin (${membersAge[8]} ans)`, inline: true },
				{ name: "Mandy", value: `18 juin (${membersAge[9]} ans)`, inline: true },
				{ name: "Chloé", value: `20 juillet (${membersAge[10]} ans)`, inline: true },
				{ name: "Jérémy (Phénix)", value: `25 juillet (${membersAge[11]} ans)`, inline: true },
				{ name: "Jérémy (Rellikorn)", value: `28 septembre (${membersAge[12]} ans)`, inline: true },
				{ name: "Erwalia", value: `9 novembre (${membersAge[13]} ans)`, inline: true },
				{ name: "Cindy", value: `13 décembre (${membersAge[14]} ans)`, inline: true },
			)
			.setTimestamp()
			.setFooter({ text: `Moyenne d'âge du serveur : ${average(membersAge).toFixed(0)} ans`, iconURL: "https://cdn.discordapp.com/icons/682859558934151181/c5f161bd6f80a8397b80b095a27c9cee.webp" })

		await interaction.reply({ embeds: [birthdays] });
	}
});

// Connexion du bot
client.login(token);