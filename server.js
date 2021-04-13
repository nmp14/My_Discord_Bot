// Credits to https://github.com/sitepoint-editors/discord-bot-sitepoint
require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botCommands = require('./commands');

Object.keys(botCommands).map(key => {
    bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
    const prefix = "!"
    const args = msg.content.split(/ +/);
    const prefixedCommand = args.shift().toLowerCase();
    const command = prefixedCommand.split("!")[1];
    if (!msg.author.bot) {
        console.info(`Called command: ${command}`);
    }
    if (!bot.commands.has(command) || !msg.content.startsWith(prefix) || msg.author.bot) return;

    try {
        bot.commands.get(command).execute(msg, args);
    } catch (error) {
        console.error(error);
        msg.reply('there was an error trying to execute that command!');
    }
});
