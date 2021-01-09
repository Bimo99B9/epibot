const Discord = require("discord.js");
const { levelsFun, getRank, getRoles } = require("../niveles.js");
let db = require("megadb");
let levels_db = new db.crearDB("niveles");
module.exports.run = async (bot, message, args) => {
  if (!levels_db.tiene(`${message.guild.id}`))
    return message.channel.send("Primer fallo");
  let user =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]) ||
    message.member;
  if (!levels_db.tiene(`${message.guild.id}.${user.id}`))
    return message.channel.send("Esta persona no se encuentra en el ranking");
  let { xp, nivel } = await levels_db.obtener(`${message.guild.id}.${user.id}`);
  let levelup = 5 * nivel ** 2 + 50 * nivel + 100;
  let lvl = "";

  if (nivel >= 10) {
    let aux = parseInt(nivel / 10);
    if (aux == 1) lvl = "1️⃣";
    if (aux == 2) lvl = "2️⃣";
    if (aux == 3) lvl = "3️⃣";
    if (aux == 4) lvl = "4️⃣";
    if (aux == 5) lvl = "5️⃣";
    if (aux == 6) lvl = "6️⃣";
    if (aux == 7) lvl = "7️⃣";
    if (aux == 8) lvl = "8️⃣";
    if (aux == 9) lvl = "9️⃣";

    aux = nivel - aux * 10;

    if (aux == 0) lvl = lvl + "0️⃣";
    if (aux == 1) lvl = lvl + "1️⃣";
    if (aux == 2) lvl = lvl + "2️⃣";
    if (aux == 3) lvl = lvl + "3️⃣";
    if (aux == 4) lvl = lvl + "4️⃣";
    if (aux == 5) lvl = lvl + "5️⃣";
    if (aux == 6) lvl = lvl + "6️⃣";
    if (aux == 7) lvl = lvl + "7️⃣";
    if (aux == 8) lvl = lvl + "8️⃣";
    if (aux == 9) lvl = lvl + "9️⃣";
  } else {
    if (nivel == 1) lvl = "1️⃣";
    if (nivel == 2) lvl = "2️⃣";
    if (nivel == 3) lvl = "3️⃣";
    if (nivel == 4) lvl = "4️⃣";
    if (nivel == 5) lvl = "5️⃣";
    if (nivel == 6) lvl = "6️⃣";
    if (nivel == 7) lvl = "7️⃣";
    if (nivel == 8) lvl = "8️⃣";
    if (nivel == 9) lvl = "9️⃣";
  }
  
  const embed = new Discord.MessageEmbed()
        .setTitle(`Nivel de **${user.user.username}**`)  //Es para el mensaje 
        .setDescription(`**XP:** ${xp}/${levelup}\n**Nivel:** ${lvl}\n**Proceso:** ${Math.round(xp*100/levelup)}%`)
        .setThumbnail(user.user.displayAvatarURL())
       .setColor("#0080FF")  //Color rojo del mensaje
        return message.channel.send (embed);
};