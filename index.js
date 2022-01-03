const { Client, Intents, Interaction, Collection } = require("discord.js");
// const {
// 	joinVoiceChannel,
// 	createAudioPlayer,
// 	createAudioResource,
// 	entersState,
// 	StreamType,
// 	AudioResource,
// 	AudioPlayerStatus,
// 	VoiceConnectionStatus,
// } = require('@discordjs/voice');
// const { createDiscordJSAdapter } = require('../../handler/adapter');

const client = new Client({ partials: ["CHANNEL", "REACTION"], intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS] });
// const subscriptions = new Map();

// // Handles slash command interactions
// client.on('interactionCreate', async (interaction) => {
// 	if (!interaction.isCommand() || !interaction.guildId) return;
// 	let subscription = subscriptions.get(interaction.guildId);

// 	if (interaction.commandName === 'join') {
// 		await interaction.defer();

// 		if (!subscription) {
// 			if (interaction.member instanceof GuildMember && interaction.member.voice.channel) {
// 				const channel = interaction.member.voice.channel;
// 				subscription = new RadioSubscription(
// 					joinVoiceChannel({d
// 						channelId: channel.id,
// 						guildId: channel.guild.id,
// 						adapterCreator: createDiscordJSAdapter(channel),
// 						serverDeaf: true,
// 					}),
// 				);
// 				subscription.voiceConnection.on('error', console.warn);
// 				subscriptions.set(interaction.guildId, subscription);
// 			}
// 		}
// 		if (!subscription) {
// 			await interaction.followUp('Join a voice channel and then try that again!');
// 			return;
// 		}
// 		try {
// 			await entersState(subscription.voiceConnection, VoiceConnectionStatus.Ready, 20e3);
// 		} catch (error) {
// 			console.warn(error);
// 			await interaction.followUp('Failed to join voice channel within 20 seconds, please try again later!');
// 			return;
// 		}
// 	}
// });



//senas apacioj
// const player = createAudioPlayer();


// function playSong() {
// 	try {
// 		const resource = createAudioResource('http://84.46.205.13:80/zipfm128.mp3', {
// 			inputType: StreamType.Opus,
// 		});
// 		player.play(resource);
// 		return entersState(player, AudioPlayerStatus.Playing, 5e3);
// 	} catch (error) {
// 		throw error;
// 	}
// }

// async function connectToChannel(channel) {
// 	const connection = new RadioSubscription(
// 		joinVoiceChannel({
// 			channelId: channel.id,
// 			guildId: channel.guild.id,
// 			adapterCreator: createDiscordJSAdapter(channel),
			// serverDeaf: true,
// 		}),
// 	);
// 	try {
// 		await entersState(connection.voiceConnection, VoiceConnectionStatus.Ready, 30e3);
// 		// return connection;
// 	} catch (error) {
// 		connection.voiceConnection.destroy();
// 		throw error;
// 	}
// }

module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// Initializing the project
require("./handler")(client);

// client.on('messageCreate', async (message) => {
// 	if (!message.guild) return;

// 	if (message.content === 'join') {
// 		const channel = message.member.voice.channel;

// 		if (channel) {
// 			try {
// 				const connection = await connectToChannel(channel);
// 				connection.subscribe(player);
// 				await message.reply('Playing now!');
// 			} catch (error) {
// 				console.error(error);
// 			}
// 		} else {
// 			message.reply('Join a voice channel then try again!');
// 		}
// 	}
// });

client.on('error', console.warn);

client.login(client.config.token);



// jei user turi permissions kodas juda, jei ne disable command, paziuret ar pavyks is interaction create
// command name is interactioCreate ir guildId check ZIP FM Support {console.log}

// Jei botas persikrauna ant prisijungimo atsiusti message i support channel