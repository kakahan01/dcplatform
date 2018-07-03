const config = require('./config.json');
const Discord = require('discord.js');
const dc = require('./index.js');
const client = new Discord.Client();

const events = [ 
"channelCreate",
"channelDelete",
"channelPinsUpdate",
"channelUpdate",
"clientUserGuildSettingsUpdate",
"clientUserSettingsUpdate",
"debug",
"disconnect",
"emojiCreate",
"emojiDelete",
"emojiUpdate",
"error",
"guildBanAdd",
"guildBanRemove",
"guildCreate",
"guildDelete",
"guildMemberAdd",
"guildMemberAvailable",
"guildMemberRemove",
"guildMembersChunk",
"guildMemberSpeaking",
"guildMemberUpdate",
"guildUnavailable",
"guildUpdate",
"messageDelete",
"messageDeleteBulk",
"messageReactionAdd",
"messageReactionRemove",
"messageReactionRemoveAll",
"messageUpdate",
"presenceUpdate",
"ready",
"reconnecting",
"resume",
"roleCreate",
"roleDelete",
"roleUpdate",
"typingStart",
"typingStop",
"userNoteUpdate",
"userUpdate",
"voiceStateUpdate",
"warn"
];

client.login(config["token"]);

client.on('message', async (message) => {
    const prefix = config["prefix"];

    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;

    const dcPlatform = new dc.DCPlatform(client);

    var args = message.content.slice(prefix.length).split(" ");
    const command = args[0];
    
    if (events.some(e => command == e)) return;
    dcPlatform.run(command, message);
});

client.on('channelCreate', async (channel) => {
    const dcPlatform = new dc.DCPlatform(client);
    dcPlatform.event([channel], "channelCreate");
});

client.on('channelDelete', async (channel) => {
    const dcPlatform = new dc.DCPlatform(client);
    dcPlatform.event([channel], "channelDelete");
});

client.on('channelPinsUpdate', async (channel, time) => {
    const dcPlatform = new dc.DCPlatform(client);
    dcPlatform.event([channel, time], "channelPinsUpdate");
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

    const commandGroups = [
        group
    ];

    const dcPlatform = new dc.DCPlatform(client, commandGroups);

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