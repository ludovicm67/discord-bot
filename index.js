// Read the config file
const Config  = require('./config.json');

// Let's begin !
const Discord = require('discord.js');
const client  = new Discord.Client();

// @TODO !

client.login(Config.token);
