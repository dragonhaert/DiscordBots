const Discord = require('discord.js');
const FileSystem = require('fs');
const client = new Discord.Client();
const prefix = '!';

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLocaleLowerCase();

    switch (command){
        case 'commands':
            FileSystem.readFile('commands.txt', (error,data) => {
                if (error) throw error;
                message.channel.send("```"+data.toString() +"```");
            });
            break;
        case 'ping':
            message.channel.send("pong!");
            break;
        case 'hey':
            if (args[0] === 'dad') message.channel.send("Hey @" + message.author.tag + "! Are ya winning?");
            break;
        case 'kick':
            if (args[0] === 'me') return message.member.kick();
            if (message.author.tag === 'DragonHaert#6797') message.mentions.members.first().kick();
            message.delete();
        default:
    }

})

client.login('');