module.exports = {
    name: "Status Fivem presence",
    enabled: true,
    interval: 60,
  
    async Interval(client){
        //
        // ZMIENNE
        const { ip } = require(`../config/config`)
        const fetch = require('node-fetch');
        async function Status(){
            let i = 0
            const gracze = await fetch(`http://${ip}/players.json`).then(response => response.json()).catch(error => {i++})
            const info = await fetch(`http://${ip}/info.json`).then(response => response.json()).catch(() => {})
            //
            if(i === 1){
                const presenceOptionsx = { activity: {type: `PLAYING`, name: `❌ Serwer OFF`} }
                client.user.setPresence(presenceOptionsx)
            } else {
                const maxx = info.vars.sv_maxClients
                const presenceOptionsx = { activity: {type: `PLAYING`, name: `Graczy: ${gracze.length}/${maxx}`} }
                client.user.setPresence(presenceOptionsx)
            }
        }
        Status()
        //
        // URUCHAMIA INTERWAŁ
        setInterval( async () => {
            //
            Status()
            //
        }, this.interval * 1000);
    }
}