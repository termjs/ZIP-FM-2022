const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "ping",
    description: "🏓 Patikrink, ar aš gyvas mušant Ping-Pong kamuoliuką",
    type: 'CHAT_INPUT',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        await interaction.followUp({ content: `Pong! Aš gyvas ir mano Ping yra \`${client.ws.ping}\`ms!` });

    },
};
