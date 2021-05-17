const { MessageEmbed } = require("discord.js")

module.exports =  {
    name: "message",
    enabled: true,

    async Event(msg){
        //
        //
        if(msg.channel.type === `dm`) return
        const { guild } = msg
        const { kanaltwitter, kanallogi } = require(`../config/config`)
        const logi = guild.channels.cache.get(`${kanallogi}`)
        //
        //
        if(msg.author.bot) return
        if (msg.channel.id == kanaltwitter) {
            const tresc = msg.content
            const autor = msg.author.tag
            msg.delete()
            const embed = new MessageEmbed().setColor(`#1DA1F2`).setAuthor(`${autor}`,`https://pomoc.home.pl/wp-content/uploads/2019/11/twitter-logo-300x300.png`).setTimestamp().setDescription(`${tresc}`)
            const embed1 = new MessageEmbed().setColor(`#1DA1F2`).setTitle(`Nowy tweet!`).setDescription(`**Autor:** ${msg.author} | ${msg.author.tag}\n\n**Treść:**\n${tresc}`).setTimestamp()
            if(msg.attachments.find(u => u)){
                const a = (msg.attachments.find(u => u))
                if(a.height){
                  embed.setImage(`${a.proxyURL}`)
                  embed1.setImage(`${a.proxyURL}`)
                }
            }
            msg.channel.send(embed)
            logi.send(embed1)
            

        }
    }
}