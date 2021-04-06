const { prefix } = require('./config.json')

module.exports = (client, alias, callback) => {
    //if (typeof aliases === 'string') {
    //    aliases = [aliases]
    //}
    client.on('message', message => {
        const { content } = message;
            const command = `${prefix}${alias}`
            if (content.startsWith(command)) {
                console.log(`Running the command ${command}`)
                callback(message)
            }
    })
}