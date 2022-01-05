const { Client, Intents, Interaction, Collection } = require("discord.js");

const client = new Client({ partials: ["CHANNEL", "REACTION"], intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS] });


module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// Initializing the project
require("./handler")(client);

client.on('error', console.warn);

client.login(client.config.token);
