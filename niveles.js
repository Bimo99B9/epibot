const Discord = require('discord.js');
const discordjsLogger = require('discordjs-logger');
const db = require("megadb");
let levels_db = new db.crearDB("niveles");
let tiempo_db = new db.crearDB("tiempo");
let coolniveles = new Map()
const client = new Discord.Client();
const logger = require("discordjs-logger");
let niveles = [["Scratch","765250990227718174"],["Python","765251088722690068"],["Cobol","765251090093703208"],["Java","765251090911330354"],["C#","765251091490144286"],["HTML","765251092518273024"],["C/C++","765251093076639804"],["Ensamblador","765251093558067221"],["Binario","765251358223630366"]]


//logger.all(client);
module.exports = {
  voiceFun: async (client, oldMember, newMember)=>{

    if (!levels_db.tiene(newMember.guild.id)) levels_db.establecer(newMember.guild.id, {})
    if (!tiempo_db.tiene(newMember.guild.id)) levels_db.establecer(newMember.guild.id, {})
    if (!levels_db.tiene(`${newMember.guild.id}.${newMember.id}`)) levels_db.establecer(`${newMember.guild.id}.${newMember.id}`, {xp: 0, nivel: 1})
    if (!tiempo_db.tiene(`${newMember.guild.id}.${newMember.id}`)) tiempo_db.establecer(`${newMember.guild.id}.${newMember.id}`, {jointime: 0})

    let username = oldMember.id;
		let oldVCID = oldMember.channelID; // El ID del canal del que vienes, null si no vienes de ningún canal.
		let newVCID = newMember.channelID; // El ID del canal al que te acabas de conectar.
		
		if (oldVCID === undefined || oldVCID === null){
			jointime = new Date();
			time = jointime.getTime();
			tiempo_db.set(`${newMember.guild.id}.${newMember.id}.jointime`, time)

			console.log(`${username} se ha conectado a ${newVCID}, ${jointime}`);
		}
		
		else if ((newVCID === null) && (await tiempo_db.get(`${newMember.guild.id}.${newMember.id}.jointime`) != 0) && (oldVCID != 797172861017128971)){
			
			if (jointime != undefined)
			{
				leavetime = new Date();
				join_time = await tiempo_db.get(`${newMember.guild.id}.${newMember.id}.jointime`)
				
				console.log(join_time);
				
				var timedif = leavetime.getTime() - join_time;
				var secdif = Math.round(timedif / 1000);
				xpinvoice = Math.round(secdif / 25);
				if(xpinvoice > 1440)
				{
					xpinvoice = 1440;
				}
				levels_db.sumar(`${newMember.guild.id}.${newMember.id}.xp`, xpinvoice)
				console.log(`${oldMember.id} se ha desconectado, ${xpinvoice}, ${secdif}`);
				
				
			}
			else
				return;
		}
		else
			console.log(`${oldMember.id} se ha conectado a ${newVCID} y antes estaba en ${oldVCID}`);

  },

  levelsFun: async (client, message)=>{
    
   
    
    if(coolniveles.has(message.guild.id+message.author.id)) {
      let cooldown = coolniveles.get(message.guild.id+message.author.id);
    if(Date.now() < cooldown){
      return;
    }
       }
    
    if (!levels_db.tiene(message.guild.id)) levels_db.establecer(message.guild.id, {})
    if (!tiempo_db.tiene(message.guild.id)) levels_db.establecer(message.guild.id, {})

    if (!levels_db.tiene(`${message.guild.id}.${message.author.id}`)) levels_db.establecer(`${message.guild.id}.${message.author.id}`, {xp: 0, nivel: 1})
    if (!tiempo_db.tiene(`${message.guild.id}.${message.author.id}`)) tiempo_db.establecer(`${message.guild.id}.${message.author.id}`, {jointime: 0})

    let { xp, nivel } = await levels_db.obtener(`${message.guild.id}.${message.author.id}`)
    let randomxp = Math.floor(Math.random() * 30) + 1
    let levelup = 5 * (nivel **2) + 50 * nivel + 100
    
    coolniveles.set(message.guild.id+message.author.id, Date.now()+120000);
    
    if((xp + randomxp) >= levelup) {
      levels_db.establecer(`${message.guild.id}.${message.author.id}`, {xp: 0, nivel: parseInt(nivel+1)})
	  
	  nivel = (nivel+1)
	  
	  var role = niveles[Math.floor(nivel/5)]
	  if (nivel > 40) role = niveles[8]
	 

      
      
    let lvl = 0
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
      .setTitle(`**Ascenso de __${message.author.username}__**`)
      if (nivel%5 == 0 && nivel<=40){
        embed.setDescription(`Acabas de subir al nivel: ${lvl}\n\nHas obtenido el rol de **${role[0]}**`)  //Es para el mensaje 
        //Es para el mensaje 
      }else{
			if(nivel<40)
				embed.setDescription(`Acabas de subir al nivel: ${lvl}\n\nTe quedan ${5-nivel%5} niveles para el rol **${niveles[Math.floor(nivel/5)+1][0]}**`)  //Es para el mensaje 
			else
				embed.setDescription(`Acabas de subir al nivel: ${lvl}**`)  //Es para el mensaje 
	  }
        embed.setThumbnail(message.author.displayAvatarURL())
       .setColor(0x01a330)  //Color rojo del mensaje
        return message.channel.send (embed);
                
    }
    
    else{
      levels_db.sumar(`${message.guild.id}.${message.author.id}.xp`, randomxp)
      console.log (`${message.author.tag}, ganó ${randomxp}`)
    return;
    }
  },
  
  
  
  
  
  getRank: (users, message)=>{
    let userlist = []
    
    for (var key in users){
      let usuario = message.guild.members.cache.has(key) ? message.guild.members.cache.get(key).user.tag : `mal`;
      
    if(usuario != `mal`){
    let nivel=(users[key].nivel)
    let lvl = 0
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
    
  
      userlist.push([usuario, lvl, users[key].xp, users[key].nivel])
    }
    }
    
    userlist.sort((user1, user2)=>{
      return user2[3] - user1[3] || user2[2] - user1[2];
    })
    return userlist
  },
  
  getRoles: async (message)=>{ //:cloud_tornado: Huracan  :dizzy: Galactic
   if (!levels_db.tiene(message.guild.id)) levels_db.establecer(message.guild.id, {})
    if (!levels_db.tiene(`${message.guild.id}.${message.author.id}`)) levels_db.establecer(`${message.guild.id}.${message.author.id}`, {xp: 0, nivel: 1})
    let { xp, nivel } = await levels_db.obtener(`${message.guild.id}.${message.author.id}`)
	/*try{
		message.member.roles.add("623157314417066014");
  }catch(err){}
  */
	var roleNumber = Math.floor(nivel/5)
	if (roleNumber>8) roleNumber = 8;
	if(roleNumber>0){
		try{
			message.member.roles.remove(niveles[roleNumber-1][1]);
		}catch(err){}
	}
	try{
		message.member.roles.add(niveles[roleNumber][1]);
	}catch(err){}
  }
  
}