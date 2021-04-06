const coindata = require('./coindata.json')
const bet = require('./bet.js')
const players = coindata.players
const fs = require('fs')

const saveData = function() {
    fs.writeFileSync('./eco/coindata.json', JSON.stringify(coindata))
}

const prn = function() {
    console.log(players["dante"])
    saveData()
}

const setBal = function(id, n) {
    players[id] = n
    saveData()
}

const subBal = function(id, n) {
    bal = getBal(id)
    players[id] = bal - n
    saveData()
}

const addBal = function(id, n) {
    bal = getBal(id)
    players[id] = bal + n
    saveData()
}

const inData = function(id) {
    keys = Object.keys(players)
    for (i = 0; i < keys.length; i++) {
        if (keys[i] == id) {
            return true
        }
    }
    return false
}

const getBal = function(id) {
    if (inData(id)) {
        return players[id]
    } else {
        setBal(id, 0)
        return 0
    }
}

module.exports = {
    commands: [''],
    maxArgs: 1,
    minArgs: 0,
    prn,
    getBal,
    setBal,
    inData,
    saveData,
    addBal,
    subBal,
    callback: (message) => {
    },
}




