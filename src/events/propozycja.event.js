const { MessageEmbed } = require("discord.js")

module.exports =  {
    name: "message",
    enabled: true,

    async Event(msg){
        //
        //
        if(msg.channel.type === `dm`) return
        const { guild } = msg
        const idkanalu = require(`../config/config`).kanalpropozycje
        //
        //
        if(msg.author.bot) return
        const autor = guild.members.cache.get(msg.author.id)
        if (autor.hasPermission(['ADMINISTRATOR'])) return
        if (msg.channel.id == idkanalu) {
            const tresc = msg.content
            const autor = msg.author.tag
            msg.delete()
            const embed = new MessageEmbed().setColor(`#00ff15`).setAuthor(`${autor}`,`${msg.author.displayAvatarURL({ dynamic:true })}`).setTimestamp().setDescription(`${tresc}`).setTitle(`Propozycja`)
            if(msg.attachments.find(u => u)){
                const a = (msg.attachments.find(u => u))
                if(a.height){
                    embed.setImage(`${a.proxyURL}`)
                }
            }
            const wiad = await msg.channel.send(embed)
            await wiad.react(`✅`)
            await wiad.react(`❌`)
        }
    }
}