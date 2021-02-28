const Discord = require('discord.js');
const client = new Discord.Client();
const prompt = "extract";

client.on('message', message => {
    if (!(message.content === prompt)) return;
    const filter = (user) => user.id = message.author.id;
    message.awaitReactions(filter, {time:20000}).then(collected => {
        collected.forEach(reaction => {
            message.channel.send(reaction.emoji.url);
        })}).catch(console.error);
});

client.login(process.argv[2]);