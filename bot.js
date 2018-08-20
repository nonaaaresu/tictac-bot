const Discord = require("discord.js");
const  client = new Discord.Client();
const config = require("./config.json");



client.on("ready", () => {
   console.log("Estoy listo!");

   client.user.setPresence( {
       status: "online",
       game: {
           name: "e.ayuda para que te ayude xd",
           type: "PLAYING"
       }
   } );

});


var prefix = config.prefix;

client.on("message", (message) => {
  if (message.content.startsWith(prefix + "tictakzun")) {
    message.channel.send("no, eso no pajín :^)");
}

  /*

  Obtener el avatar de un usuario, en un mensaje
  de tipo RichEmbed() usando mentions.
  */


  //usando las menciones como argumento
  if (message.content.startsWith(prefix + "autor")) {
  let img = message.mentions.users.first()

  if (!img) {

      const embed = new Discord.RichEmbed()
      .setImage(`${message.author.avatarURL}`)
      .setColor(0xff0467)
      .setFooter(`Avatar de ${message.author.username}#${message.author.discriminator}`);
      message.channel.send({ embed });

  } else if (img.avatarURL === null) {
      //si el usuario no tiene avatar

      const embed = new Discord.RichEmbed()
      .setImage(`${message.author.defaultAvatarURL}`)
      .setColor(0x66b3ff)
      .setFooter(`Este es el semi-dios que me creo: ${message.author.username}#${message.author.discriminator}`);
      message.channel.send({ embed });

  } else {

      const embed = new Discord.RichEmbed()
      .setImage(`${img.avatarURL}`)
      .setColor(0x66b3ff)
      .setFooter(`Avatar de ${img.username}#${img.discriminator}`);
      message.channel.send({ embed });
  }};



  /*

  Mostrar las estadisticas e informacion de un bot
  en un mensaje tipo RichEmbed()

  requiere el package moment:
  instalación: npm install moment,
               npm install moment-duration-format
  */

  if (message.content.startsWith(prefix + "version")) {
  const moment = require("moment");
  require('moment-duration-format');

  const actividad = moment.duration(client.uptime).format(" D [dias], H [hrs], m [mins], s [secs]");


  const embed = new Discord.RichEmbed()
  .setColor(0x66ff66)

  .setAuthor(`Bot info`, client.user.avatarURL)
  .addField(`Dueño`, `nonaa♥#4454`, true)
  .addField(`Version`, `Alpha 1.0.1`, true)
  .addField(`Libreria`, `Discord ^11.2.1 (Js)`, true)

  .addField(`Memoria`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
  .addField(`Uptime`, `${actividad}`, true)
  .addField(`Servidores`, `${client.guilds.size.toLocaleString()}`, true)
};

  if (message.content.startsWith(prefix + "ayuda")) {
    const embed = new Discord.RichEmbed()
        .setTitle("Ayuda de comandos")
        .setColor(0x00AE86)
        .setDescription("Acá aprendés el uso de todos los comandos actuales del bot.")
        .setFooter("ojalá hayas aprendido algo, down.", client.user.avatarURL)
        .setTimestamp()
        .addField("e.ayuda",
          "Hace esto, xd.")
        .addField("e.version", "Sirve para ver la versión actual del bot y otras boludeces que no le importa a nadie, solo al owner.", true)
        .addField("e.tictakzun", "Sirve para ver cosas tic takzun, pero ahora tiene down y no funciona.", true)
        .addField("e.autor", "Sirve para ver quien hizo este bot choto.", true);
    message.channel.send({embed});
  }

  if (message.content.startsWith(prefix + "join")) {
      let Canalvoz = message.member.voiceChannel;
      if (!Canalvoz || Canalvoz.type !== 'voice') {
      message.channel.send('¡Necesitas unirte a un canal de voz primero!.').catch(error => message.channel.send(error));
      } else if (message.guild.voiceConnection) {
      message.channel.send('Ya estoy conectado en un canal de voz.');
      } else {
       message.channel.send('Conectando...').then(m => {
            Canalvoz.join().then(() => {
                 m.edit(':white_check_mark: | Conectado exitosamente.').catch(error => message.channel.send(error));
           }).catch(error => message.channel.send(error));
       }).catch(error => message.channel.send(error));
      }
  }
if (message.content.startsWith(prefix + "leave")) {

  let Canalvoz = message.member.voiceChannel;
  if (!Canalvoz) {
      message.channel.send('No estoy en un canal de voz.');
  } else {
      message.channel.send('Dejando el canal de voz.').then(() => {
      Canalvoz.leave();
      }).catch(error => message.channel.send(error));
  }
}

  if (message.content.startsWith(prefix + "cantanegro")) {
    const YouTube = require('youtube-node');
    let youTube = new YouTube();

    //Necesita tener una clave para usar la API de YouTube Data API v3
    //video tutorial: https://www.youtube.com/watch?v=Im69kzhpR3I
    youTube.setKey('YOUTUBE-API-KEY');


    if(!args) return  message.channel.send('Debe proporcionar algo para buscar');
    message.channel.send(':arrows_counterclockwise: buscando..!')
    .then(m => {
        youTube.search(args, 2, function(err, result){
            if(err){
                return console.log(error);

            }
            if(result.items[0]["id"].videoId == undefined){
                return message.channel.send('¡No se han encontrado resultados!');

            } else{
                let link = `https://www.youtube.com/watch?v=${result.items[0]["id"].videoId}`
                m.edit(link);

            }
        })
    })
client.login(config.token);
