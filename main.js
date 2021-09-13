const Discord = require("discord.js");
const client = new Discord.Client();
const embed = new Discord.MessageEmbed();
const fs = require("fs");
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for(const file of commandFiles){
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
}

require('dotenv').config();
const readline = require('readline');

const mysql = require("mysql");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.MYSQLPASS,
    database: "mikubot"
});
db.connect((err) => {
    if (err){
        throw err;
    }
    console.log("Database connected")
})

 
var date = new Date();

//-------------------------------------------------------------------------------------------------Constant

const botName = "Miku";
const prefix = "!";

const channelGeneral = "606567664852402190";
const channelWelcome = "606569120808566814";
const channelDailyDoseMiku = "668260830160093184";
const channelDailyZeroTwo= "668260896010797058";

const roleAdmin = "607179836288663556";
const roleChoke = "788459296580042813";
const roleSus = "785810811721351218";

const renameName = "UCanCallMe"; //should be around 10 Characters Never go over lenghth 30

const mainServer = "606567664852402188";


//-------------------------------------------------------------------------------------------------Boot

client.once("ready", () => {
    console.log( botName + " is online!");
    client.user.setActivity(botName + " 4 President!");
    // client.channels.cache.get(channelGeneral).send("Im back OwO");
});

//-------------------------------------------------------------------------------------------------Message Event

client.on("message", message => {
    console.log(message.channel + " " + message.author.tag + ": " + message.content);

    if (message.author.bot) { //ensures that the bot doesnt loop, talks with itself
        return 0;
    }

    //-------------------------------------------------------------------------------------------------Anti Racist Chat

    if (message.content.toLowerCase().includes("nigger") ||
        message.content.toLowerCase().includes("niggers") ||
        message.content.toLowerCase().includes("niger") ||
        message.content.toLowerCase().includes("nigga") ||
        message.content.toLowerCase().includes("niggas") ||
        message.content.toLowerCase().includes("niga") 
    ) { //racist messages will get deleted 
        message.channel.send("U fucking racist go kys :D");
        message.delete();
        return 0;
    }

    //-------------------------------------------------------------------------------------------------Anti Dacancer Chat

    if (message.content.toLowerCase().includes("dababy")) {
        message.channel.send("dacancer is not funny :D");
        message.delete(); //if u think dababy is funny....no....just..no....
        return 0;
    }

    //-------------------------------------------------------------------------------------------------Chat Words

    if (!message.author.bot && Math.random() > 0.7) { //chatwords will be send back, multiple triggers are possible
        if (message.content.toLowerCase().includes("owo")) { message.channel.send("OwO"); }
        if (message.content.toLowerCase().includes("òwó")) { message.channel.send("ÒwÓ"); }
        if (message.content.toLowerCase().includes("uwu")) { message.channel.send("UwU"); }
        if (message.content.toLowerCase().includes("ùwú")) { message.channel.send("ÙwÚ"); }
        if (message.content.toLowerCase().includes("pog")) { message.channel.send("p...pog..pogchamp:see_no_evil::two_hearts:"); }
        if (message.content.toLowerCase().includes("boop")) { message.channel.send("boop:two_hearts:"); }
        if (message.content.toLowerCase().includes("nice")) { message.channel.send("69"); }
        if (message.content.toLowerCase().includes("69") && !message.content.includes("<")) { message.channel.send("nice"); }
        else if (message.content.toLowerCase().includes("420") && !message.content.includes("<")) { message.channel.send("nice"); }
    }

    //-------------------------------------------------------------------------------------------------Commands Setup

    if (message.content.startsWith(prefix) &&
        !message.author.bot &&
        !message.content.toLowerCase().includes("@everyone") &&
        !message.content.toLowerCase().includes("@here")) {

        const args = message.content.slice(prefix.length);
        const command = args.toLowerCase();
        const commandSplitted = command.split(/[ ,]+/);

        //-------------------------------------------------------------------------------------------------UCanCallMeMiku Commands

        if (message.author.id == 355429746261229568) {//these commands are only available for the bot host
            switch (command) {
                case "ban":                     client.commands.get("ban").execute(message, client); break;
                case "debugdailydosemiku":      client.commands.get("dailydosemiku").execute(channelDailyDoseMiku, client); break;
                case "debugdailydosezerotwo":   client.commands.get("dailydosezerotwo").execute(channelDailyZeroTwo, client); break;
                case "exit":                    return process.exit(1); break;
                case "test":                    message.channel.send(message.member.guild.id); console.log(message.member.guild.id); break;
                case "renameall":               client.commands.get("renameall").execute(message.guild, renameName); break;
                case "superban":                client.commands.get("superban").execute(message, db); break;
            }
            console.log("miku");
        }

        //-------------------------------------------------------------------------------------------------Owner Commands

        if (message.guild.ownerID == message.author.id) {//these commands are only available for the server Owner
            switch (command) {
                case "ban":                     client.commands.get("ban").execute(message, client); break;
                case "setup":                   client.commands.get("ban").execute(message, client); break;
            }
            console.log("owner");
        }
        
        //-------------------------------------------------------------------------------------------------Admin Commands

        if (message.member.roles.cache.has(roleAdmin)) {//these commands are only available for users with admin role
            switch (command) {
                case "ban":                     client.commands.get("ban").execute(message, client); break;
            }
        }

        //-------------------------------------------------------------------------------------------------Interactive Commands

        switch (commandSplitted[0]) { //all non nsfw commands
            case "blush":       client.commands.get("blush").execute(message); break;
            case "bunny":       client.commands.get("bunny").execute(message); break;
            case "baka":        client.commands.get("baka").execute(message); break;
            case "cute":        client.commands.get("cute").execute(message); break;
            case "die":         client.commands.get("die").execute(message); break;
            case "help":        client.commands.get("help").execute(message, embed); break;
            case "helpall":     client.commands.get("helpall").execute(message, embed); break;
            case "hug":         client.commands.get("hug").execute(message); break;
            case "kill":        client.commands.get("kill").execute(message); break;
            case "kiss":        client.commands.get("kiss").execute(message); break;
            case "lick":        client.commands.get("lick").execute(message); break;
            case "love":        client.commands.get("love").execute(message); break;
            case "marry":       client.commands.get("marry").execute(message); break;
            case "member":      message.channel.send(message.guild.memberCount); break;
            case "members":     message.channel.send(message.guild.memberCount); break;
            case "miku":        client.commands.get("cute").execute(message); break;
            case "rob":         client.commands.get("rob").execute(message); break;
            case "spank":       client.commands.get("spank").execute(message); break;
            case "spam":        client.commands.get("spam").execute(message, args); break;
            case "pain":        client.commands.get("pain").execute(message); break;
            case "ping":        client.commands.get("ping").execute(message, date); break;
            case "rename":      client.commands.get("rename").execute(message, renameName); break;
        }
        

        //-------------------------------------------------------------------------------------------------NSFW Commands
        if (message.channel.nsfw) {
            switch (commandSplitted[0]) { //all nsfw commands
                case "anal":        client.commands.get("anal").execute(message); break;
                case "armpit":      client.commands.get("armpit").execute(message); break;
                case "asshole":     client.commands.get("anal").execute(message); break;
                case "bdsm":        client.commands.get("bdsm").execute(message); break;
                case "bj":          client.commands.get("blowjob").execute(message); break;
                case "blowjob":     client.commands.get("blowjob").execute(message); break;
                case "boobies":     client.commands.get("boobs").execute(message); break;
                case "boobs":       client.commands.get("boobs").execute(message); break;
                case "choke":       client.commands.get("choke").execute(message); break;
                case "creampie":    client.commands.get("creampie").execute(message); break;
                case "cum":         client.commands.get("creampie").execute(message); break;
                case "feet":        client.commands.get("feet").execute(message); break;
                case "fuck":        client.commands.get("sex").execute(message); break;
                case "h":           client.commands.get("hentai").execute(message.channel.id, args, client); break;
                case "hentai":      client.commands.get("hentai").execute(message.channel.id, args, client); break;
                case "horny":       client.commands.get("horny").execute(message); break;
                case "naked":       client.commands.get("naked").execute(message); break;
                case "oral":        client.commands.get("blowjob").execute(message); break;
                case "pussy":       client.commands.get("pussy").execute(message); break;
                case "sex":         client.commands.get("sex").execute(message); break;
                case "titjob":      client.commands.get("titjob").execute(message); break;
            }
        }
    }
});

