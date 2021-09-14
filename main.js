//-------------------------------------------------------------------------------------------------Discord API

const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
client.commands = new Discord.Collection();
//Importing Discord API and setting directory of commands
const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

//-------------------------------------------------------------------------------------------------MySQL API

require("dotenv").config();
const readline = require("readline");
//setting up Connection to MySQL Database
const mysql = require("mysql");
const dailydosemiku = require("./commands/dailydosemiku");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQLPASS,
  database: "mikubot",
  supportBigNumbers: true,
}); //Connecting to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Database connected");
});

//-------------------------------------------------------------------------------------------------Constant
//Const Maps for less Database traffic
const prefix = new Map();
const chatWordsPercentage = new Map();
const slurFilter = new Map();

const channelLog = new Map();
const channelWelcome = new Map();
const channelDailyDoseMiku = new Map();

const roleAdmin = new Map();
const roleSus = new Map();
//Fixed const id's
const botName = "Miku";
const renameName = "UCanCallMe"; //should be around 10 Characters Never go over lenghth 30
const mainServer = "606567664852402188";
const hostID = "355429746261229568";
var date = new Date();

//-------------------------------------------------------------------------------------------------Boot

client.once("ready", () => {
  //gets executed once at the start of the bot
  updateMaps();
  client.user.setActivity(botName + " 4 President!");
  console.log(botName + " is online!");
});

function updateMaps() {
  //Synchronises the maps with the database. Only one get request
  client.guilds.cache.forEach((guild) => {
    db.query(
      "SELECT * FROM SERVER WHERE ID = " + guild.id + ";",
      function (err, result, fields) {
        console.log(result);
        if (result[0] == null) {
          db.query(
            "INSERT INTO SERVER(ID,NAME,PREFIX) VALUES(" +
              guild.id +
              ",'" +
              guild.name +
              "','!');"
          );
        } else {
          //Synchronises the maps with the database
          prefix.set(guild.id, result[0].PREFIX);
          chatWordsPercentage.set(guild.id, result[0].CHAT_WORDS_PERCENTAGE);
          slurFilter.set(guild.id, result[0].SLUR_FILTER);
          channelDailyDoseMiku.set(guild.id, result[0].DAILY_CHANNEL);
          channelLog.set(guild.id, result[0].LOG_CHANNEL);
          channelWelcome.set(guild.id, result[0].WELCOME_CHANNEL);
          roleAdmin.set(guild.id, result[0].ADMIN_ROLE);
          roleSus.set(guild.id, result[0].SUS_ROLE);
        }
      }
    );
  });
}

//-------------------------------------------------------------------------------------------------Message Event

