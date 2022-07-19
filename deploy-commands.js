const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	{
		name: "birthdays",
		description: "Display the birthdays for the whole server",
	},
	{
		name: "next-birthday",
		description: "Display the next birthday",
	},
	{
		name: "birthday-info",
		description: "Display the birthday of the selected user",
		options: [
			{
				name: "user",
				description: "The user you want to know about the birthday",
				type: 6, // user
				required: true
			}
		]
	}
]

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);