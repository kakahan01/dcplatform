const Discord = require('discord.js');
const snekfetch = require('snekfetch');
const fs = require('fs');

const path = "./commands/";
const commands = new Discord.Collection();

class DCPlatform {

    /**
     * 
     * @param {Discord.Client} token Bot Token
     */
    constructor (klient) {
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
}

module.exports = DCPlatform;