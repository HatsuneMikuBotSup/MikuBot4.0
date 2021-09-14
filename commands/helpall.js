module.exports = {
  name: "helpall",
  description: "Lists ALL commands!",
  execute(message, prefix, botName, Discord) {

    var helpMessage =
    prefix+"anal                          - Anal\n" +
    prefix+"armpit                        - Weird fetish ig\n" +
    prefix+"ass                           - Big ass\n" +
    prefix+"baka                          - If u are stupid\n" +
    prefix+"bdsm                          - Bdsm with someone\n" +
    prefix+"bj                            - Blowjob\n" +
    prefix+"blowjob                       - Blowjob\n" +
    prefix+"blush                         - If u >///<\n" +
    prefix+"boobs                         - Boink!\n" +
    prefix+"bunny                         - Bunny outfit\n" +
    prefix+"choke                         - Chokes someone\n" +
    prefix+"creampie                      - Creampie\n" +
    prefix+"cute                          - Cute pics\n" +
    prefix+"die                           - If you want to die\n" +
    prefix+"feet                          - Weird fetish ig\n" +
    prefix+"fuck                          - Fucks someone\n" +
    prefix+"help                          - Lists all important commands\n" +
    prefix+"helpall                       - Lists every single command\n" +
    prefix+"h                             - Searches for Hentai on rule34\n" +
    prefix+"hentai                        - Searches for Hentai on rule34\n" +
    prefix+"horny                         - If u are desperatly horny\n" +
    prefix+"hug                           - Hug someone\n" +
    prefix+"kill                          - Kill someone\n" +
    prefix+"kiss                          - Kiss someone\n" +
    prefix+"lick                          - Lick someone\n" +
    prefix+"love                          - Love pictures!\n" +
    prefix+"marry                         - Marry someone\n" +
    prefix+"naked                         - Naked pictures!\n" +
    prefix+"ping                          - Ping the bot to see if its online\n" +
    prefix+"pussy                         - Thight pussy\n" +
    prefix+"rename                        - Join the cult (has to be enabled!)\n" +
    prefix+"renameall                     - Renames Everyone (has to be enabled! Admin/Mod Only!)\n" +
    prefix+"rob                           - Rob someone\n" +
    prefix+"sex                           - Sex with miku\n" +
    prefix+"spam                          - Spams entered text\n" +
    prefix+"spank                         - Spank someone\n" +
    prefix+"pain                          - If u are in pain\n";

    const embed = new Discord.MessageEmbed()
      .setTitle("Helpall")
      .setColor("#137a7f")
      .setAuthor(botName, "https://cdn.discordapp.com/avatars/782328525071056918/35121d26aa99b27416b19f9f51621a16.png")
      .setDescription(helpMessage);

    message.channel.send(embed);
  },
};
