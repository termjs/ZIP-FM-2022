const client = require("../index");

client.on("ready", async (client) => {
    console.log(`${client.user.tag} is Ready to Roll!`)
    client.user.setPresence({ activities: [{ name: `/pagalba`, type: 'PLAYING' }], status: 'online' });
});