client.on("message", (message) => {
  //gets called on every message
  console.log(
    message.guild.name + " " + message.author.tag + ": " + message.content
  );

  if (message.author.bot) {
    //ensures that the bot doesnt loop, talks with itself
    return 0;
  }

  //-------------------------------------------------------------------------------------------------Anti Racist Chat

  if (
    message.content.toLowerCase().includes("nigger") ||
    message.content.toLowerCase().includes("niggers") ||
    message.content.toLowerCase().includes("niger") ||
    message.content.toLowerCase().includes("nigga") ||
    message.content.toLowerCase().includes("niggas") ||
    message.content.toLowerCase().includes("niga")
  ) {
    //racist messages will get deleted
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

  if (Math.random() > chatWordsPercentage.get(message.guild.id) / 100) {
    //chatwords will be send back, multiple triggers are possible
    if (message.content.toLowerCase().includes("owo")) {
      message.channel.send("OwO");
    }
    if (message.content.toLowerCase().includes("òwó")) {
      message.channel.send("ÒwÓ");
    }
    if (message.content.toLowerCase().includes("uwu")) {
      message.channel.send("UwU");
    }
    if (message.content.toLowerCase().includes("ùwú")) {
      message.channel.send("ÙwÚ");
    }
    if (message.content.toLowerCase().includes("pog")) {
      message.channel.send("p...pog..pogchamp:see_no_evil::two_hearts:");
    }
    if (message.content.toLowerCase().includes("boop")) {
      message.channel.send("boop:two_hearts:");
    }
    if (message.content.toLowerCase().includes("nice")) {
      message.channel.send("69");
    }
    if (
      message.content.toLowerCase().includes("69") &&
      !message.content.includes("<")
    ) {
      message.channel.send("nice");
    } else if (
      message.content.toLowerCase().includes("420") &&
      !message.content.includes("<")
    ) {
      message.channel.send("nice");
    }
  }

  //-------------------------------------------------------------------------------------------------Commands Setup

  if (
    //setup for commands that start with the prefix
    message.content.startsWith(prefix.get(message.guild.id)) &&
    !message.author.bot &&
    !message.content.toLowerCase().includes("@everyone") &&
    !message.content.toLowerCase().includes("@here")
  ) {
    const args = message.content.slice(prefix.get(message.guild.id).length);
    const command = args.toLowerCase();
    const commandSplitted = command.split(/[ ,]+/);

    //-------------------------------------------------------------------------------------------------Host Commands

    if (message.author.id == hostID) {
      //these commands are only available for the bot host
      switch (commandSplitted[0]) {
        case "debugdailydosemiku":
          if (channelDailyDoseMiku.get(message.guild.id) != null) {
            client.commands
              .get("dailydosemiku")
              .execute(channelDailyDoseMiku.get(message.guild.id), client);
          } else {
            message.channel.send("Daily Dose of Miku is OFF");
          }
          break;
        case "exit":
          return process.exit(1);
        case "test":
          message.channel.send(message.member.guild.id);
          console.log(message.member.guild.id);
          break;
        case "renameall":
          client.commands.get("renameall").execute(message.guild, renameName);
          break;
        case "superban":
          client.commands.get("superban").execute(message, db);
          break;
        case "updatemaps":
          updateMaps();
          message.channel.send("Maps updatet");
          break;
      }
    }

    //-------------------------------------------------------------------------------------------------Owner/Admin Commands

    if (
      //these commands are only available for the server Owner/Admin
      message.guild.ownerID == message.author.id ||
      message.member.roles.cache.has(roleAdmin.get(message.guild.id))
    ) {
      switch (command) {
        //sets the current channel as the daily dose of miku channel
        case "set dailydosemiku":
          if (message.channel.nsfw) {
            db.query(
              "UPDATE SERVER SET DAILY_CHANNEL = " +
                message.channel.id +
                " WHERE ID = " +
                message.guild.id
            );
            message.channel.send(
              "Daily Dose of Miku set to channel: " + message.channel.toString()
            );
            updateMaps();
          } else {
            message.channel.send("This channel is not nsfw!");
          }
          return 0;
        case "set dailydosemiku off": //turns the daily dose of miku function off
          db.query(
            "UPDATE SERVER SET DAILY_CHANNEL = NULL WHERE ID = " +
              message.guild.id
          );
          message.channel.send("Daily Dose of Miku is OFF");
          updateMaps();
          return 0;

        //sets the current channel as the log channel
        case "set log":
          db.query(
            "UPDATE SERVER SET LOG_CHANNEL = " +
              message.channel.id +
              " WHERE ID = " +
              message.guild.id
          );
          message.channel.send(
            "Log set to channel: " + message.channel.toString()
          );
          updateMaps();
          return 0;
        case "set log off": //turns the log function off
          db.query(
            "UPDATE SERVER SET LOG_CHANNEL = NULL WHERE ID = " +
              message.guild.id
          );
          message.channel.send("Log is OFF");
          updateMaps();
          return 0;

        //sets the current channel as the welcome channel
        case "set welcome":
          db.query(
            "UPDATE SERVER SET WELCOME_CHANNEL = " +
              message.channel.id +
              " WHERE ID = " +
              message.guild.id
          );
          message.channel.send(
            "Welcome set to channel: " + message.channel.toString()
          );
          updateMaps();
          return 0;
        case "set welcome off": //turns the welcome function off
          db.query(
            "UPDATE SERVER SET WELCOME_CHANNEL = NULL WHERE ID = " +
              message.guild.id
          );
          message.channel.send("Welcome is OFF");
          updateMaps();
          return 0;
      }

      //change the server prefix
      switch (commandSplitted[0]) {
        case "ban":
          client.commands.get("ban").execute(message, client);
          return 0;
        case "prefix":
          if (commandSplitted[1] != null) {
            if (commandSplitted[1].length == 1) {
              db.query(
                "UPDATE SERVER SET PREFIX = '" +
                  commandSplitted[1] +
                  "' WHERE ID = " +
                  message.guild.id
              );
              message.channel.send("Prefix changed to: " + commandSplitted[1]);
              updateMaps();
            } else {
              message.channel.send("prefix to long!");
            }
          } else {
            message.channel.send(
              "current prefix is: " + prefix.get(message.guild.id)
            );
          }
          return 0;
      }
    }

    //-------------------------------------------------------------------------------------------------Interactive Commands

    switch (
      commandSplitted[0] //all non nsfw commands
    ) {
      case "blush":
        client.commands.get("blush").execute(message);
        break;
      case "bunny":
        client.commands.get("bunny").execute(message);
        break;
      case "baka":
        client.commands.get("baka").execute(message);
        break;
      case "cute":
        client.commands.get("cute").execute(message);
        break;
      case "die":
        client.commands.get("die").execute(message);
        break;
      case "help":
        client.commands
          .get("help")
          .execute(message, prefix.get(message.guild.id), botName, Discord);
        break;
      case "helpall":
        client.commands
          .get("helpall")
          .execute(message, prefix.get(message.guild.id), botName, Discord);
        break;
      case "hug":
        client.commands.get("hug").execute(message);
        break;
      case "kill":
        client.commands.get("kill").execute(message);
        break;
      case "kiss":
        client.commands.get("kiss").execute(message);
        break;
      case "lick":
        client.commands.get("lick").execute(message);
        break;
      case "love":
        client.commands.get("love").execute(message);
        break;
      case "marry":
        client.commands.get("marry").execute(message);
        break;
      case "member":
        message.channel.send(message.guild.memberCount);
        break;
      case "members":
        message.channel.send(message.guild.memberCount);
        break;
      case "miku":
        client.commands.get("cute").execute(message);
        break;
      case "rob":
        client.commands.get("rob").execute(message);
        break;
      case "spank":
        client.commands.get("spank").execute(message);
        break;
      case "spam":
        client.commands.get("spam").execute(message, args);
        break;
      case "pain":
        client.commands.get("pain").execute(message);
        break;
      case "ping":
        client.commands.get("ping").execute(message, date);
        break;
      case "rename":
        client.commands.get("rename").execute(message, renameName);
        break;
      case "setup":
        client.commands
          .get("setup")
          .execute(message, prefix.get(message.guild.id), botName, Discord);
        break;
    }

    //-------------------------------------------------------------------------------------------------NSFW Commands
    if (message.channel.nsfw) {
      switch (
        commandSplitted[0] //all nsfw commands
      ) {
        case "anal":
          client.commands.get("anal").execute(message);
          break;
        case "armpit":
          client.commands.get("armpit").execute(message);
          break;
        case "asshole":
          client.commands.get("anal").execute(message);
          break;
        case "bdsm":
          client.commands.get("bdsm").execute(message);
          break;
        case "bj":
          client.commands.get("blowjob").execute(message);
          break;
        case "blowjob":
          client.commands.get("blowjob").execute(message);
          break;
        case "boobies":
          client.commands.get("boobs").execute(message);
          break;
        case "boobs":
          client.commands.get("boobs").execute(message);
          break;
        case "choke":
          client.commands.get("choke").execute(message);
          break;
        case "creampie":
          client.commands.get("creampie").execute(message);
          break;
        case "cum":
          client.commands.get("creampie").execute(message);
          break;
        case "feet":
          client.commands.get("feet").execute(message);
          break;
        case "fuck":
          client.commands.get("sex").execute(message);
          break;
        case "h":
          client.commands
            .get("hentai")
            .execute(message.channel.id, args, client);
          break;
        case "hentai":
          client.commands
            .get("hentai")
            .execute(message.channel.id, args, client);
          break;
        case "horny":
          client.commands.get("horny").execute(message);
          break;
        case "naked":
          client.commands.get("naked").execute(message);
          break;
        case "oral":
          client.commands.get("blowjob").execute(message);
          break;
        case "pussy":
          client.commands.get("pussy").execute(message);
          break;
        case "sex":
          client.commands.get("sex").execute(message);
          break;
        case "titjob":
          client.commands.get("titjob").execute(message);
          break;
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
  "Heyya",
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
  "cutie",
];

client.on("guildMemberAdd", (member) => {
  //gets called every time a new member joins a server
  if (channelWelcome.get(member.guild.id) != null) {
    const channel = client.channels.cache.get(
      channelWelcome.get(member.guild.id)
    ); //member gets greated via random message
    channel.send(
      welcomeMessagePre[Math.floor(Math.random() * welcomeMessagePre.length)] +
        " <@" +
        member +
        "> " +
        welcomeMessageAft[Math.floor(Math.random() * welcomeMessageAft.length)]
    );
  }

  if (member.guild.id == mainServer) {
    //if the server is the main server all members will be renamy synchronised
    client.commands.get("renameall").execute(member.guild, renameName);
  }
});

//-------------------------------------------------------------------------------------------------Time Manager

var now = date.getHours() * 60 + date.getMinutes(); //starts and sets the offset for daily dose of miku, DO NOT TOUCH!
var offset = 0;
for (
  var i = 0;
  now + offset != 11 * 60 && now + offset != 23 * 60 && now + offset != 35 * 60;
  i++
) {
  offset++;
}
console.log(offset + " minutes offset");
setTimeout(function () {
  updateMaps(); //dailydose gets called once via offset so that the cycle can be synchronysed to 0:00 GMT
  client.guilds.cache.forEach((guild) => {
    client.commands
      .get("dailydosemiku")
      .execute(channelDailyDoseMiku.get(guild.id), client);
  });

  setInterval(function () {
    updateMaps(); //dailydose gets called for every server, every day once
    client.guilds.cache.forEach((guild) => {
      client.commands
        .get("dailydosemiku")
        .execute(channelDailyDoseMiku.get(guild.id), client);
    });
  }, 1000 * 60 * 60 * 24);
}, 1000 * 60 * offset);

//-------------------------------------------------------------------------------------------------On Join Event

client.on("guildCreate", async (guild) => {
  //gets called when the bot enters a server
  db.query(
    "SELECT * FROM SERVER WHERE ID = " + guild.id + ";",
    function (err, result, fields) {
      if (result[0] == null) {
        db.query(
          //server gets added to the database if the bot has never been in that server
          "INSERT INTO SERVER(ID,NAME,PREFIX) VALUES(" +
            guild.id +
            ",'" +
            guild.name +
            "','!')"
        );
        console.log("Added Server to the database");
      } else {
        console.log("Server allready on the database");
      }
      const channel = guild.channels.cache.find(
        (channel) =>
          channel.type === "text" &&
          channel.permissionsFor(guild.me).has("SEND_MESSAGES")
      ); //bot finds a channel with permissions to send a message and introduces itself there
      channel.send(
        "Thanks for inviting me OwO\n" + "You can set me up with !setup",
        { files: ["images/love/0.jpg"] }
      );
    }
  );
  updateMaps();
});

//-------------------------------------------------------------------------------------------------Client Login

(async () => {
  //bot connects with Discord api
  client.login(process.env.TOKEN);
})();
