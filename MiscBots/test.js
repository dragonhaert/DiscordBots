const Discord = require('discord.js');
const client = new Discord.Client();
count = null;

client.on('message', message => {
    if (message.content.startsWith('count ') && !Number.isNaN(parseInt(message.content.slice(6)))) {
        count = parseInt(message.content.slice(6));
        message.channel.send("counting up from "+count);
        return;
    }
    if (message.content === 'count?') message.reply("Current Count: "+count);
    if (parseInt(message.content) == NaN) return;
    if (parseInt(message.content) == count+1) {
        count++;
        if (parseInt(message.content) == 100) message.react('💯').catch(console.error);
        else message.react('👍').catch(console.error);
    }
});

client.login(process.argv[2]);