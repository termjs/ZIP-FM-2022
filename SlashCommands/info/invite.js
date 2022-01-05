const { MessageEmbed, Client, CommandInteraction, MessageActionRow, MessageButton } = require("discord.js");
const players = require('../utils/join').players;

module.exports = {
    name: "invite",
    description: "💌 Pakviesk mane į naujus namus!",
    type: 'CHAT_INPUT',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        const embedInvite = new MessageEmbed()
            .setTitle('ZIP FM - Pakviesk mane')
            .setDescription('Patinka muzika? Nori manęs savo serveryje? Pakviesk mane!\nPatariu prisijungti į [Support serverį](https://discord.gg/NpxRrvnqTv) ir išvengti nesusipratimų.')

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setURL('https://discord.com/oauth2/authorize?client_id=922131769363419196&permissions=2184446208&scope=bot%20applications.commands')
                    .setLabel('Pakviesk Mane į Serverį')
                    .setStyle('LINK'),
            );

        await interaction.followUp({ embeds: [embedInvite], components: [row] });

    }
}