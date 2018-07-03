const Discord = require('discord.js');
const snekfetch = require('snekfetch');
const fs = require('fs');

const path = "./commands/";
const commands = new Discord.Collection();

class CommandGroup {
    /**
     * 
     * @param {string} name Name of CommandGroup
     * @param {Array} commands Commands of CommandGroup
     */
    constructor(name, commands) {
        if (!name) name = "Default";
        if (!commands) commands = [];

        this.name = name;
        this.commands = commands;
    }
    /**
     * 
     * @param {Number} index 
     */
    get(index) {
        if (!index || Number.isNaN(index)) throw "Unknown index";

        return commands[index];
    }
}

