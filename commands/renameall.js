module.exports = {
    name: "renameall",
    description: "renames all to rename",
    execute(thisGuild, renameName) {
        const guild = thisGuild;
        guild.members.fetch().then(members => {
            members.forEach(member => {
                if (!member.nickname || !member.nickname.toLowerCase().includes(renameName.toLowerCase())) {
                    if (member.user.username.length + renameName.length <= 32) {
                        member.setNickname(renameName + member.user.username);
                    } else {
                        member.setNickname(renameName + member.user.username.substring(0, 31 - renameName.length));
                    }
                }
            });
        });
    }
}