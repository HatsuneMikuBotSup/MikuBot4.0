module.exports = {
    name: "sex",
    description: "will send sex",
    execute(message) {
        var shoutouts = [
            "DEEPER!",
            "CUM INSIDE ME!",
            "Onii-chan?! >///<",
            "HARDER!",
            "DON'T CUM INSIDE ME!",
            "IM NOT A VIRGIN ANYMORE!:sob:",
            "This is my first time",
            "THIS FEELS SOO GOOD!",
            "FUCK ME HARDER DADDY!",
            "FUCK ME HARDER ONII-CHAN!",
            "YOUR DICK IS TOO LARGE!:sob:",
            "I can feel your dick inside me",
            "I can feel your dick move inside me",
            "PLEASE BE GENTLE",
            "USE ME!",
            "OMG YES *moans*",
            "OMG YES :weary:",
            "Thats the spot",
            "Stop crying ",
            "Open ur holes",
            "U won't be able to walk after this",
            "U CANT ESCAPE ME ",
            ":heart:",
            "Ur mine :heart:"
        ];

        var extra = "";
        if (message.mentions.members.size > 0) {
            extra = `   ${message.mentions.members.first().user}`;
        }

        const fs = require('fs')
        const lengthJPG = fs.readdirSync("./images/sex/").filter(file => file.endsWith(".jpg")).length;
        const lengthJPEG = fs.readdirSync("./images/sex/").filter(file => file.endsWith(".jpeg")).length;
        const lengthGIF = fs.readdirSync("./images/sex/").filter(file => file.endsWith(".gif")).length;
        const lengthPNG = fs.readdirSync("./images/sex/").filter(file => file.endsWith(".png")).length;

        const luckyNumber = Math.random() * (lengthJPG + lengthJPEG + lengthPNG + lengthGIF);
        var cache = 0;

        const source = "./images/sex/";

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