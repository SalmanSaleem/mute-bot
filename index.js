require("dotenv").config()

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
    if (message.content == '/muteAll') {
        toggleMute(message, true)
     }
    if (message.content == '/unmuteAll') {
        toggleMute(message, false)
    }
});

client.login(process.env.BOT_TOKEN)

function toggleMute(message, setMute){
    // Your invokation here, for example your switch/case hook for some command (i.e. '!muteall')
    // Check if user is in a voice channel:
    if (message.member.voice.channel) {
    let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
        for (const [memberID, member] of channel.members) {
            // I added the following if statement to mute everyone but the invoker:
            if (setMute && member != message.member){
                // This single line however, nested inside the for loop, should mute everyone in the channel:
                member.voice.setMute(true);
                message.reply('Everyone is muted!');
            }
            else if (!setMute){
                member.voice.setMute(false);
                message.reply('Everyone is unmuted!');
            }
        }
    }
    else {
        message.reply('You need to join a voice channel first!');
    }
}
