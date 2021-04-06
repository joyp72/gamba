const Discord = require('discord.js')
const bet = require('../eco/bet.js')
module.exports = {
    commands: ['gmb'],
    permissionError: 'You do not have access to this command.',
    minArgs: 1,
    maxArgs: 40,
    callback: (message, arguments, text) => {
        txt = ""
        n = 1
        if (isNaN(parseInt(arguments[0]))) {n = 0}
        for (i = n; i < arguments.length; i++) {
            txt = txt + arguments[i] + " "
        }
        bet.start(message, arguments[0], txt)
    },
    requiredRoles: ['main'],
}