const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  entersState,
  StreamType,
  AudioResource,
  VoiceConnection,
  AudioPlayerStatus,
  VoiceConnectionStatus,
  getVoiceConnection,
} = require("@discordjs/voice");
const { GuildMember } = require("discord.js");
const { createDiscordJSAdapter } = require("../../handler/adapter");
const RadioSubscription = require("../../connection/connection");
const players = new Map();
const blacklist = require("../../models/blacklist-guilds");

module.exports = {
  name: "zipfm",
  description: "🔊 Nori radijo, pasikviesk mane į balso kanalą!",
  // userPermissions: ["ADMINISTRATOR"],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const listPerms = ["CONNECT", "PRIORITY_SPEAKER", "SPEAK", "USE_APPLICATION_COMMANDS", "USE_EXTERNAL_EMOJIS", "USE_VAD"];
    if (interaction.guild.me.permissions.has(listPerms)) {
      if (interaction.member.permissions.has("KICK_MEMBERS")) {

      const subscriptions = new Map();
      const player = createAudioPlayer();
      const { EventEmitter } = require('events');
      const emitter = new EventEmitter();

      if (!interaction.isCommand() || !interaction.guildId) return;
      let subscription = subscriptions.get(interaction.guildId);
      let connectionRadio;
      const blacklisted = await blacklist.findOne({
        Server: interaction.guildId,
      });

      if (
        !subscription &&
        interaction.member instanceof GuildMember &&
        interaction.member.voice.channel
      ) {
        const channel = interaction.member.voice.channel;
        connectionRadio = new RadioSubscription(
          joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: createDiscordJSAdapter(channel),
            serverDeaf: true,
          })
        );
        connectionRadio.voiceConnection.on("error", console.warn);
        subscriptions.set(interaction.guildId, subscription);
        emitter.setMaxListeners(0);
      }
      if (!connectionRadio) return interaction.followUp({ content: "Prisijunk į balso kanalą ir bandyk dar kartą!" });

      if (blacklisted) {
        connectionRadio.voiceConnection.destroy();
        return interaction.followUp({ content: "Pasiruošk visus ID ir pasiimk draugus, nes linksma bus! 📁" });
      }
      try {
        await entersState(
          connectionRadio.voiceConnection,
          VoiceConnectionStatus.Ready,
          20e3
        );
      } catch (error) {
        console.warn(error);
        await interaction.followUp({ content: "Nepavyko prisijungti per 20 sekundžių periodą, bandyk dar kartą!" });
      }

      try {
        const URL = `https://transliacija.zipfm.lt/zipfm128.mp3`;
        let resource = createAudioResource(URL, {
          inputType: StreamType.Arbitrary,
        });
        player.play(resource);
        connectionRadio.voiceConnection.subscribe(player);
        await interaction.followUp({ content: "Malonaus klausymo! 👽" });

        let state = 1;
        player.addListener("stateChange", (oldOne, newOne) => {
          if (newOne.status === "playing") {
            console.log(
              `#${state} - ZIP FM Radijas pasileido! Guild: ${interaction.guild.name} 💚`
            );
            players.set(`${interaction.guild.name}`, 1);
          } else if (newOne.status === "idle") {
            players.delete(`${interaction.guild.name}`, 1);
            console.log(
              `#${state} - 💥 Radijas NUSTOJO Groti! Guild: ${interaction.guild.name} 💥`
            );
            resource = createAudioResource(URL, {
              inputType: StreamType.Arbitrary,
            });
            player.play(resource);
            state++;
          }
        });
      } catch (error) {
        console.warn(error);
      }
      connectionRadio.voiceConnection.on(
        VoiceConnectionStatus.Disconnected,
        async (oldState, newState) => {
          players.delete(`${interaction.guild.name}`, 1);
        }
      );
    } else {
      return interaction.followUp({ content: "Tik vartotojas turintis \`KICK_MEMBERS\` privilegijas gali naudoti šią komandą!" });
    }
  } else {
      return interaction.followUp({ content: "Man nebuvo suteiktos reikiamos privilegijos! 👉👈" });
    }
  },
};

module.exports.players = players;
