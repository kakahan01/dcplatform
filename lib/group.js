const Discord = require('discord.js');
const snekfetch = require('snekfetch');
const fs = require('fs');

const path = "./commands/";
const commands = new Discord.Collection();
const CommandGroup = require('./CommandGroup');

class Group {

    constructor() {
        this.commands = [];
        this.CommandGroup = new CommandGroup();
    }

    /**
     * 
     * @param {string} name The name of the group
     * @param {Array} commands The commands of the group
     */
    set(name, commands) {
        if (!name) throw "Name must be provided";
        if (!commands) commands = [];

        this.commands = commands;
        this.CommandGroup = new CommandGroup(name, commands);
        return this.CommandGroup;
    }

    /**
     * Destroy the command
     */
    destroy() {
        this.CommandGroup = new CommandGroup();
        this.commands = [];
    }

    get(index) {
        if (!index) throw "Index must be provided";
        return this.CommandGroup.get(index);
    }
}

module.exports = Group;