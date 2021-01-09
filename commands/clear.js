const Discord = require("discord.js");
exports.run = async (client, message, args) => {
let permiso = message.member.hasPermission("MANAGE_MESSAGES");
let boolean = false;

  if (permiso) {
    if (!args[0]) {
      boolean = true
    }
    try {parseInt(args[0]) }catch(error) {
        boolean = true
    }
    if (!boolean) {
      let cantidad = parseInt(args[0]);
      message.channel.bulkDelete(cantidad);
      message.delete();
    }
    if (boolean) {
        message.channel
        .send("Introduce el número de mensajes que deseas eliminar")
        .then(m => {
          m.delete({ timeout: 4000 });
        });
    return message.delete();
    }
  }
};