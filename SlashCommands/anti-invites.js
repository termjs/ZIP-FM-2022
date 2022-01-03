const client = require("..");

client.on("messageCreate", async (message) => {
    const zipSRV = "740542533657952347";
    if (message.guild.id === zipSRV) {

        function deleteMessage() {
            message.delete();
        }

        const links = ['discord.gg/', 'discord.com/invite', 'discord.io/'];

        for (const link of links) {
            const serverINV = "https://discord.gg/m76nSqdhzq";
            if (message.content.includes(serverINV)) return;
            if (message.content.includes(link)) return deleteMessage();
        }
    }
});