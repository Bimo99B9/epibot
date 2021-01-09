const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  try {
    let img = args[0];
    message.delete();
    message.channel.send({ files: [img] });
  } catch (err) {}
};