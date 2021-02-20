const db = require("megadb");
const Discord = require('discord.js');
const levels_db = new db.crearDB("niveles");
exports.run = async (client, message, args)=> {

    if(message.channel.id === '751924795964129292') {

        let randomxp = Math.floor(Math.random() * 30) + 1

        const acceptedReplies = ['piedra', 'papel', 'tijera'];
        const random = Math.floor((Math.random() * acceptedReplies.length));
        const result = acceptedReplies[random];

        const choice = args[0];
        if (!choice) return message.channel.send(`Cómo jugar: \`;rps <piedra|papel|tijera>\``);
        if (!acceptedReplies.includes(choice)) return message.channel.send(`Sólo se aceptan estas respuestas: \`${acceptedReplies.join(', ')}\``);
        
        console.log('Resultado del bot:', result);
        if (result === choice) return message.reply("Empate, hemos elegido lo mismo.");
        
        switch (choice) {
            case 'piedra': {
                if (result === 'papel') 
                {
                    levels_db.restar(`${message.guild.id}.${message.author.id}.xp`, randomxp)
                    console.log (`${message.author.tag}, perdió ${randomxp}`)
                    return message.reply(`Has perdido, gana la EPI. Escogí papel. Se te ha restado ${randomxp} de experiencia :)`);
                }    
                else
                {
                    levels_db.sumar(`${message.guild.id}.${message.author.id}.xp`, randomxp)
                    console.log (`${message.author.tag}, ganó ${randomxp}`)
                    return message.reply(`Has ganado, escogí tijera. Se te ha sumado ${randomxp} de experiencia`);
                }    
            }
            case 'papel': {
                if (result === 'tijera') 
                {
                    levels_db.restar(`${message.guild.id}.${message.author.id}.xp`, randomxp)
                    console.log (`${message.author.tag}, perdió ${randomxp}`)
                    return message.reply(`Has perdido, gana la EPI. Escogí tijera. Se te ha restado ${randomxp} de experiencia :)`);
                }
                else 
                {
                    levels_db.sumar(`${message.guild.id}.${message.author.id}.xp`, randomxp)
                    console.log (`${message.author.tag}, ganó ${randomxp}`)
                    return message.reply(`Has ganado, escogí piedra. Se te ha sumado ${randomxp} de experiencia`);
                }       
            }
            case 'tijera': {
                if (result === 'piedra') 
                {
                    levels_db.restar(`${message.guild.id}.${message.author.id}.xp`, randomxp)
                    console.log (`${message.author.tag}, perdió ${randomxp}`)
                    return message.reply(`Has perdido, gana la EPI. Escogí piedra. Se te ha restado ${randomxp} de experiencia :)`);
                }
                else 
                {
                    levels_db.sumar(`${message.guild.id}.${message.author.id}.xp`, randomxp)
                    console.log (`${message.author.tag}, ganó ${randomxp}`)
                    return message.reply(`Has ganado, escogí papel. Se te ha sumado ${randomxp}`);
                }
                
            }
            default: {
                return message.channel.send(`Sólo se aceptan estas respuestas: \`${acceptedReplies.join(', ')}\``);
            }

        }
    }
    else
        return message.channel.send(`Por favor, usa el canal de comandos.`);

}   
