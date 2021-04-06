const coindata = require('./coindata.json')
const setting = require('./setting.js')
const Discord = require('discord.js')
const fs = require('fs')
yes = {} //users
no = {}
running = false
yesNames = [] //id coin
noNames = []
mod = 1
text = ""
tme = 0
m = 0
m1 = 0
ended = false  //timer
yumeko = 'https://static.wikia.nocookie.net/kakegurui/images/1/18/YumekoNewprofile.jpg/revision/latest?cb=20190712210508'

const setupMod = function() {
    yesTotal = 0
    noTotal = 0
    mod = 1
    yy = yes
    nn = no
    for (i = 0; i < yy.length; i++) {
        bet = yy[id]
        yesTotal = yesTotal + bet
    }
    for (i = 0; i < nn.length; i++) {
        bet = nn[id]
        noTotal = noTotal + bet
    }
    if (yesTotal < noTotal) {
        mod = noTotal/yesTotal
        return
    } else if (noTotal < yesTotal) {
        mod = yesTotal/noTotal
        return
    } else if (yesTotal === noTotal) {
        mod = 1.2
        return
    }

}

const isRunning = function() {
    return running
}

const payout = function(message, team) {
    setupMod()
    yy = yes
    nn = no
    if (team === `yes` || team === `no`) {
    for (i = 0; i < yesNames.length; i++) {
        id = yesNames[i].id
        bet = yy[id]
        if (team === `yes`) {
            require('./setting').addBal(id, bet*mod)
        } else if (team === `no`) {
            require('./setting').subBal(id, bet)
        }
    }
    for (i = 0; i < noNames.length; i++) {
        id = noNames[i].id
        bet = nn[id]
        if (team === `no`) {
            require('./setting').addBal(id, bet*mod)
        } else if (team === `yes`) {
            require('./setting').subBal(id, bet)
        }
    }
    resultsEmbed(message, team)
    yes = {}
    no = {}
    yesNames = []
    noNames = []
    if (ended) {
        m1.delete()
    }
    m.delete()
    message.delete()
    running = false;
}
}

const yesContains = function(id) {
    yy = yes
    keys = Object.keys(yy)
    for (i = 0; i < keys.length; i++) {
        if (keys[i] == id) {
            return true
        } else return false
    }
}

const incrUser = function(id) {
    if (yesContains(id)) {
        yes[id] = yes[id] + 10
    } else if (noContains(id)) {
        no[id] = no[id] + 10
    }
}

const noContains = function(id) {
    nn = no
    keys = Object.keys(nn)
    for (i = 0; i < keys.length; i++) {
        if (keys[i] == id) {
            return true
        } else return false
    }
}

const saveData = function() {
    fs.writeFileSync('./eco/coindata.json', JSON.stringify(coindata))
}

const yesList = function() {
    list = "-"
    yy = yes
    for (i = 0; i < yesNames.length; i++) {
            list = list + "\n" + yesNames[i].username + ": " + yy[yesNames[i].id] + " coins"
    }
    return list
}

const noList = function() {
    list = "-"
    nn = no
    keys = Object.keys(nn)
    for (i = 0; i < noNames.length; i++) {
            list = list + "\n" + noNames[i].username + ": " + nn[noNames[i].id] + " coins"
    }
    return list
}

const resultsEmbed = function(message, team) {
    wlst = ""
    llst = ""
    if (team === `yes`) {
        wlst = yesList()
        llst = noList()
    } else if (team === `no`) {
        wlst = noList()
        llst = yesList()
    } else return
    resEmbed = new Discord.MessageEmbed()
    .setTitle('Results:')
    .setDescription(text)
    .addFields({
        name: 'Winners:',
        value: wlst,
        inline: true,
    },
    {
        name: 'Losers:',
        value: llst,
        inline: true, 
    })
    message.channel.send(resEmbed)
}

const updateEmbed = function(message) {
    newEmbed = new Discord.MessageEmbed()
    .setTitle(text)
    //.setDescription(`Time to bet: ` + tme + `s`)
    .addFields({
        name: 'Voted YES:',
        value: yesList(),
        inline: true,
    },
    {
        name: 'Voted NO:',
        value: noList(),
        inline: true,
    }
    )
    message.edit(newEmbed)
    m = message
}

const start = function(message, time, txt) {
    if (isRunning()) {
        message.reply(`A bet is already in proccess!`)
        return
    } else {running = true}
    message.delete()
    ended = false
    text = txt
    tme = time
    //const logo = 'https://cdn.betterttv.net/emote/5e9643a2d023b362f6381be1/3x'
    const embed = new Discord.MessageEmbed()
    .setTitle(text)
    //.setDescription(`Time to bet: ` + tme + `s`)
    .addFields({
        name: 'Voted YES:',
        value: yesList(),
        inline: true,
    },
    {
        name: 'Voted NO:',
        value: noList(),
        inline: true,
    }
    )
    //.setThumbnail(logo)
    message.channel.send(embed).then(msg => {
        msg.react('828387842362572810')
        msg.react('828387842173567027')
        msg.react('⬆️')
        m = msg
        const filter = (reaction, user) => {
            if (user.id !== msg.author.id) {
                return reaction.emoji.id === '828387842362572810' || reaction.emoji.id === '828387842173567027' || reaction.emoji.name === '⬆️'
            } else return false
        };
        if (isNaN(parseInt(time))) {time = 10}
        const collector = msg.createReactionCollector(filter, {time: 1000*time})

        collector.on('collect', (reaction, user) => {
            if (reaction.emoji.name === '⬆️') {
                incrUser(user.id)
                saveData()
                updateEmbed(msg)
                userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(user.id))
            for (reac of userReactions.values()) {
                reaction.users.remove(user.id)
            }
            return
            } else if (yesContains(user.id)|| noContains(user.id)) {
                userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(user.id))
            for (reac of userReactions.values()) {
                reaction.users.remove(user.id)
            }
            return
            }
            if (reaction.emoji.id === '828387842362572810') {
                    yes[user.id] = 10
                    //if (yesNames.length == 0){
                    yesNames[yesNames.length] = user
                    //} else {
                    //    yesNames[yesNames.length + 1] = user
                    //}
                saveData()
                updateEmbed(msg)
            } else if (reaction.emoji.id === '828387842173567027') {
                    no[user.id] = 10
                    //if (noNames.length == 0) {
                    noNames[noNames.length] = user
                   // } else {
                      //  noNames[noNames.length + 1] = user
                    //}
                saveData()
                updateEmbed(msg)
            }
        })

        collector.on('end', collected => {
            if (ended) {
                return
            }
            ended = true
            msg.channel.send(`The bet has ended.`).then(messa => {
                m1 = messa
            })
            setupMod()
        });
    })
}

module.exports = {
    start,
    isRunning,
    payout,
    running
}