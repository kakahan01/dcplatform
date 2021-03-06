const Discord = require('discord.js');
const snekfetch = require('snekfetch');
const fs = require('fs');

const path = "./commands/";
const commands = new Discord.Collection();


class DCPlatform {

    /**
     * 
     * @param {Discord.Client} klient Client of the bot
     * @param {string} prefix Prefix of the bot
     * @param {Array} commandGroups Command groups
     */
    constructor (klient, commandGroups) {
        if (!klient) throw "Client must be provided";

        this.client = klient;
        
        
fs.readdir(path, (err, found) => {
    if (err) console.log(err);
    const cmds = found.filter(f => f.endsWith(".js"));
    cmds.forEach(e => {
        const command = require(path + e);
        commands.set(e.split(".js").join(""), command);
    });
});
if (commandGroups) {
    commandGroups.forEach(group => {
        commands.forEach(c => {
            if (group.includes(c)) {
                c.config.group = group.name;
            }
        })
    });
}

    }

    /**
     * 
     * @param {string} command Command will run
     * @param {Discord.Message} message Message to send to file
     */
    run (command, message) {
        if (!command) throw "RUNERR: Command is not provided";

        const cmd = commands.get(command);
        if (!cmd) return console.log("Command not found");

        cmd.argRun(this.client, message);
        return cmd.run(this.client);
    }

    /**
     * 
     * @param {string} command Command to delete
     */
    remove (command) {
        if (!command) throw "REMERR: Command is not provided";

        const cmd = commands.get(command);
        if (!cmd) throw "REMERR: Command not found";
        return commands.delete(cmd);
    }
    
    /**
     * 
     * @param {Array} array 
     * @param {string} name
     */
    event (array, name) {
        if (!name) throw "Name must be provided";
        if (!array) throw "Array must be provided";

        const cmd = commands.get(name);
        if (!cmd) throw "Event Command not found";

        cmd.run(array, this.client);
    }

    /**
     * 
     * @param {string} command Command to disable
     */
    disable (command) {
        if (!command) throw "DISERR: Command is not provided";

        const cmd = commands.get(command);
        if (!cmd) throw "DISERR: Command not found";

        return cmd.config.disable = true;
    }

    /**
     * 
     * @param {string} command Command to enable
     */
    enable (command) {
        if (!command) throw "ENABLERR: Command is not provided";

        const cmd = commands.get(command);
        if (!cmd) throw "ENABLERR: Command not found";

        return cmd.config.disable = false;
    }
    /**
     * Get all commands of platform
     */
    getAllCommands() {
        return commands;
    }
}

module.exports = DCPlatform;