const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	{
		name: "birthdays",
		description: "Affiche les anniversaires de tous les membres",
	},
	{
		name: "next-birthday",
		description: "Affiche le prochain anniversaire à souhaiter",
	},
	{
		name: "birthday-info",
		description: "Affiche l'anniversaire du membre sélectionné",
		options: [
			{
				name: "membre",
				description: "Le membre dont tu veux connaitre l'anniversaire",
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