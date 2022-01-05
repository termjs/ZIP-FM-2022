const { MessageEmbed, Client, CommandInteraction } = require("discord.js");
const players = require('../utils/join').players;

module.exports = {
    name: "info",
    description: "📈 Domina statistikos?",
    type: 'CHAT_INPUT',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        // let metai = new Date().toISOString().slice(0, 4); // 2021
        // let men = new Date().toISOString().slice(5, 7); // 12
        // let diena = new Date().toISOString().slice(8, 10); // 30
        let now = new Date(Date.now());
        let sukurimas = new Date(2020, 11, 28, 22, 10, 10);
        let data = new Date(now - sukurimas).getTime();

        // console.log(sukurimas, now, data.getTime());

        const sukurimoMetai = 2020;
        const sukurimoDiena = 28;
        const sukurimoMen = 12;

        let totalMetai = Math.floor(data / 31556952000);
        let totalMen = Math.ceil((data / 2629746000) - (12 * (Math.floor(data / 31556952000))));
        let totalDiena = Math.ceil((data / 86400000) - (Math.floor(data / 31556952000) * 365));

        const skirtumas = totalMetai + "m. " + totalMen + "m. " + totalDiena + "d.";

        const embedInfo = new MessageEmbed()
            .setTitle('ZIP FM - Statistika')
            .setDescription('Čia galite matyti Jums reikalingiausią statistiką apie ZIP FM.\nStatistikos informacija yra tokia, kaip: serverių skaičius, prie kurių esu prisijungęs, keliuose balso kanaluose šiuo metu groju ir koks skirtumas tarp mano pirmosios versijos paleidimo!')
            .addFields(
                {
                    name: '🏘️ **Apsigyvenęs**',
                    value: `\`${client.guilds.cache.size}\` serveriuose`, inline: true,
                },
                {
                    name: '👽 **Prisijungęs**',
                    value: `Prie \`${players.size}\` kanalų`, inline: true,
                },
                {
                    name: '<:discorddev:796225834263511080> **Paleidimo Data**', inline: true,
                    value: `Prieš \`${skirtumas}\``,
                },
            );
        await interaction.followUp({ embeds: [embedInfo] });

    }
}