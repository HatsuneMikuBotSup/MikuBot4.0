module.exports = {
  name: "help",
  description: "Lists important commands!",
    execute(message, embed) {
        embed.setTitle("All commands:");
        embed.setDescription(
            "Miku commands:\n" +
            "!anal                       - Anal \n" +
            "!bj                         - Blowjob\n" +
            "!boobs                      - Boink!\n" +
            "!creampie                   - Creampie\n" +
            "!pussy                      - Thight pussy\n" +
            "-------------------------------------------------------\n" +
            "Self commands:\n" +
            "!baka                       - If u are stupid\n" +
            "!blush                      - If u >///<\n" +
            "!horny                      - If u are desperatly horny\n" +
            "!pain                       - If u are in pain\n" +
            "-------------------------------------------------------\n" +
            "User commands:\n" +
            "!choke [text]               - Chokes [text]\n" +
            "!fuck [text]                - Fucks [text]\n" +
            "!kiss [text]                - Kisses [text]\n" +
            "!marry [text]               - Marries [text]\n" +
            "-------------------------------------------------------\n" +
            "Other commands:\n" +
            "!h [text]                   - Searches for Hentai on rule34\n" +
            "!spam [text]                - Spams [text]\n" +
            "                                            " +
            "!helpall                    - List of ALL commands\n"
        );
        message.channel.send(embed);
    }
}
