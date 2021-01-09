const Discord = require("discord.js");
const { levelsFun, getRank, getRoles } = require("../niveles.js");
let db = require("megadb");
let levels_db = new db.crearDB("niveles");
module.exports.run = async (bot, message, args) => {
	
var server = message.guild;

if (!levels_db.tiene(`${message.guild.id}`)) return message.channel.send("Primer fallo");
    let usuarios = getRank( await levels_db.obtener(message.guild.id), message);
    usuarios.map((usuario, index) => usuarios[index] =`**__Rank #${index+1}__:**\n           **Usuario:** \`${usuario[0]}\` | **Nivel:** ${usuario[1]} | **XP:** \`${usuario[2]}/${5 * (usuario[3] ** 2) +50 * usuario[3] +100}\``)
    
    let paginas = []
    let cantidad = 5;
    
    while (usuarios.length >0)
      paginas.push(usuarios.splice(0,cantidad))
    
    const embed = new Discord.MessageEmbed()
       .setColor("#0080FF")  //Color rojo del mensaje
    
    if(!args[0]){
       embed.setTitle(`**Ranking de participación __${message.guild.name}__**`)  //Es para el mensaje
      .setThumbnail(server.iconURL())
      .setDescription(`${paginas[0].join("\n\n")}`)
      .setFooter(`Pagina 1 de ${paginas.length}`)
        return message.channel.send (embed);
    }
    if(args[0] <= paginas.length && args[0]>0){
       embed.setTitle(`**Ranking de participación __${message.guild.name}__**`)  //Es para el mensaje
      .setDescription(`${paginas[args[0]-1].join("\n\n")}`)
      .setFooter(`Pagina ${args[0]} de ${paginas.length}`)
      .setThumbnail(server.iconURL())
        return message.channel.send (embed);
    }
    else {
       embed.setDescription(`Si quieres ver el ranking, pon un numero entre el 1 y el ${paginas.length}`)
        return message.channel.send (embed);
    }
}