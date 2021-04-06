const setting = require("../eco/setting")
module.exports = {
    commands: ['bal'],
    maxArgs: 1,
    minArgs: 0,
    callback: (message) => {
        const sender = message.author
        target = message.mentions.users.first()
        if (target != null) {
            message.reply(target.username + `'s balance is ` + setting.getBal(target.id) + ` coins.`)
        } else {
            message.reply(`Your Balance is: ` + setting.getBal(sender.id) + ` coins.`)
        }
    },
}