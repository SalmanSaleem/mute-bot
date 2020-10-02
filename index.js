const Discord = require("discord.js")
const client = new Discord.Client()

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", (msg) => {
  if (msg.content === "ping") {
    msg.reply("Pong!")
  }
})

client.on('message', (message) => {
    if (message.content == '!mute') {
        toggleMute(message, true)
     }
    if (message.content == '!unmute') {
        toggleMute(message, false)
    }
});

client.login(process.env.BOT_TOKEN)

function toggleMute(message, setMute){
    if (message.member.voice.channel) {
    let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
        for (const [memberID, member] of channel.members) {
            if (setMute){
                member.voice.setMute(true);
            }
            else if (!setMute){
                member.voice.setMute(false);
            }
        }
        message.reply(setMute ? 'Everyone is muted!': 'Everyone is unmuted!');
    }
    else {
        message.reply('You need to join a voice channel first!');
    }
}
