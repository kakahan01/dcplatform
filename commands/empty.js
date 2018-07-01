//DO NOT require dcPlatform

const Discord = require('discord.js');
const config = require('../config.json');

module.exports.argRun = async (client, message) => {
    if (module.exports.config.disable) return;
}

module.exports.run = async (client) => {
    if (module.exports.config.disable) return;
}


module.exports.config = {
    disable: null
};