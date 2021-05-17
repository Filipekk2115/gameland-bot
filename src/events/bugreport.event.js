const { MessageEmbed } = require("discord.js")

module.exports =  {
    name: "message",
    enabled: true,

    async Event(msg){
        //
        //
        if(msg.channel.type === `dm`) return
        const { guild } = msg
        const {bugreportkanal, bugreportadmin} = require(`../config/config`)
        //
        //
        if(msg.author.bot) return
        const autor = guild.members.cache.get(msg.author.id)
        const kanal = guild.channels.cache.get(bugreportadmin)
        if(!kanal) return console.log(`Brak kanału bug report dla administracji!`)
        if (autor.hasPermission(['ADMINISTRATOR'])) return
        if (msg.channel.id == bugreportkanal) {
            const tresc = msg.content
            const autor = msg.author.tag
            msg.delete()
            const embed = new MessageEmbed().setColor(`#ff0000`).setAuthor(`${autor}`,`${msg.author.avatarURL()}`).setTimestamp().setDescription(`${tresc}`)
            const embedautor = new MessageEmbed().setColor(`#00ff15`).setDescription(`Twoje zgłoszenie o błędzie zostało wysłane do administracji!`)
            if(msg.attachments.find(u => u)){
                const a = (msg.attachments.find(u => u))
                if(a.height){
                    embed.setImage(`${a.proxyURL}`)
                }
            }
            await kanal.send(embed)
            msg.author.send(embedautor)

        }
    }
}