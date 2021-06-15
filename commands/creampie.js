module.exports = {
    name: "creampie",
    description: "will send creampie",
    execute(message) {
        var shoutouts = [
            "I will get pregnant :sob:",
            "DID U CUM INSIDE ME?!",
            "YESSS ONII-CHAN!",
            "*moans* >///<",
            "I hope you used a condom",
            "THIS FEELS SO GOOD",
            "I CAN FEEL UR HOT CUM",
            "How should we call the baby? :uwu:",
            "Don't tell my mom about this, she will kill me",
            "OMG YES :heart: I LOVE U",
            "ONII-CHAANNNN O//.//O",
            "SO MUCH CUM!",
            "WOAH so much cum o.o",
            "yes Yes YESSS >//w//<",
            "Ur cum is so sticky :woozy_face:"
        ];

        var extra = "";
        if (message.mentions.members.size > 0) {
            extra = `   ${message.mentions.members.first().user}`;
        }

        const fs = require('fs')
        const lengthJPG = fs.readdirSync("./images/creampie/").filter(file => file.endsWith(".jpg")).length;
        const lengthJPEG = fs.readdirSync("./images/creampie/").filter(file => file.endsWith(".jpeg")).length;
        const lengthGIF = fs.readdirSync("./images/creampie/").filter(file => file.endsWith(".gif")).length;
        const lengthPNG = fs.readdirSync("./images/creampie/").filter(file => file.endsWith(".png")).length;

        const luckyNumber = Math.random() * (lengthJPG + lengthJPEG + lengthPNG + lengthGIF);
        var cache = 0;

        const source = "./images/creampie/";

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