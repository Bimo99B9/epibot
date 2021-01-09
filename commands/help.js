const Discord = require('discord.js');
exports.run = async (client, message, args)=> {
    const embedhelp = new Discord.MessageEmbed()
    .setColor('#0080FF')
    .setTitle('Comandos del Bot de Discord de la Escuela Politécnica de Ingeniería.')
    .setDescription
    (`:small_blue_diamond: ;ping para comprobar el estado del Bot.
    :small_blue_diamond: ;invite para obtener el enlace de invitación a este servidor.
    :small_blue_diamond: ;rank para ver tu experiencia y nivel de actividad en el servidor.
    :small_blue_diamond: ;levels para ver la clasificación del servidor.
    :small_blue_diamond: ;say (mensaje) para que el bot diga algo por ti.
    :small_blue_diamond: ;embed (mensaje) para que el bot diga algo (en un embed) por ti.
    :small_blue_diamond: ;rps (piedra|papel|tijera) para jugar a piedra papel tijera con el bot.
    `)

    message.channel.send(embedhelp);
}