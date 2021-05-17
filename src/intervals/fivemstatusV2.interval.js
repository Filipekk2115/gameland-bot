module.exports = {
    name: "Status Fivem V2",
    enabled: true,
    interval: 60,
  
    async Interval(client){
        //
        const {kanalstatusuv2, idwiadomoscistatusuv2, customip, ip, name, avatar } = require(`../config/config`)
        const kanal = client.channels.cache.get(kanalstatusuv2)
        const wiad = idwiadomoscistatusuv2
        const { MessageEmbed } = require("discord.js")
        const fetch = require('node-fetch')
        const ping = require('ping')
        let max = "64"
        //
        //
        async function Status(Interwal){
            if(!kanal){
                console.error(`Nie znaleziono kanału! ${__filename}`)
                clearInterval(Interwal)
                return
            }
            kanal.messages.fetch({around: `${wiad}`, limit: 1}).then(async msgg => {
                const fetchedMsg = msgg.first();
                //
                let serwofff = 0
                const gracze = await fetch(`http://${ip}/players.json`).then(response => response.json()).catch(() => {serwofff++})
                const info = await fetch(`http://${ip}/info.json`).then(response => response.json()).catch(() => {})
                if(serwofff == 1) {
                    const embed1xx = new MessageEmbed()
                        .setAuthor(name)
                        .setThumbnail(avatar)
                        .setColor(`#ff0000`)
                        .addField("Status",`Offline`)
                        .addField("IP",`${customip}`)
                        .addField("Graczy",`0/${max}`)
                        .setFooter(`${name}  |  Odświeżono`)
                        .setTimestamp()
                    fetchedMsg.edit(embed1xx)  
                } else {
                    try { max = info.vars.sv_maxClients } catch (error) { }
                    let pingall = 0, i = 0
                    for(let x = 0;x<gracze.length;x++){
                        i++
                        pingall = pingall + gracze[x].ping
                    }
                    let srping = (pingall/i).toFixed(0)
                    //
                    await ping.promise.probe(ip.split(":")[0])
                        .then(function (res) {
                            if(res.time != "unknown"){
                                if(res.time < srping){
                                    srping = res.time
                                }
                            }
                        })
                    if(srping < 1){ srping = 1}
                    setTimeout(() => {
                        const embedx = new MessageEmbed()
                            .setAuthor(name)
                            .setThumbnail(avatar)
                            .setColor(`#00ff15`)
                            .addField("Status",`Online`)
                            .addField("IP",`${customip}`)
                            .addField("Graczy",`${gracze.length}/${max}`, true)
                            .setFooter(`${name}  |  Odświeżono`)
                            .setTimestamp()
                            if(!isNaN(srping)){
                                embedx.addField("Ping",`${Number(srping).toFixed(0)} ms`, true)
                            }
                        fetchedMsg.edit(embedx)
                    }, 1000);
                } 
            }).catch((Err) => {
                    console.error(`Powstał błąd #1! ${__filename}`)
                    if(Interwal){
                        clearInterval(Interwal)
                    }
                })
        }
        //
        Status()
        //
        // URUCHAMIA INTERWAŁ
        const Interwal = setInterval( async () => {
            Status(Interwal)
        }, this.interval * 1000);
    }
}