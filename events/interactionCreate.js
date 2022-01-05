const client = require("../index");
const blacklist = require('../models/blacklist-guilds');
const gautaAnketa = require('../models/received-applications');
const { getVoiceConnection } = require("@discordjs/voice");
const { connectionRadio } = require('../SlashCommands/utils/join');
const RadioSubscription = require("../connection/connection");
const timesUsed = {};

client.on("interactionCreate", async (interaction) => {

    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: true }).catch(() => { });

        if (!interaction.guild) return interaction.followUp('Komandos yra galimos tik serveriuose ⁉️');

        const args = [];

        if (interaction) {
            // const channel = interaction.channel.voice.id;
            // const connection = channel.id;
            // const channel = interaction.member?.voice.channel.id;
            const blacklisted = await blacklist.findOne({ Server: interaction.guildId });
            if (blacklisted) {
                interaction.followUp({ content: 'Šis serveris buvo įtrauktas į juodajį sąrašą! 👋' });
                // check if bot is still in voice channel if yes => disconnect
                return;
            }
            const anketaSiuntejas = await gautaAnketa.findOne({ Pildo: interaction.user.id });
            //if(anketaSiuntejas.ServerisID === interaction.guildId) return;
            if (anketaSiuntejas && interaction.commandName === 'anketa') {
                interaction.followUp({ content: 'Tavo anketa yra (/) buvo pateikta!' });
                return;
            }
            if (interaction.member.voice.channel) {
                if (interaction.commandName === 'zipfm') {
                    timesUsed[interaction.guildId] = (timesUsed[interaction.guildId] || 0) + 1;
                    // console.log(`${timesUsed[interaction.guildId]} - zipfm`);

                    if (timesUsed[interaction.guildId] === 5) {
                        await blacklist.create({ Server: interaction.guildId });
                    }

                    setTimeout(() => { delete timesUsed[interaction.guildId] }, 20000);
                }
            }
        }

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "Iškilo problema, bandyk dar kartą 😢" });

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);


        cmd.run(client, interaction, args);

        // Context Menu Handling
        if (interaction.isContextMenu()) {
            await interaction.deferReply({ ephemeral: true });
            const command = client.slashCommands.get(interaction.commandName);
            if (command) command.run(client, interaction);
        }
    }

});