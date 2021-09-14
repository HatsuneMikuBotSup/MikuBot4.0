module.exports = {
  name: "help",
  description: "Lists important commands!",
  execute(message, prefix, embed) {
    var helpMessage =
      "Miku commands:\n" +
      prefix+"anal                       - Anal \n" +
      prefix+"bj                         - Blowjob\n" +
      prefix+"boobs                      - Boink!\n" +
      prefix+"creampie                   - Creampie\n" +
      prefix+"pussy                      - Thight pussy\n" +
      "-------------------------------------------------------\n" +
      "Self commands:\n" +
      prefix+"baka                       - If u are stupid\n" +
      prefix+"blush                      - If u >///<\n" +
      prefix+"horny                      - If u are desperatly horny\n" +
      prefix+"pain                       - If u are in pain\n" +
      "-------------------------------------------------------\n" +
      "User commands:\n" +
      prefix+"choke [text]               - Chokes [text]\n" +
      prefix+"fuck [text]                - Fucks [text]\n" +
      prefix+"kiss [text]                - Kisses [text]\n" +
      prefix+"marry [text]               - Marries [text]\n" +
      "-------------------------------------------------------\n" +
      "Other commands:\n" +
      prefix+"h [text]                   - Searches for Hentai on rule34\n" +
      prefix+"spam [text]                - Spams [text]\n" +
      prefix+"helpall                    - List of ALL commands\n" +
      prefix+"setup                      - Helps with the setup of the bot\n";
    message.channel.send(helpMessage);
  },
};
