const Discord = require("discord.js");
exports.run = async (client, message, args) => {

let boolean = false;

    function get(obj, key) {
        return key.split(".").reduce(function (o, x) {
            return (typeof o == "undefined" || o === null) ? o : o[x];
        }, obj);
    }

    if (!args[0]) {
      boolean = true
    }

    try {parseInt(args[0]) }catch(error) {
        boolean = true
    }

    let maxnum = parseInt(args[0]);
    let channel = get(message, 'member.voice.channel');

    if(channel == null) {
      message.channel
        .send("Debes estar conectado al canal de voz para cambiar su límite.")
        boolean = true;
    }

    if (!boolean) {

      if(maxnum >= 0 && maxnum <= 99) {
        channel.edit({
          userLimit: maxnum
        }).then( 
          message.channel
            .send("Límite de usuarios del canal cambiado correctamente.")
        )
      }
      else {
        message.channel
        .send("El número máximo debe estar entre 1 y 99.")
      } 
    }

    if (boolean) {
        message.channel
        .send("Introduce el número máximo de personas del canal.")

    return message.delete();
    }
  
};