//-------------------------------------------------------------------------------------------------On Join Event

const welcomeMessagePre = [
    "Henlo",
    "Hewoo",
    "konnichiwa",
    "ohayoo",
    "U finally made it",
    "Its the legendery hentai dealer",
    "Heyya"
];

const welcomeMessageAft = [
    "u look good today",
    "UwU",
    "OwO",
    "welcome to hell!",
    "welcome to Hatsune Miku NSFW Club",
    "welcome to the dark side",
    "u have come to the right place",
    "get ready for 4k tentacle hentai",
    "*notices ur bulge*",
    "If you leave ur gay :>",
    "pwease stay with me :3",
    "ur cute owo",
    "cutie"
];

client.on("guildMemberAdd", member => {//new members will be greeted in welcome channel

    if (true /*server has a welcome channel*/) {
        const channel = client.channels.cache.get(/*server welcome channel*/);
        channel.send(   welcomeMessagePre[Math.floor(Math.random() * welcomeMessagePre.length)]
        + " <@" + member + "> " +
        welcomeMessageAft[Math.floor(Math.random() * welcomeMessageAft.length)]);
    }
    
    if (member.guild.id == mainServer) {
        client.commands.get("renameall").execute(member.guild, renameName);
    }
});


//-------------------------------------------------------------------------------------------------Time Manager

var now = date.getHours()*60 + date.getMinutes(); //starts and sets the offset for dailydose, DO NOT TOUCH!
var offset = 0;
for (var i = 0; now + offset != 11 * 60 && now + offset != 23 * 60 && now + offset != 35 * 60; i++) {
    offset++;
}
console.log(offset + " minutes offset");
setTimeout(function () {
    client.commands.get("dailydosemiku").execute(channelDailyDoseMiku, client)
    client.commands.get("dailydosezerotwo").execute(channelDailyZeroTwo, client);

    setInterval(function () {
        client.commands.get("dailydosemiku").execute(channelDailyDoseMiku, client);
    }, 1000 * 60 * 60 * 24);

    setInterval(function () {
        client.commands.get("dailydosezerotwo").execute(channelDailyZeroTwo, client);
    }, 1000 * 60 * 60 * 12);

}, 1000 * 60 * offset);


//-------------------------------------------------------------------------------------------------On Join Event

client.on('guildCreate', async guild => {
    await db.query("INSERT INTO SERVER(ID,NAME) VALUES("+guild.id+",'"+guild.name+"')").catch((error) => {
        console.error(error);
    });

    const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'));
    channel.send("Thanks for inviting me OwO\n" + "You can set me up with !setup");
})

//-------------------------------------------------------------------------------------------------Client Login

client.login(process.env.TOKEN);

