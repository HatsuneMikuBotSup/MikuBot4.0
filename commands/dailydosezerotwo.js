module.exports = {
    name: "dailydosezerotwo",
    description: "will send nsfw zerotwo pics",
    execute(channelDailyZeroTwo, client) {
        const fs = require('fs')
        const length = fs.readdirSync("./images/dailydosezerotwo/").length
        var shoutouts = [
            "Zero Two is too thicc",
            "Zero Two is too THICC",
            "Zero Two is hot",
            "Zero Two is spicy",
            "Zero Two is cute",
            "OwO",
            "owo",
            "UwU",
            "uwu",
            "O//w//O",
            "02",
            "Zero Two",
            "Im in love with Zero Two",
            "KAWAII!",
            "its illegal to be that cute >.<",
            "would smash",
            "Darling",
            "Zero Two is Overrated, Anyways",
            "Am I or Ichigo thiccer?",
            "Am I or Ichigo hotter?",
            "Ichogo sus",
            "my boobs are the biggest >w<",
            "Hewoo :3",
            "Nick is simping for me",
            "Nick is simping but Hiro is my husbando",
            "Nick go simp for Ichigo",
            "Me howny owo",
            "Did u know Hiro has 18cm pp :heart:",
            ":heart: :heart: :heart:",
            ":weary: :weary: :weary:",
            ":woozy_face: :woozy_face: :woozy_face:",
            "Ara ara"
        ];
        const channel = client.channels.cache.get(channelDailyZeroTwo);

        for (var i = 0; i < 1; i++) {
            channel.send(shoutouts[Math.floor(Math.random() * shoutouts.length)], { files: ["./images/dailydosezerotwo/" + Math.floor(Math.random() * length) + ".jpg"] })
        }
        console.log("Zero Two Time!");
    }
}
