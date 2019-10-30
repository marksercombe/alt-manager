const fs = require("fs");
const mineflayer = require("mineflayer");
const Discord = require("discord.js");
const settings = require("./settings.json");
const botversion = "1.0.4";

console.log(`\n          #################\n          ## Alt manager ##\n          ##  By: Hadan  ##\n          ##  v: ${botversion}   ##\n          #################\n\n\n\n\n`);


let client = new Discord.Client();


let helpEmbed = new Discord.RichEmbed()
.setTitle("Help")
.setColor(settings.embedcolor)
.addField("Connect", `${settings.prefix}connect [all / number] [host]`)
.addField("Disconnect", `${settings.prefix}disconnect [all / username] (if fails use ${settings.prefix}restart)`)
.addField("Message", `${settings.prefix}message [all / username] [message]`)
.addField("Restart", `${settings.prefix}restart`)
.setFooter("Hadan Bots -> https://discord.gg/dYdJtSK")
.addBlankField();


let disconnectEmbed;
let messageEmbed;
let args = [];
let account = [];
let botArray = [];
let botNames = [];
let lowerCaseNames = [];

function connect(message, arg) {
  
  lowerCaseNames = [];
  botArray = [];
  botNames = [];

  
  var list = fs.readFileSync("./alts.txt", "utf-8").split("\r\n");
  
  if (args[1] === "all") {
    let embed = new Discord.RichEmbed()
    .setTitle("Connected accounts [0] -> " + arg)
    .setDescription("None")
    .setColor(settings.embedcolor)
    .setFooter("Hadan Bots -> https://discord.gg/dYdJtSK");
    
    message.channel.send(embed).then(msg => {
      for (let i = 0; i < list.length; i++) {
        setTimeout(() => {
          account = list[i].split(":");
          let bot = mineflayer.createBot({
            username: account[0],
            password: account[1],
            host: arg,
            version: settings.version,
            plugins: {
              chest: false,
              conversions: false,
              dispenser: false,
              enchantment_table: false,
              furnace: false,
              math: false,
              painting: false,
              scoreboard: false,
              scoreboard: false,
              villager: false,
              bed: false,
              block_actions: false,
              blocks: false,
              book: false,
              boss_bar: false,
              chest: false,
              command_block: false,
              craft: false,
              digging: false,
              dispenser: false,
              enchantment_table: false,
              experience: false,
              furnace: false,
              physics: false,
              rain: false,
              ray_trace: false,
              scoreboard: false,
              simple_inventory: false,
              sound: false,
              tablist: false,
              time: false,
              title: false,
              villager: false
            }
          });
          bot.on("login", () => {

            bot.settings.viewDistance = "tiny"
            bot.settings.colorsEnabled = false;
            
            lowerCaseNames.push(bot.username.toLowerCase()) // used for the message function
            botArray.push([bot, account[0], account[1]]); // data is set up for the possible future auto reconnect
            botNames.push(bot.username);
            msg.edit(embed.setDescription(botNames.join("\n")).setTitle("Connected accounts [" + botArray.length + "] -> " + arg));
          });
          bot.on('kicked', () => {
            botArray.splice(botArray.indexOf(bot), 1);
            botNames.splice(botNames.indexOf(bot.username), 1);
            msg.edit(embed.setDescription(botNames.join("\n")).setTitle("Connected accounts [" + botArray.length + "] -> " + arg));
          })
          bot.on('end', () => {
            botArray.splice(botArray.indexOf(bot), 1);
            botNames.splice(botNames.indexOf(bot.username), 1);
            msg.edit(embed.setDescription(botNames.join("\n")).setTitle("Connected accounts [" + botArray.length + "] -> " + arg));
          })
        }, i * settings.interval);
      }
    });
  }
  
  if (args[1].match(/^[0-9]*$/gm)) {
    if (args[1] > list.length) return message.channel.send(`The alt file only contains: ${list.length} alts. You requested to log in ${args[1]}.`);
    let embed = new Discord.RichEmbed()
    .setTitle("Connected accounts [0] -> " + arg)
    .setDescription("None")
    .setColor(settings.embedcolor)
    .setFooter("Hadan Bots -> https://discord.gg/dYdJtSK");
    
    message.channel.send(embed).then(msg => {
      for (let i = 0; i < args[1]; i++) {
        setTimeout(() => {
          account = list[i].split(":");
          let bot = mineflayer.createBot({
            username: account[0],
            password: account[1],
            host: arg,
            version: settings.version,
            plugins: {
              chest: false,
              conversions: false,
              dispenser: false,
              enchantment_table: false,
              furnace: false,
              math: false,
              painting: false,
              scoreboard: false,
              scoreboard: false,
              villager: false,
              bed: false,
              block_actions: false,
              blocks: false,
              book: false,
              boss_bar: false,
              chest: false,
              command_block: false,
              craft: false,
              digging: false,
              dispenser: false,
              enchantment_table: false,
              experience: false,
              furnace: false,
              physics: false,
              rain: false,
              ray_trace: false,
              scoreboard: false,
              simple_inventory: false,
              sound: false,
              tablist: false,
              time: false,
              title: false,
              villager: false
            }
          });
          bot.on("login", () => {

            bot.settings.viewDistance = "tiny"
            bot.settings.colorsEnabled = false;

            lowerCaseNames.push(bot.username.toLowerCase()) // used for the message function
            botArray.push([bot, account[0], account[1]]); // data is set up for the possible future auto reconnect
            botNames.push(bot.username);
            
            msg.edit(embed.setDescription(botNames.join("\n")).setTitle("Connected accounts [" + botArray.length + "] -> " + arg));
          });
          bot.on('kicked', () => {
            botArray.splice(botArray.indexOf(bot), 1);
            botNames.splice(botNames.indexOf(bot.username), 1);
            msg.edit(embed.setDescription(botNames.join("\n")).setTitle("Connected accounts [" + botArray.length + "] -> " + arg));
          })
          bot.on('end', () => {
            botArray.splice(botArray.indexOf(bot), 1);
            botNames.splice(botNames.indexOf(bot.username), 1);
            msg.edit(embed.setDescription(botNames.join("\n")).setTitle("Connected accounts [" + botArray.length + "] -> " + arg));
          })

        }, i * settings.interval);
      }
    });
  }
}

