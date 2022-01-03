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
        await interaction.deferReply({ ephemeral: true }).catch(() => {});

        // const server = client.guilds.cache.get('740542533657952347');
        // const user = interaction.user.id;
        // if (server.members.cache.has(user)) {
        //     console.log('user is in a specific guild and commands work globally for him')
       
        // if (!interaction.user.id == "740542533657952347") {
        //     console.log('wow')
        // }
        // jei user nera guild, console.log("wow")

        if (!interaction.guild) return interaction.followUp('Komandos yra galimos tik serveriuose ⁉️');



        // const server = interaction.guild; // server = specific guild

        const args = [];

        // const member = await server.members.fetch(args[0]); // check if the member is in that guild

        // if (!member) return interaction.followUp('a user with this ID does not exist'); // if the member is not in that guild, return

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
            if (interaction.commandName === 'zipfm') {
                timesUsed[interaction.guildId] = (timesUsed[interaction.guildId] || 0) + 1;
                // console.log(`${timesUsed[interaction.guildId]} - zipfm`);
                
                if (timesUsed[interaction.guildId] === 5) {
                    await blacklist.create({ Server: interaction.guildId });
                    // interaction.followUp({ content: 'Dėl command abuse serveris buvo įtrauktas į juodajį sąrašą!' });
                    // Jei nori gali atsisiusti sau embeda cia nes blacklisted tures visa info apie uzbaninta serva, nu ne visa tik id


                    
                    // const serverID = '922132715384479745';
                    // let blacklistChannel = serverID.channels.find(c => c.name == "blacklisted" && c.type == "channel")
                    // blacklistChannel.send('hei')
                }
                setTimeout(() => { delete timesUsed[interaction.guildId] }, 20000);
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

    // } else {
    //     console.log('nea')
    //     interaction.followUp('ateik i supporta');
    //     return;
    // }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: true });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
} 
    //kelt cia koduka 
});