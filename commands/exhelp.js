const Discord = require('discord.js');
const config = require('../config.json');
const dc = require('../index.js');

module.exports.argRun = async (client, message) => {
    if (module.exports.config.disable) return;

    let helpMessage = "**Commands:**\n";
    let groups = [];

    const dcPlatform = new dc.DCPlatform(client);

    dcPlatform.getAllCommands().array.forEach(cmd => {
        if (cmd.config.group) {
            if (!groups.includes(cmd.config.group)) groups.push(cmd.config.group);
        }
    });

    if (groups[0]) {
        groups.forEach(g => {
            helpMessage += "*g:*\n";
            dcPlatform.getAllCommands().array.forEach(cmd => {
                if (cmd.config.group) {
                    if (cmd.config.group == g) {
                        helpMessage += cmd + "\n";
                    }
                }
            });
        })
    } else {
        dcPlatform.getAllCommands().array.forEach(cmd => {
            helpMessage += cmd + "\n";
        });
    }
}

module.exports.run = async (client) => {
    if (module.exports.config.disable) return;
}


module.exports.config = {
    disable: null,
    group: null
};