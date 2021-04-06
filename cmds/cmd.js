const {prefix} = require('../config.json')
json = require('../config.json')

module.exports = (client, commandOptions) => {
    let {
        commands,
        expectedArgs = '',
        permissionError = 'You do not have access to this command.',
        minArgs = 0,
        maxArgs = null,
        requiredRoles = [],
        callback
    } = commandOptions

    if (typeof commands === 'string') {
        commands = [commands]
    }

    console.log(`Preparing command "${commands[0]}"`)

    client.on('message', message => {
        const { member, content, guild } = message
        for (const alias of commands) {
            const command = `${prefix}${alias}`
            if (content.toLowerCase().startsWith(command)) {
                for (const requiredRole of requiredRoles) {
                    const role = guild.roles.cache.find(role => role.name === requiredRole)
                    if (!role || !member.roles.cache.has(role.id)) {
                        message.reply(permissionError)
                        return
                    }
                }
                const arguments = content.split(/[ ]+/)
                arguments.shift()
                if (arguments.length < minArgs || arguments.length > maxArgs) {
                    message.reply(`Invalid amount of arguments.`)
                    return
                }
                callback(message, arguments, arguments.join(' '))
                return
            }
        }
    })
}