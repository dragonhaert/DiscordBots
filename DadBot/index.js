const { randomInt } = require('crypto');
const Discord = require('discord.js');
const https = require('https');
const FileSystem = require('fs');
const client = new Discord.Client();
const prefix = '.';


client.on('message', message => {
    if (message.content.toLowerCase().startsWith("i'm ")) message.channel.send("Hi, "+message.content.slice(4)+". I'm Dad!");
    if (message.content.toLowerCase().startsWith("im ")) message.channel.send("Hi, "+message.content.slice(3)+". I'm Dad!");
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
            if (args[0] === 'dad') message.reply("Hey! Are ya winning?");
            break;
        case 'roulette':    
            let x = (Math.random()*20+1).toFixed(0);
            message.reply("You rolled a " + x + " out of 20!");
            if (x==10) {
                message.author.send('Hahaha gottem! When you join back, you may need to reverify or wait to get your roles assigned.\nhttps://discord.gg/hyBATPCwMJ');
                return message.member.kick();
            } else return;
        case 'tell':    
            https.get('https://wizardly-wing-66188a.netlify.app/.netlify/functions/server', (response) =>{
                let data = '';
                response.on('data', (chunk) => data += chunk);
                response.on('end', () =>{
                    let json = JSON.parse(data);
                    if (json.punchline === null) message.reply(json.joke);
                    else message.reply(json.joke + " " + json.punchline);
                });
            }).on('error', (e) => console.error(e)); 
        default:
    }

})

client.login('');