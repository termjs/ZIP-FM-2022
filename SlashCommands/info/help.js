const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
    name: "pagalba",
    description: "❔ Reikia pagalbos, padėsiu tau, žemieti!",
    type: 'CHAT_INPUT',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        const helpMessage = new MessageEmbed()
        .setTitle('ZIP FM - Pagalbos meniu')
        .addFields(
            { name: '🤒 Radai klaidą sistemoje?', value: 'Junkis pas mus ir pranešk! ⤵️', inline: true },
            { name: '🥪 Nori private BOT?', value: `Susisiek su mano kūrėju - <@367675335853998083>`, inline: true },
        )
        .setDescription(`Visas galimas komandas rasi parašęs \`/\` į teksto kanalą.\nNaujienas, kilusias problemas ar detalią bei išsamią informaciją apie mane rasi apačioje, paspaudęs ant mygtuko.`)

        const rowas = new MessageActionRow()
			.addComponents(
				new MessageButton()
                    .setURL('https://discord.gg/NpxRrvnqTv')
					.setLabel('Prisijungti į Support serverį')
					.setStyle('LINK'),
			);
            interaction.followUp({ embeds: [helpMessage], components: [rowas] });
            
    },
};
