const config = require('./config.json');
const Discord = require('discord.js');
const dc = require('./index.js');
const client = new Discord.Client();

client.login(config["token"]);

client.on('message', async (message) => {
    const prefix = config["prefix"];

    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;

    const dcPlatform = new dc.DCPlatform(client);

    var args = message.content.slice(prefix.length).split(" ");
    const command = args[0];
    
    dcPlatform.run(command, message);
});

/*
if you want to set groups;

client.on('message', async (message) => {
    const prefix = config["prefix"];

    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;

    const group = new dc.Group().set("Owner", [
        "exenable",
        "exdisable"
    ]),;

    const dcPlatform = new dc.DCPlatform(client);

    var args = message.content.slice(prefix.length).split(" ");
    const command = args[0];
    
    dcPlatform.run(command, message);
});
*/

client.on('ready', async () => {
    client.user.setUsername(config["botname"]);
    client.user.setActivity(config["activity"]["message"], {url: "https://twitch.tv/kadsadsa", type: config["activity"]["type"]});
    console.log("Bot is open");
});