module.exports = {
    name: "femboyfriday",
    description: "will send nsfw trap pics",
    execute(client) {
        const fs = require('fs')
        const length = fs.readdirSync("./images/dailydosenagisa/").length
        var shoutouts = [
            "Im a girl, trust me!",
            "ITS A TRAP!",
            "Traps are gey",
            "Traps are not gey",
            "I'm not **100% gay**, I'm only **2,19% gay**!!!",
            "Traps are only 2,19% gay!",
            "OwO *notices bulge*",
            "Its the best day of the week: **Femboy Friday!**"
        ];
        const channel = client.channels.cache.find(channel => channel.name === "«🌈»-traps")

        for (var i = 0; i < 1; i++) {
            channel.send(shoutouts[Math.floor(Math.random() * shoutouts.length)], { files: ["./images/femboyfriday/" + Math.floor(Math.random() * length) + ".jpg"] })
        }
        console.log("Femboy Friday!");
    }
}
