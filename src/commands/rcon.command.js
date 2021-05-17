const { MessageEmbed } = require("discord.js")
var Q3RCon = require('quake3-rcon')

module.exports = {
    name: "rcon",
    description: "Komenda wysyłająca komendy do zdalnej konsoli.",
    args: true,
    usage: "<komenda>",
    guildOnly: true,
    cooldown: [],
    aliases: [],
    botPermissions: [],
    userPermissions: ["ADMINISTRATOR"],
    ownerOnly: true,

    async Cmd(msg, args){    
        const {radress, rport, rpassword, webhooklogi1, webhooklogi2} = require(`../config/config`)
        const Discord = require('discord.js');
        var time = new Date().toLocaleString()
        const hook = new Discord.WebhookClient(webhooklogi1, webhooklogi2);

        const embed = new MessageEmbed().setDescription(`Komenda w trakcie wysyłania!`).setColor(`#d9ff00`)
        const wyslanyembed = await msg.channel.send(embed)

        try {
            var rcon = new Q3RCon({
                address: radress,
                port: rport,
                password: rpassword,
            });
            const komenda = args.join(` `)
            rcon.send(komenda, function (response) {
                const embedend = new MessageEmbed().setColor(`#00ff15`).setDescription(`Komenda \`${komenda}\` została wysłana do konsoli!\n\n**Odpowiedź z konsoli:** \n\`${response}\``)
                wyslanyembed.edit(embedend)
                const logi = new MessageEmbed().setColor(`#00ddff`).setAuthor(msg.author.tag, msg.author.avatarURL()).setTitle(`RCON`).setFooter(`Data: ${time}`)
                    .setDescription(`Komenda \`${komenda}\` została wysłana do konsoli przez ${msg.author} | ${msg.author.tag}`)
                hook.send(logi)
            });
        } catch (error) {
            const embederr = new MessageEmbed().setColor(`#ff0000`).setDescription(`Podczas wysyłania komendy wystąpił błąd!\n**Błąd:**\n${error}`)
            wyslanyembed.edit(embederr)
        }
            }

        
}