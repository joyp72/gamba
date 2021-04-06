const Discord = require('discord.js')
const path = require('path')
const fs = require('fs')
const client = new Discord.Client()
const config = require('./config.json')
const command = require('./command')

client.on('ready', () => {
    console.log('the client is ready!')

    const commandFile = 'cmd.js'
    const cmdFile = require(`./cmds/${commandFile}`)
    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file))
            } else if (file !== commandFile) {
                const option = require(path.join(__dirname, dir, file))
                cmdFile(client, option)
            }
        }
    }
    readCommands('cmds')
})

client.login(config.token)
