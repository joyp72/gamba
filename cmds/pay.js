const bet = require('../eco/bet.js')
module.exports = {
    commands: ['payout'],
    permissionError: 'You do not have access to this command.',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text) => {
        if (bet.isRunning()) {
            bet.payout(message, arguments[0])
        } else {
            message.reply(`No bet is currently in proccess.`)
        }
    },
    requiredRoles: ['main'],
}