module.exports = {
  name: "setup",
  description: "Setup help",
  execute(message, prefix, botName, Discord) {

    const embed = new Discord.MessageEmbed()
      .setTitle("Setup")
      .setColor("#137a7f")
      .setAuthor(botName, "https://cdn.discordapp.com/avatars/782328525071056918/35121d26aa99b27416b19f9f51621a16.png")

      .addField("Change server settings:", 
      prefix+"set prefix !               - Set a prefix for commands, can only be one character\n" +
      prefix+"set percentage 0-100       - Set a percentage how likely the bot  echos words like OwO\n" +
      prefix+"set slurfilter on          - Turns on a slurfilter that autodeletes racist messages\n" +
      prefix+"set slurfilter off         - Turns the slurfilter function off\n")

      .addField("Change channels:",
      prefix+"set dailydose              - Sets the current channel to the daily dose of miku channel\n" +
      prefix+"set dailydose off          - Turns the daily dose of miku function off\n" +
      prefix+"set log                    - Sets the current channel to the log channel\n" +
      prefix+"set log off                - Turns the log function off\n" +
      prefix+"set welcome                - Sets the current channel to the welcome channel\n" +
      prefix+"set welcome off            - Turns the welcome function off\n")

      .addField("Change roles:",
      prefix+"set admin @role            - Users with this role will have acces to these commands\n" +
      prefix+"set admin off              - Turns the admin role function off\n" +
      prefix+"set sus @role              - When active users with a new account will be assignend this role\n" +
      prefix+"set sus off                - Turns the sus role function off\n");

    message.channel.send(embed);
  }
};
