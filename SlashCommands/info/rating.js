const { MessageEmbed, Client, CommandInteraction } = require("discord.js");
const ratings = require('../../models/received-ratings');
const schemaVertinimas = require('../../models/received-ratings');

module.exports = {
    name: "vertinimai",
    description: "💚 Nori pamatyti vertinimus iš kitų vartotojų?",
    type: 'CHAT_INPUT',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        const vertinimas = await schemaVertinimas.find();

        let count = vertinimas.length;
        let sum = 0;
        vertinimas.forEach(el => {
            sum += el.Vertinimas;
        })
        let average = sum / count;

        const ratingStar = "<:starFull:926871991896649729>";
        const ratingEmptyStar = "<:starClear:926836700246839306>";
        let string = ``;
        for (const star in [1, 2, 3, 4, 5]) {

            string += `${average >= Number(star) + 1 ? ratingStar : ratingEmptyStar}`;
        }

        const ratingEmbed = new MessageEmbed()
            .setTitle('ZIP FM - Vertinimai')
            .setDescription('Čia galite matyti mano įvertinimus iš ZIP FM vartotojų.\nDėkoju viesiems už teigiamus atsiliepimus ir gerai praleistą laiką!')
            .addFields(
                {
                    name: '**Bendras Indeksas**', inline: true,
                    value: string,
                },
                {
                    name: '**Įvertinimų Kiekis**', inline: true,
                    value: `Viso: \`${count}\` vertinimai`,
                },
            );
        await interaction.followUp({ embeds: [ratingEmbed] });
    }
}