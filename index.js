// Read the config file
const Config  = require('./config.json');

// Let's begin !
const util    = require('util');
const Discord = require('discord.js');
const client  = new Discord.Client();
const giphy   = require('giphy-api')();

// get a custom emoji !
function getEmoji(list, name) {
	return list.filter(o => o.name === name).first();
}

// print a custom emoji
function printEmoji(emoji) {
	return `<:${emoji.name}:${emoji.id}>`;
}


client.on('ready', () => {
	console.log(`Logged in as ${client.user.username}!`);
	client.user.setGame('learning the world...');
})

client.on('message', msg => {
	const emojis = msg.guild.emojis;
	const emoji_ah = getEmoji(emojis, 'ah');
	const emoji_chou = getEmoji(emojis, 'chou');

	if (msg.isMentioned(client.user)) {
		msg.reply("ehhh pourquoi tu m'a mentionné ? Je dormais paisiblement 🙁 💤");
	}
	if (msg.content.match(/tro+p chou/) && emoji_chou) {
		msg.react(emoji_chou);
	}
	if (msg.content === 'ah' && emoji_ah) {
		msg.channel.send(printEmoji(emoji_ah));
	}
	if (msg.content.startsWith('!test')) {
		msg.delete();
	}
	if (msg.content === 'ping') {
		msg.reply('pong!');
		msg.channel.send("🏓");
	}
	if (msg.content.startsWith('!gif')) {
		const args = msg.content.split(' ');
		args.shift();
		giphy.random(args.join(' ')).then(res => {
			msg.channel.send('', {
				file: `http://s3.amazonaws.com/giphygifs/media/${res.data.id}/200.gif`,
			});
		});
	}
});

client.login(Config.token);
