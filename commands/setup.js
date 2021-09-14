module.exports = {
  name: "setup",
  description: "Setup help",
  execute(message, prefix, embed) {
    var helpMessage =
      "Change server settings:\n" +
      prefix+"set prefix !               - Set a prefix for commands, can only be one character\n" +
      prefix+"set percentage 0-100       - Set a percentage how likely the bot  echos words like OwO\n" +
      prefix+"set slurfilter on          - Turns on a slurfilter that autodeletes racist messages\n" +
      prefix+"set slurfilter off         - Turns the slurfilter function off\n" +
      "-------------------------------------------------------\n" +
      "Change channels:\n" +
      prefix+"set dailydose              - Sets the current channel to the daily dose of miku channel\n" +
      prefix+"set dailydose off          - Turns the daily dose of miku function off\n" +
      prefix+"set log                    - Sets the current channel to the log channel\n" +
      prefix+"set log off                - Turns the log function off\n" +
      prefix+"set welcome                - Sets the current channel to the welcome channel\n" +
      prefix+"set welcome off            - Turns the welcome function off\n" +
      "-------------------------------------------------------\n" +
      "Change roles:\n" +
      prefix+"set admin @role            - When active users with this role will have acces to these commands\n" +
      prefix+"set admin off              - Turns the admin role function off\n" +
      prefix+"set sus @role              - When active users with a new account will be assignend this role\n" +
      prefix+"set sus off                - Turns the sus role function off\n";

    message.channel.send(helpMessage);
  },
};
