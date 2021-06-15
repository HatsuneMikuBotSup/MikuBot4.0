module.exports = {
    name: "rename",
    description: "renames member to rename",
    execute(message, renameName) {

        if (!message.member.nickname.toLowerCase().includes(renameName.toLowerCase())) {
            if (message.member.user.username.length + renameName.length <= 32) {
                message.member.setNickname(renameName + message.member.user.username).catch(error);
            } else {
                message.member.setNickname(renameName + message.member.user.username.substring(0, 31 - renameName.length)).catch(error);
            }
        }

    }
}