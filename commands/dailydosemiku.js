module.exports = {
  name: "dailydosemiku",
  description: "will send nsfw miku pics",
    execute(channelDailyDoseMiku, client){
        const fs = require('fs')
        const length = fs.readdirSync("./images/dailydosemiku/").length

        const channel = client.channels.cache.get(channelDailyDoseMiku);
        channel.send("This is YOUR Daily Dose of Miku!");

        for (var i = 0; i < 2; i++){
            channel.send("", { files: ["./images/dailydosemiku/" + Math.floor(Math.random() * length) + ".jpg"] })
        }
        client.user.setActivity("daily dose of miku!");
        console.log("Daily Dose of Miku Time!");
    }
}
