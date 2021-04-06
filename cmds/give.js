const setting = require("../eco/setting")
module.exports = {
    commands: ['give'],
    maxArgs: 2,
    minArgs: 2,
    callback: (message, arguments) => {
        const sender = message.author
        target = message.mentions.users.first()
        if (target != null) {
            console.log(target.id + ` ` + parseInt(arguments[1]))
            setting.addBal(target.id, parseInt(arguments[1]))
        }
    },
    requiredRoles: ['main'],
}