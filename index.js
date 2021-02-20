const {BOT_TOKEN, prefix} = require("./config.json")
const Discord = require('discord.js');
const client = new Discord.Client();
const { voiceFun, levelsFun, getRank, getRoles } = require("./niveles.js"); 
const db = require("megadb");
const levels_db =  new db.crearDB("niveles");
const tiempo_db = new db.crearDB("tiempo");
const logger = require("discordjs-logger");

logger.all(client);

client.once("ready", () => {
	client.user.setActivity('epigijon.uniovi.es');
	console.log("Ready!");
});

client.once("reconnecting", () => {
    console.log("Reconnecting!");
});

client.once("disconnect", () => {
    console.log("Disconnect!");
});


client.on("voiceStateUpdate", function(oldMember, newMember) {
		
	if(!newMember.bot) {
		
		try{voiceFun(client, oldMember, newMember);}catch(err){}
		//console.log("Voiceee")
			return;
	}
});

client.on("message", function(message) {
	if (message.author.bot) return;
	if (message.content.indexOf(prefix) !== 0) {
		try{levelsFun(client, message);}catch(err){}
	   	try{getRoles(message);}catch(err){}
	   		return;
   	}
   try{getRoles(message);}catch(err){}

	const commandBody = message.content.slice(prefix.length);
	const args = commandBody.split(' ');
	const command = args.shift().toLowerCase();

	try {
		let comandos = require(`./commands/${command}.js`); //Prueba el comando de la carpeta comandos
  
		comandos.run(client, message, args); //Ejecuta la orden pasandole como parametros el bot, un el mensaje y los argumentos
  
		console.log(message.author.tag + " Usó el comando: " 
					+ message.content, "en: " + message.guild.name
				   ); //Comenta por consola el comando que se ha realizado (No es visible al publico)
		return;
	  } catch (e) {
		console.log(e.stack); //Almacena la excepción
	  }
/*
	else if (command === "testmessage") {
		const exampleEmbed = new Discord.MessageEmbed()
		.setColor('#0080FF')
		.setTitle('Servidor de Discord de Ingeniería Informática de la EPI')
		.setDescription('Some description here')
		.setThumbnail('https://pbs.twimg.com/profile_images/1269889087885979648/6neRw8WF_400x400.jpg')
		.addFields(
			{ name: 'Regular field title', value: 'Some value here' },
			{ name: '\u200B', value: '\u200B' },
			{ name: 'Inline field title', value: 'Some value here', inline: true },
			{ name: 'Inline field title', value: 'Some value here', inline: true },
		)
		.addField('Inline field title', 'Some value here', true)
		.setImage('https://i.imgur.com/wSTFkRM.png')
		.setTimestamp()
		.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
		message.channel.send()
		message.channel.send(exampleEmbed);
	}

});
*/

	if (command === "sendinfocommand") {
		/*
		message.channel.send("**__¡BIENVENIDO AL SERVIDOR DE DISCORD DE INGENIERÍA INFORMÁTICA DE LA EPI!__**")

			const embed1 = new Discord.MessageEmbed()
			.setColor('#0080FF')
			.setImage('https://pbs.twimg.com/profile_banners/122455228/1557842301/1500x500')
		message.channel.send(embed1)

		message.channel.send("** **")
		message.channel.send("**__¿QUÉ ES ESTE SERVIDOR?__**")
		message.channel.send("Este es el servidor de Discord del grado en Ingeniería Informática de la Escuela Politécnica de Ingeniería de Gijón. Aquí podrás encontrar otros estudiantes de tu grado, y tendrás acceso a canales de audio y texto donde podréis compartir apuntes, hacer proyectos o jugar juntos.")
			const embed2 = new Discord.MessageEmbed()
			.setColor('#0080FF')
			.setImage('https://i.imgur.com/oX5IPAZ.jpg')
		message.channel.send(embed2);

		message.channel.send("** **")
		message.channel.send("**__¿CÓMO SE USA?__**")
		message.channel.send(`El servidor tiene distintos canales con diferentes usos, y es importante usarlos adecuadamente. Cuando os unáis al servidor, debéis **escoger vuestro curso en el canal <#${751917176457527378n}>** para tener acceso al servidor al completo. En el canal <#${751928368701898796n}> se publican todos los anuncios y novedades. Avisaremos por ahí al hacer cambios en el servidor, o cuando publiquemos exámenes. También contamos con muchos canales para hablar entre todos. El más importante es <#${751911132498755668n}>, aunque también tenemos <#${754038354122899467n}> o los canales de cada curso, para temas más específicos.`)
		message.channel.send("En la sección de tu curso encontrarás horarios, enlaces de interés, exámenes de tus asignaturas y mucho más.")

		message.channel.send("** **")
		message.channel.send("**__¿QUÉ SON LOS COMANDOS?__**")
		message.channel.send(`Si estás conectado a un canal de voz, puedes poner **música** para escucharla a la vez que tus compañeros escribiendo en el canal <#${751924795964129292n}> *-play (nombre / link de la canción o lista de reproducción)*. Este es un canal que usamos para interactuar con los bots de nuestro servidor, como el de sugerencias, que puedes usar escribiendo *.suggest (tu sugerencia)* si quieres sugerir algo en el servidor. Esa propuesta será votada en <#${757545239572512858n}>. Hay muchos otros comandos útiles, por ejemplo, si el bot de música ya está siendo utilizado por otros usuarios o no funciona temporalmente, puedes escribir *!play* en vez de *-play* y otro bot le sustituirá. Con *;invite* puedes conseguir el enlace de invitación al servidor rápidamente.`)
			const embed4 = new Discord.MessageEmbed()
			.setTitle('Los bots de nuestro servidor.')
			.setColor('#0080FF')
			.setImage('https://i.imgur.com/xsklJ5n.png')
		message.channel.send(embed4);

		message.channel.send("** **")
		message.channel.send("**__¿QUÉ SON LOS NIVELES DE ACTIVIDAD?__**")
		message.channel.send(`A medida que hablas y utilizas el servidor, tu nivel de actividad aumenta. Esto se traduce en que subes niveles de experiencia, y al llegar a ciertos niveles, tu rango de actividad se actualiza. Puedes consultar tu rango y nivel con *;rank*, y la tabla de clasificación del servidor con *;levels*. Los rangos son los siguientes: `)
			const embed5 = new Discord.MessageEmbed()
			.setColor('#0080FF')
			.setDescription
			(`Niveles 1-4: <@&765250990227718174>
			Niveles 5-9: <@&765251088722690068>
			Niveles 10-14: <@&765251090093703208>
			Niveles 15-19: <@&765251090911330354>
			Niveles 20-24: <@&765251091490144286>
			Niveles 25-29: <@&765251092518273024>
			Niveles 30-34: <@&765251093076639804>
			Niveles 35-39: <@&765251093558067221>
			Niveles +40: <@&765251358223630366>
			`)
			.setFooter('Agradecimientos a DiegoMarty_00')
			
		message.channel.send(embed5)

		message.channel.send("** **")
		message.channel.send("**__¿PUEDO INVITAR COMPAÑEROS AL SERVIDOR?__**")
		message.channel.send(`¡Sí! Todos los estudiantes de nuestro grado son bienvenidos al servidor. Puedes conseguir el enlace de invitación utilizando el comando *;invite*.`)
		*/
	}

});

client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === '「💬」general');
	if (!channel) return;
	member.send(`Bienvenido al servidor de Ingeniería Informática de Gijón, ${member}. Escoge tu rol en <#${751917176457527378n}>`);
});

client.login(BOT_TOKEN);


