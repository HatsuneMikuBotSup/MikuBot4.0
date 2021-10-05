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
const renameName = "❤"; //should be around 10 Characters Never go over lenghth 30
const mainServer = "606567664852402188";
const hostID = "355429746261229568";
const botID = "782328525071056918";
var date = new Date();

//-------------------------------------------------------------------------------------------------DailyDoseImages

const dir = "./dailydose";
const fileExtension = new Map();
var filesLength;

fs.readdir(dir, (err, files) => {
  console.log(files.length + " files");
  filesLength = files.length;

  files.forEach((file) => {
    fileExtension.set(file.split(".")[0], file.split(".")[1]);
  });
});

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
        if (result[0] == null) {
          db.query(
            "INSERT INTO SERVER(ID,NAME,PREFIX,SLUR_FILTER,CHAT_WORDS_PERCENTAGE) VALUES(" +
              guild.id +
              ",'" +
              guild.name.replace("'", '"') +
              "','!', TRUE, 10)"
          );
          updateMaps();
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

function logThis(p1, p2) {
  if (channelLog.get(p1.id) != null) {
    const channel = client.channels.cache.get(channelLog.get(p1.id));
    channel.send(p2);
  }
}

//-------------------------------------------------------------------------------------------------Message Event

client.on("message", (message) => {
  //gets called on every message

  if (message.channel.type != "text") {
    console.log(message.author.tag + ": " + message.content);
  } else {
    console.log(
      message.guild.name + " " + message.author.tag + ": " + message.content
    );
  }

  if (message.author.bot) {
    //ensures that the bot doesnt loop, talks with itself
    return 0;
  }

  if (message.channel.type != "text") {
    message.channel.send(
      "Miku only works inside a server!\n" +
        "Invite me to your server OwO\n\n" +
        "https://discord.com/api/oauth2/authorize?client_id=782328525071056918&permissions=8&scope=bot",
      { files: ["images/cute/4.jpg"] }
    );
    return 0;
  }

  //-------------------------------------------------------------------------------------------------Anti Racist Chat

  if (slurFilter.get(message.guild.id)) {
    if (
      message.content.toLowerCase().includes("nigger") ||
      message.content.toLowerCase().includes("niggers") ||
      message.content.toLowerCase().includes("niger") ||
      message.content.toLowerCase().includes("nigga") ||
      message.content.toLowerCase().includes("niggas") ||
      message.content.toLowerCase().includes("niga")
    ) {
      //racist messages will get deleted
      message.channel.send(
        "U fucking racist go kys :D " + message.member.user.toString()
      );
      message.delete();
      logThis(
        message.guild,
        message.member.user.toString() + " said something racist"
      );
      return 0;
    }
  }

  //-------------------------------------------------------------------------------------------------Anti Dacancer Chat

  if (message.content.toLowerCase().includes("dababy")) {
    message.channel.send("dacancer is not funny :D");
    message.delete(); //if u think dababy is funny....no....just..no....
    return 0;
  }

  //-------------------------------------------------------------------------------------------------Chat Words

  if (Math.random() * 100 < Number(chatWordsPercentage.get(message.guild.id))) {
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
            dailyDoseMiku(message.guild);
          } else {
            message.channel.send("Daily Dose of Miku is OFF");
          }
          break;
        case "exit":
          return process.exit(1);
        case "invite":
          replyWithInvite(message);
          break;
        case "test":
          message.channel.send(message.member.guild.id);
          console.log(message.member.guild.id);
          break;
        case "renameall":
          client.commands
            .get("renameall")
            .execute(message.guild, renameName, true);
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

    async function replyWithInvite(message) {
      client.guilds.cache.forEach((guild) => {
        const channel = guild.channels.cache.find(
          (channel) =>
            channel.type === "text" &&
            channel.permissionsFor(guild.me).has("SEND_MESSAGES")
        );
        var invite = channel
          .createInvite({ maxAge: 0, maxUses: 1 })
          .then((invite) => {
            message.channel.send(
              invite
                ? `Here's your invite: ${invite}`
                : "There has been an error during the creation of the invite."
            );
          });
      });
    }

    //-------------------------------------------------------------------------------------------------Owner/Admin Commands

    if (
      //these commands are only available for the server Owner/Admin
      message.guild.ownerID == message.author.id ||
      message.member.roles.cache.has(roleAdmin.get(message.guild.id))
    ) {
      switch (
        command //---------------------------------------------------------------------full
      ) {
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
            logThis(
              message.guild,
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
          logThis(message.guild, "Daily Dose of Miku is OFF");
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

        case "set admin off": //turns the admin function off
          db.query(
            "UPDATE SERVER SET ADMIN_ROLE = NULL WHERE ID = " + message.guild.id
          );
          message.channel.send("Admin role is OFF");
          logThis(message.guild, "Admin role is OFF");
          updateMaps();
          return 0;

        case "set sus off": //turns the Sus function off
          db.query(
            "UPDATE SERVER SET SUS_ROLE = NULL WHERE ID = " + message.guild.id
          );
          message.channel.send("Sus role is OFF");
          updateMaps();
          return 0;

        case "set slurfilter off": //turns the slurfilter function off
          db.query(
            "UPDATE SERVER SET SLUR_FILTER = FALSE WHERE ID = " +
              message.guild.id
          );
          message.channel.send("Slurfilter  is OFF");
          logThis(message.guild, "Slurfilter  is OFF");
          updateMaps();
          return 0;

        case "set slurfilter on": //turns the slurfilter function on
          db.query(
            "UPDATE SERVER SET SLUR_FILTER = TRUE WHERE ID = " +
              message.guild.id
          );
          message.channel.send("Slurfilter is ON");
          logThis(message.guild, "Slurfilter is ON");
          updateMaps();
          return 0;
      }
      //------------------------------------------------------------------------splitted
      switch (commandSplitted[0]) {
        case "ban":
          client.commands.get("ban").execute(message, client);
          return 0;

        //change the server prefix
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
              logThis(
                message.guild,
                "Prefix changed to: " + commandSplitted[1]
              );
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

        case "set":
          switch (commandSplitted[1]) {
            //change the server admin role
            case "admin":
              if (message.mentions.roles.size == 1) {
                db.query(
                  "UPDATE SERVER SET ADMIN_ROLE = '" +
                    message.mentions.roles.first() +
                    "' WHERE ID = " +
                    message.guild.id
                );
                message.channel.send(
                  "Admin role changed to: <@&" +
                    message.mentions.roles.first() +
                    ">"
                );
                logThis(
                  message.guild,
                  "Admin role changed to: <@&" +
                    message.mentions.roles.first() +
                    ">"
                );
                updateMaps();
              } else {
                message.channel.send("Please mention the admin role with @");
              }
              return 0;

            //change the server chatwordpercentage
            case "percentage":
              if (commandSplitted[2] != null) {
                if (commandSplitted[2] <= 100 && commandSplitted[2] >= 0) {
                  db.query(
                    "UPDATE SERVER SET CHAT_WORDS_PERCENTAGE = '" +
                      commandSplitted[2] +
                      "' WHERE ID = " +
                      message.guild.id
                  );
                  message.channel.send(
                    "Echowords percentage changed to: " + commandSplitted[2]
                  );
                  updateMaps();
                } else {
                  message.channel.send("Enter a valid number between 0-100");
                }
              } else {
                message.channel.send(
                  "Current echowords percentage is: " +
                    chatWordsPercentage.get(message.guild.id)
                );
              }
              return 0;

            //change the server sus role
            case "sus":
              if (message.mentions.roles.size == 1) {
                db.query(
                  "UPDATE SERVER SET SUS_ROLE = '" +
                    message.mentions.roles.first() +
                    "' WHERE ID = " +
                    message.guild.id
                );
                message.channel.send(
                  "Sus role changed to: <@&" +
                    message.mentions.roles.first() +
                    ">"
                );
                updateMaps();
              } else {
                message.channel.send("Please mention the sus role with @");
              }
              return 0;
          }
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
        client.commands.get("cute").execute(message);
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
    client.commands.get("renameall").execute(member.guild, renameName, false);
  }
});

//-------------------------------------------------------------------------------------------------Time Manager

offset = 60 - date.getMinutes(); //starts and sets the offset for daily dose of miku, DO NOT TOUCH!
console.log(offset + " minutes offset");
setTimeout(function () {
  updateMaps(); //dailydose gets called once via offset so that the cycle can be synchronysed hourly
  client.guilds.cache.forEach((guild) => {
    dailyDoseMiku(guild);
  });

  setInterval(function () {
    updateMaps(); //dailydose gets called for every server, every hour
    client.guilds.cache.forEach((guild) => {
      dailyDoseMiku(guild);
    });
  }, 1000 * 60 * 60 * 1);
}, 1000 * 60 * offset);

function dailyDoseMiku(guild) {
  if (channelDailyDoseMiku.get(guild.id) != null) {
    const channel = client.channels.cache.get(
      channelDailyDoseMiku.get(guild.id)
    );

    channel.messages.fetch({ limit: 100 }).then((messages) => {
      messages.forEach((message) => {
        if (
          message.attachments.array()[0] != null &&
          message.reactions.cache != null
        ) {
          if (
            message.reactions.cache.array()[0].emoji.name == "👍" &&
            message.reactions.cache.array()[1].emoji.name == "👎" &&
            message.reactions != null &&
            message.author.id == botID
          ) {
            db.query(
              "INSERT INTO MEDIA(ID, TOTAL_UPVOTES, TOTAL_DOWNVOTES) VALUES(" +
                message.attachments.array()[0].name.split(".")[0] +
                "," +
                (message.reactions.cache.get("👍").count - 1) +
                "," +
                (message.reactions.cache.get("👎").count - 1) +
                ") ON DUPLICATE KEY UPDATE TOTAL_UPVOTES = " +
                (message.reactions.cache.get("👍").count - 1) +
                ", TOTAL_DOWNVOTES = " +
                (message.reactions.cache.get("👎").count - 1)
            );
          }
        }
      });
    });

    channel.send("This is YOUR Daily Dose of Miku!");
    for (var i = 0; i < 1; i++) {
      var image = Math.floor(Math.random() * filesLength);
      channel
        .send("", {
          files: ["dailydose/" + image + "." + fileExtension.get(image + "")],
        })
        .then(function (message) {
          message.react("👍");
          message.react("👎");
        })
        .catch(function (err) {
          console.log(err);
        });
    }
    client.user.setActivity("Daily Dose of Miku!");
    console.log("Daily Dose of Miku Time!");
  }
}

//-------------------------------------------------------------------------------------------------On Join Event

client.on("guildCreate", async (guild) => {
  //gets called when the bot enters a server
  db.query(
    "SELECT * FROM SERVER WHERE ID = " + guild.id + ";",
    function (err, result, fields) {
      if (result[0] == null) {
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
        { files: ["images/cute/0.jpg"] }
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
