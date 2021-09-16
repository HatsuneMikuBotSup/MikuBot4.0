module.exports = {
  name: "renameall",
  description: "renames all to rename",
  execute(thisGuild, renameName, justDoIt) {
    const guild = thisGuild;
    guild.members.fetch().then((members) => {
      members.forEach(async (member) => {
        if (member.user.id == guild.ownerID) {
          console.log(member.user);
        } else {
          if (
            !member.nickname ||
            !member.nickname.toLowerCase().includes(renameName.toLowerCase()) ||
            justDoIt
          ) {
            if (member.user.username.length + renameName.length <= 32) {
              await member.setNickname(renameName + member.user.username);
            } else {
              await member.setNickname(
                renameName +
                  member.user.username.substring(0, 31 - renameName.length)
              );
            }
          }
        }
      });
    });
  },
};
