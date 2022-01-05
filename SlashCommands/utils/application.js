const { Client, CommandInteraction, MessageActionRow, MessageSelectMenu, MessageEmbed, Message, Discord } = require("discord.js");

const schemaAnketa = require("../../models/received-applications");

module.exports = {
  name: "anketa",
  description:
    "📚 Turi klausimų ar pasiūlymų, o gal serveris buvo įtrauktas į juodajį sąrašą?",
  // userPermissions: ["ADMINISTRATOR"], // userRole: ["role id"]
  type: "CHAT_INPUT",
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {Message} message
   * @param {String[]} args
   */
  options: [
    {
      name: "priežastis",
      description:
        "Pateikite išsamią priežastį dėl kurios pildote anketą, kas atsitiko?",
      type: "STRING",
      required: true,
    },
    {
      name: "vartotojas",
      description:
        "ZIP FM vartotojo ID, kuris įtraukė serverį į juodajį sąrašą",
      type: "USER",
      required: false,
    },
    {
      name: "serveris",
      description: "Serverio ID, kuris buvo įtrauktas į juodajį sąrašą",
      type: "STRING",
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    const vartotojas = interaction.options.getUser("vartotojas");
    const serveris = interaction.options.getString("serveris");
    const priezastis = interaction.options.getString("priežastis");
    const pildytojas = interaction.user.id;

    schemaAnketa.findOne(
      {
        Pildo: pildytojas,
        Juodasis: vartotojas,
        ServerisID: serveris,
        Reason: priezastis,
      },
      async (err, data) => {
        new schemaAnketa({
          Pildo: pildytojas,
          Juodasis: vartotojas,
          ServerisID: serveris,
          Reason: priezastis,
        }).save();
      }
    );

    interaction.followUp({ content: `Anketa buvo išsiųsta, lauk atsakymo! 🦗` });

    const manoID = "367675335853998083";
    const anketuChannel = interaction.guild.channels.cache.get("926817143092285470");

    const anketaEmbed = new MessageEmbed()
      .setAuthor({
        name: `Nauja! ${interaction.user.tag} 🆕`,
        iconURL: `${interaction.user.avatarURL()}`,
        url: "https://cloud.mongodb.com/",
      })
      .setDescription(
        `Pildo: \`${pildytojas}\`\nUžtraukė: \`${vartotojas}\`\nServerioID: \`${serveris}\``
      )
      .addFields({
        name: "Priežastis: ",
        value: `${priezastis}`,
        inline: true,
      });

    const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('mama_meniu')
          .setMaxValues(1)
          .addOptions([
            {
              label: "Priimti anketą",
              description: "Priimti anketą ir atidaryti kanalą nadotojui",
              value: "priimti",
              emoji: "👽"
            },
            {
              label: "Atmesti anketą",
              description: "Atmesti anketą ir ištrinti vartotoją iš duomenų bazės",
              value: "atmesti",
              emoji: "❌"
            },
            {
              label: "Atmesti ir palikti DB info",
              description: "Atmesti ir palikti interaction.user duomenų bazėje",
              value: "saveDB",
              emoji: "🗑️"
            }
          ])
      );

    const m = await anketuChannel.send({ embeds: [anketaEmbed], components: [row] });

    const filteris = i => i.user.id === manoID;

    const collector = m.createMessageComponentCollector({ filter: filteris })

    collector.on('collect', async i => {
      if (i.values[0] === "priimti") {
        const anketaChannelMessage = `${interaction.user} @here\n\n**📋 ANKETA BUVO ATIDARYTA**\nVartotojo vardu ${interaction.user.tag} anketa ir dokumentai buvo rasti lentynoje!\nPerspėjame, nemandagus elgesys ir leksika yra netoleruojama. Už nusižengimus anketa bus uždaryta be galimybės ją užpildyti dar kartą.\n\n> **PATEIKTA ANKETA**\n> Pildytojo ID: \`${pildytojas}\`\n> Vartotojas įtraukęs serverį į sąrašą: \`${vartotojas}\`\n> Nurodyto serverio ID: \`${serveris}\`\n> Pildytojo pateikta priežastis: \`${priezastis}\`\n\n**KAIP IŠSIAIŠKINTI SITUACIJĄ?**\n_Aprašykite nesusipratimą ar problemą kuo detaliau, aplinkybes._\n_Nurodykite savo serverio pavadinimą ir serverio ID._\n_Nurodykite asmenų su administratoriaus privilegijomis ID._\n\n**NEŽINAI KUR GAUTI ID?**\n_Paspausk ant vartotojo ir surask mygtuką - \`Copy ID\`_\n_Nepavyko?! Įsijunk \`Developer Mode\`_`;
        const channelName = `anketa-${interaction.user.id}`;
        const categoryName = "anketos";
        let display = interaction.guild.channels.cache.find(
          (ch) => ch.name === channelName && ch.type === "GUILD_TEXT"
        );
        let category = interaction.guild.channels.cache.find(
          (cat) => cat.name === categoryName && cat.type === "GUILD_CATEGORY"
        );
        if (display) return;
        if (!display) {
          try {
            await category
              .createChannel(channelName, {
                type: "GUILD_TEXT",
                permissionOverwrites: [
                  {
                    id: interaction.user.id,
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
                  },
                  {
                    id: interaction.guild.id,
                    deny: ["VIEW_CHANNEL"],
                  },
                ],
              })
              .then((msg) => msg.send(anketaChannelMessage));
          } catch (error) {
            console.log(`Channel creation error: ${error}`);
            return;
          }
        }
        client.users.fetch(interaction.user.id).then((dm, error) => {
          const message = client.channels.cache.get('927285945076699206')
          try {
            dm.send(`${interaction.user}, tau buvo sukurtas kanalas!`)
            message.send(`${interaction.user}, tau buvo sukurtas kanalas!`)
          } catch (error) {
            console.error(`Caught the promise rejections with DMS (${interaction.user.tag})`);
            message.send(`${interaction.user}, tau buvo sukurtas kanalas!`)
          }
        });
        await i.deferUpdate()
        i.editReply({ embeds: [anketaEmbed.setAuthor({ name: `Priimta! ${interaction.user.tag} ✅`, iconURL: `${interaction.user.avatarURL()}` })], components: [] });
      }
      if (i.values[0] === "atmesti") {
        client.users.fetch(interaction.user.id).then((dm, error) => {
          const message = client.channels.cache.get('927285945076699206')
          try {
            dm.send(`${interaction.user}, tavo anketa buvo atmesta!`)
            message.send(`${interaction.user}, tavo anketa buvo atmesta!`)
          } catch (error) {
            console.error(`Caught the promise rejections with DMS (${interaction.user.tag})`);
            message.send(`${interaction.user}, tavo anketa buvo atmesta!`)
          }
        });
        await schemaAnketa.deleteOne({ Pildo: pildytojas });
        await i.deferUpdate()
        i.editReply({ embeds: [anketaEmbed.setAuthor({ name: `Atmesta! ${interaction.user.tag} ❌`, iconURL: `${interaction.user.avatarURL()}` })], components: [] });
      }
      if (i.values[0] === "saveDB") {
        client.users.fetch(interaction.user.id).then((dm, error) => {
          const message = client.channels.cache.get('927285945076699206')
          try {
            dm.send(`${interaction.user}, tavo anketa buvo atmesta be leidimo ją užpildyti dar kartą!`)
            message.send(`${interaction.user}, tavo anketa buvo atmesta be leidimo ją užpildyti dar kartą!`)
          } catch (error) {
            console.error(`Caught the promise rejections with DMS (${interaction.user.tag})`);
            message.send(`${interaction.user}, tavo anketa buvo atmesta be leidimo ją užpildyti dar kartą!`)
          }
        });
        await i.deferUpdate()
        i.editReply({ embeds: [anketaEmbed.setAuthor({ name: `Paliekama! ${interaction.user.tag} 🗑️`, iconURL: `${interaction.user.avatarURL()}` })], components: [] });
      }
      else return;
    })
  },
};
