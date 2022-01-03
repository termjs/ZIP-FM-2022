const { Client, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed, Message } = require("discord.js");
const schemaVertinimas = require('../../models/received-ratings');

module.exports = {
    name: 'vertinti',
    description: '🌋 Turi norą įvertinti mane? Tai gali padaryti čia!',
    type: 'CHAT_INPUT',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {Message} message
     * @param {String[]} args
     */
    options: [
        {
            name: 'vertinimas',
            description: 'Pateik vertinimą, nurodydamas vieną skaičių nuo 1 iki 5!',
            type: 'NUMBER',
            required: true
        },
        {
            name: 'komentaras',
            description: 'Jei nori, palik komentarą apie savo pateiktą įvertinimą',
            type: 'STRING',
            required: false

        },
    ],
    run: async (client, interaction, message, args) => {
        const Rating = interaction.options.getNumber('vertinimas');
        const Comment = interaction.options.getString('komentaras');
        const Vertino = interaction.user.id;

        const vertinta = await schemaVertinimas.findOne({ Vertino: Vertino });

        if (vertinta) {
            interaction.followUp({ content: "Tavo vertinimas buvo pateiktas ir negali būti redaguojamas! 📬" });
            return;
        }

        if (interaction.options.getNumber('vertinimas') > 5 || interaction.options.getNumber('vertinimas') < 1) {
            interaction.followUp({ content: "Skaičius turi būti ne mažesnis nei 1 ir ne didesnis kaip 5!" });
            return;
        }

        schemaVertinimas.findOne({ Vertino: Vertino, Vertinimas: Rating, Komentaras: Comment }, async (err, data) => {
            new schemaVertinimas({
                Vertino: Vertino,
                Vertinimas: Rating,
                Komentaras: Comment
            }).save();

            return interaction.followUp({ content: "Tavo vertinimas buvo sėkmingai pateiktas! 💚" });
        });
    },
};
