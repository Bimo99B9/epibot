const Discord = require('discord.js');
exports.run = async (client, message, args)=> {
		message.channel.bulkDelete(1);
    	message.channel.send(args.join(" "));
}