module.exports =  {
    name: "message",
    enabled: true,

    async Event(msg){
        //
        //
        if(msg.author.bot) return
        if(msg.channel.type === `dm`) return
        //
        // ZMIENNE
        const { guild } = msg
        const { MessageEmbed } = require("discord.js")
        const avatar = require(`../config/config`).avatar
        const namebot = require(`../config/config`).name
        const listakanalow = require(`../addons/kanalypodan.json`).id
        const idkanal = require(`../config/config`).kanaladminpodania
        const kanaladmin = guild.channels.cache.get(`${idkanal}`)
        //
        //
        if(listakanalow.join().includes(`${msg.channel.id}`)){   
            const trescpodania = msg.content
            const embed = new MessageEmbed().setAuthor(namebot, avatar).setTitle(`Nowe podanie!`).setFooter(`${msg.author.id}`).setColor(`#ffe600`).setThumbnail(`${msg.author.displayAvatarURL({ dynamic:true })}`).setDescription(`**Autor podania:** ${msg.author} | ${msg.author.tag}\n 
            **Kanał podania:** ${msg.channel} \n
            **Treść podania:**\n\n${trescpodania}\n`)
            if(msg.attachments.find(u => u)){
                const a = (msg.attachments.find(u => u))
                embed.addField(`Załącznik`, `${a.url}`)
            }
            const wiadadmin = await kanaladmin.send(embed)
            await wiadadmin.react(`✅`)
            await wiadadmin.react(`❌`)
            msg.delete()
            const embed1 = new MessageEmbed().setDescription(`Twoje podanie wkrótce zostanie rozpatrzone!`).setColor(`#ffe600`).setAuthor(namebot, avatar)
            msg.author.send(embed1)
        } else return
        //
        //
        
    }
}