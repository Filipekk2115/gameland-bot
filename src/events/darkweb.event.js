const { MessageEmbed } = require("discord.js")

module.exports =  {
    name: "message",
    enabled: true,

    async Event(msg){
        //
        //
        if(msg.channel.type === `dm`) return
        const { guild } = msg
        const { kanaldarkweb, kanallogi } = require(`../config/config`)
        const logi = guild.channels.cache.get(`${kanallogi}`)
        //
        //
        if(msg.author.bot) return
        if (msg.channel.id == kanaldarkweb) {
            const tresc = msg.content
            const autor = Math.floor(msg.author.id/90642121313)
            msg.delete()
            const embed = new MessageEmbed().setColor(`#000000`).setAuthor(`${autor}`,`https://pbs.twimg.com/profile_images/1269007854188597256/smxRNSC3_400x400.jpg`).setTimestamp().setDescription(`${tresc}`)
            const embed1 = new MessageEmbed().setColor(`#000000`).setTitle(`Nowy darkweb!`).setDescription(`**Autor:** ${msg.author} | ${msg.author.tag}\n\n\n**Treść:**\n${tresc}`).setTimestamp()
            if(msg.attachments.find(u => u)){
                const a = (msg.attachments.find(u => u))
                if(a.height){
                  embed.setImage(`${a.proxyURL}`)
                  embed1.setImage(`${a.proxyURL}`)
                }
            }
            logi.send(embed1)
            msg.channel.send(embed)
        }
    }
}