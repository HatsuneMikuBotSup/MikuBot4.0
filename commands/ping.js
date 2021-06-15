module.exports = {
  name: "ping",
  description: "this is a ping command!",
    execute(message, date) {
        message.channel.send("Latency is: " + (message.createdTimestamp - Date.now()) + "ms\npong!");
    }
}
