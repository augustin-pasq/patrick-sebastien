const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	{
		name: "birthdays",
		description: "Show the birthdays for the whole server",
	},
	{
		name: "next-birthday",
		description: "Show the next birthday",
	},
	{
		name: "birthday-info",
		description: "Show the birthday of the selected user",
		options: [
			{
				name: "user",
				description: "The user you want to know about the birthday",
				type: 6, // user
				required: true
			}
		]
	},
	{
		name: "join",
		description: "Join a voice channel"
	},
	{
		name: "leave",
		description: "Leave the voice channel"
	}
]

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);