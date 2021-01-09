const Discord = require('discord.js');
exports.run = async (client, message, args)=> {
	message.channel.bulkDelete(1);
	//for(let num = 3; num<args.length; num++){
	//	mensaje += args[num] +" ";
	//}
	const embed3 = new Discord.MessageEmbed()
		.setColor('#0080FF')
		// .setThumbnail(user.avatarURL())
		.setDescription(args.join(" "))
		// .setTitle('Escoge ')
		// .setImage('https://i.imgur.com/oX5IPAZ.jpg')
		// .addField('Inline field title', 'Some value here', true)
		// .setTimestamp()
		// .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
	message.channel.send(embed3);
}