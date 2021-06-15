module.exports = {
    name: "boobs",
    description: "will send boobs",
    execute(message) {
        var shoutouts = [
            "I hope u like them",
            "MY TITS ARENT SMALL >:c",
            "Stop saying they are small :sob:",
            "Hehe :>",
            "Don't look at me like that Onii-Chan!",
            "quit staring",
            "uhmmmm >.<",
            "Do u think they are big?",
            "pls touch them >///<",
            "please massage them good :>"
        ];

        var extra = "";
        if (message.mentions.members.size > 0) {
            extra = `   ${message.mentions.members.first().user}`;
        }

        const fs = require('fs')
        const lengthJPG = fs.readdirSync("./images/boobs/").filter(file => file.endsWith(".jpg")).length;
        const lengthJPEG = fs.readdirSync("./images/boobs/").filter(file => file.endsWith(".jpeg")).length;
        const lengthGIF = fs.readdirSync("./images/boobs/").filter(file => file.endsWith(".gif")).length;
        const lengthPNG = fs.readdirSync("./images/boobs/").filter(file => file.endsWith(".png")).length;

        const luckyNumber = Math.random() * (lengthJPG + lengthJPEG + lengthPNG + lengthGIF);
        var cache = 0;

        const source = "./images/boobs/";

        if (lengthJPG + cache > luckyNumber) {
            message.channel.send(shoutouts[Math.floor(Math.random() * shoutouts.length)] + extra, { files: [source + Math.floor(Math.random() * lengthJPG) + ".jpg"] });
        } else {
            cache = cache + lengthJPG;
            if (lengthJPEG + cache > luckyNumber) {
                message.channel.send(shoutouts[Math.floor(Math.random() * shoutouts.length)] + extra, { files: [source + Math.floor(Math.random() * lengthJPEG) + ".jpeg"] });
            } else {
                cache = cache + lengthJPEG;
                if (lengthPNG + cache > luckyNumber) {
                    message.channel.send(shoutouts[Math.floor(Math.random() * shoutouts.length)] + extra, { files: [source + Math.floor(Math.random() * lengthPNG) + ".png"] });
                } else {
                    cache = cache + lengthPNG;
                    if (lengthGIF + cache > luckyNumber) {
                        message.channel.send(shoutouts[Math.floor(Math.random() * shoutouts.length)] + extra, { files: [source + Math.floor(Math.random() * lengthGIF) + ".gif"] });
                    } else {
                        cache = cache + lengthGIF;
                        message.channel.send("Whoever coded this is trash!");
                        message.channel.send(luckyNumber + "  " + lengthJPG + "  " + cache)
                    }
                }
            }
        }
    }
}