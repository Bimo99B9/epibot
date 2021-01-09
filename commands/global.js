/*
const Discord = require('discord.js');
exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send(`No tienes permisos para usar este comando`);
    let text = message.content.slice("/private".length);
    if (message.member.hasPermission("BAN_MEMBERS"))
      return message.guild.members.cache.forEach(member => {
        if (member.id != client.user.id && !member.user.bot) member.send(text);
      });
}
*/