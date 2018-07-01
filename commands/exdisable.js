const Discord = require('discord.js');
const dc = require('../index.js');
const config = require('../config.json');

module.exports.argRun = async (client, message) => {
    if (module.exports.config.disable) return;

    const dcPlatform = new dc(client);

    var args = message.content.slice(config["prefix"].length).split(" ");

    const command = args[1];

    if (!command) return message.channel.send("Provide a command please");
    if (message.author.id !== config["ownerID"]) return message.channel.send("Owner only command.");

    dcPlatform.disable(command);
}

module.exports.run = async (client) => {
    if (module.exports.config.disable) return;
}

module.exports.config = {
    disable: null
};