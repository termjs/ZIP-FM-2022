const client = require("..");
const zipSRV = "740542533657952347";

client.on('guildMemberAdd', async (member) => {
    if (member.guild.id === zipSRV) {
        const roleVAR = member.guild.roles.cache.find(role => role.name == "Vartotojas");
        member.roles.add(roleVAR);
    }
});
