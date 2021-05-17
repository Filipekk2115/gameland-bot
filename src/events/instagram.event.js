const { MessageEmbed } = require("discord.js")

module.exports =  {
    name: "message",
    enabled: true,

    async Event(msg){
        //
        //
        if(msg.channel.type === `dm`) return
        const { guild } = msg
        const { kanalinstagramsolo, kanallogi } = require(`../config/config`)
        const logi = guild.channels.cache.get(`${kanallogi}`)
        //
        //
        if(msg.author.bot) return
        if(msg.channel.id == kanalinstagramsolo) {
            const tresc = msg.content
            const autor = msg.author.tag
            msg.delete()
            const embed = new MessageEmbed().setColor(`#f04c5b`).setAuthor(`${autor}`,`https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png`).setTimestamp().setDescription(`${tresc}`)
            const embed1 = new MessageEmbed().setColor(`#f04c5b`).setTitle(`Nowy post Instagram!`).setDescription(`**Autor:** ${msg.author} | ${msg.author.tag}\n\n**Treść:**\n${tresc}`).setTimestamp()
            if(msg.attachments.find(u => u)){
                const a = (msg.attachments.find(u => u))
                if(a.height){
                  embed.setImage(`${a.proxyURL}`)
                  embed1.setImage(`${a.proxyURL}`)
                }
            }
            const wiadomosc = await msg.channel.send(embed)
            wiadomosc.react("❤")
            logi.send(embed1)
            

        }
    }
}