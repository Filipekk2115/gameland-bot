const { } = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "banroom",
    description: "Komenda dzięki której możemy wysyłać informacje o banie",
    args: false,
    usage: "",
    guildOnly: true,
    cooldown: 10,
    aliases: [`br`],
    botPermissions: [],
    userPermissions: [`ADMINISTRATOR`],
    ownerOnly: false,

    async Cmd(msg){
        const { guild } = msg
        var czas = new Date().toLocaleString()
        const time = czas.split(` `)[0] + ` ` + czas.split(` `)[1].split(`:`).slice(0, -1).join(`:`)
        const {kanalbanroom, name, avatar} = require(`../config/config`)
        const kanal = guild.channels.cache.get(`${kanalbanroom}`)
        const opis = []
        //
        const embed = new MessageEmbed().setColor(`BLACK`).setDescription(`Kto dostał bana:`)
        const endembed = new MessageEmbed().setColor(`#ff0000`)
        msg.channel.send(embed)
        const filter = m => m.author.id === msg.author.id
        await msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(async collected => {
            const tresc = collected.first().content
            //
            let i = 0 
            collected.first().mentions.users.forEach(element => {
                i++
            })
            //
            if(i === 0){
                opis.push(" **Kto:** "+"`` "+ tresc +" ``")
            } else {
                opis.push(" **Kto:** `` "+ collected.first().mentions.users.first().tag + " ``")
            }
            const embed1 = new MessageEmbed().setColor(`BLACK`).setDescription(`Długość bana:`)
            await msg.channel.send(embed1)
//////////////////////////////////////////////////////////////////////////////////////////
                const filter = m => m.author.id === msg.author.id
                await msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(async collected => {
                    const tytul = collected.first().content
                    opis.push(" **Długość:** "+"`` "+ tytul +" ``")
                    opis.push(" **Kiedy nadany:** "+"`` "+ time +" ``")
                    const embed2 = new MessageEmbed().setColor(`BLACK`).setDescription(`Możliwość odwołania:`)
                    await msg.channel.send(embed2)
//////////////////////////////////////////////////////////////////////////////////////////
                        const filter = m => m.author.id === msg.author.id
                        await msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                        .then(async collected => {
                            const opiss = collected.first().content
                            opis.push(" **Możliwość odwołania:** "+"`` "+ opiss +" ``")
                            const embed3 = new MessageEmbed().setColor(`BLACK`).setDescription(`Powód bana:`)
                            await msg.channel.send(embed3)
//////////////////////////////////////////////////////////////////////////////////////////
                                const filter = m => m.author.id === msg.author.id
                                await msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                                .then(async collected => {
                                    const footer = collected.first().content
                                    opis.push(" **Nadany przez:** "+"`` "+ msg.author.username +" ``")
                                    opis.push("\n")
                                    opis.push(" **Powód bana:** "+"`` "+ footer +" ``")
                                    endembed.setAuthor(name, avatar).setThumbnail(`https://media.discordapp.net/attachments/734907724181143592/745750920242921633/banned-stamp-2-3.png?width=870&height=677`).setDescription(opis)
                                    

                                    await kanal.send(endembed)
                                    msg.channel.send(new MessageEmbed().setDescription(`Wiadomość wysłana!`).setColor(`#00ff26`))
                                            .catch(() => {
                                                msg.reply(`Czas na odpowiedź minął, spróbuj ponownie!`)
                                              });
                                })
                                .catch(() => {
                                    msg.reply(`Czas na odpowiedź minął, spróbuj ponownie!`)
                                  });
                        })
                        .catch(() => {
                            msg.reply(`Czas na odpowiedź minął, spróbuj ponownie!`)
                          });
                })
                .catch(() => {
                    msg.reply(`Czas na odpowiedź minął, spróbuj ponownie!`)
                });
        })
        .catch(() => {
            msg.reply(`Czas na odpowiedź minął, spróbuj ponownie!`)
          });
    }
}