function messageCommand(arg, message) {
  
  if(arg === "all") {

    messageEmbed = new Discord.RichEmbed()
    .addField("Message", message + " sent to ALL bots")
    .setColor(settings.embedcolor)
    .setFooter("Hadan Bots -> https://discord.gg/dYdJtSK");


    for(let i = 0; i < botNames.length; i++) {
      setTimeout(()=> {
        
        botArray[i][0].chat(message)
        
      }, i * settings.timeBetweenMessages)
    }
  }
  

  if(lowerCaseNames.includes(arg)) {

    messageEmbed = new Discord.RichEmbed()
    .addField("Message", message + " sent to " + arg)
    .setColor(settings.embedcolor)
    .setFooter("Hadan Bots -> https://discord.gg/dYdJtSK");

    for(let i = 0; i < lowerCaseNames.length; i++) {
      
      if(lowerCaseNames[i] === arg) return botArray[i][0].chat(message);
      
    }
  }
} 



function disconnect(arg) {
  
  if(arg === "all") {

    disconnectEmbed = new Discord.RichEmbed()
    .addField("Disconnect", "Disconnected ALL bots")
    .setColor(settings.embedcolor)
    .setFooter("Hadan Bots -> https://discord.gg/dYdJtSK");

    for(let i = 0; i < botNames.length; i++) {
      
      botArray[i][0].end();
      
  }
}

  if(lowerCaseNames.includes(arg.toLowerCase())) {
    
    disconnectEmbed = new Discord.RichEmbed()
    .addField("Disconnect", "Disconnected " + arg)
    .setColor(settings.embedcolor)
    .setFooter("Hadan Bots -> https://discord.gg/dYdJtSK");



    for(let i = 0; i < botNames.length; i++) {
      
      if(lowerCaseNames[i] === arg.toLowerCase()) return botArray[i][0].end();

    }
  }
}



client.on("message", message => {

//whitelist

  if(!settings.whitelist.includes(message.author.id)) return;


  if (!message.content.startsWith(settings.prefix)) return;
  if (message.author.bot) return;
  
  args = message.content.toLowerCase().substring(settings.prefix.length).split(" ");
  
  switch (args[0]) {
    case "connect":

      if (args[1] === undefined || args[2] === undefined) return message.channel.send(helpEmbed);
      connect(message, args[2]);


    break;
      

    case "help":
        
      message.channel.send(helpEmbed)
        

    break;
        

    case "restart": 
      message.channel.send("Bot will restart in a couple of seconds!")
      setTimeout(() => {
        process.exit();
    }, 500)


    break;
    

    case "message":

      if(args[1] === undefined || args[2] === undefined) return message.channel.send(helpEmbed);

      let content = args.slice(2).join(" ")

      messageCommand(args[1], content)
      message.channel.send(messageEmbed);


    break;
      

    case "disconnect":

    if(args[1] === undefined) return message.channel.send(helpEmbed);
    disconnect(args[1])
    message.channel.send(disconnectEmbed);
    break;

    default:
      message.channel.send(helpEmbed);
    }
  });
  
  client.on("ready", () => {
    console.log(` Alt manager connected to discord, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds as ${client.user.username}\n`);
});

client.login(settings.token);
