const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
    name: "parama",
    description: "🍫 Nori paremti šį projektą?",
    type: 'CHAT_INPUT',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        const paramaEmbed = new MessageEmbed()
            .setTitle('ZIP FM (BOT) - Parama')
            .setDescription(`Nori paremti kūrėjo projektą? Nuo šiol, tai gali!\nParemk kūrėją ir padėk projektui plėtotis toliau iki debesų! ☁️`)
            .addFields(
                { name: 'Paremk projektą', value: 'PayPal pavedimu! ⤵️', inline: true },
                { name: '🥪 Arba Užsisakyk!', value: `Parašyk kūrėjui - <@367675335853998083>`, inline: true },
            );

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setURL('https://www.paypal.me/termissues')
                    .setLabel('Paremti Kūrėją ir Projektą')
                    .setStyle('LINK'),
            );

        interaction.followUp({ embeds: [paramaEmbed], components: [row] });

    },
};
