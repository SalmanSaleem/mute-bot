require("dotenv").config()

const Discord = require("discord.js")
const client = new Discord.Client()

const MUTE_CMD = "!mu"
const UNMUTE_CMD = "!un"

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", (msg) => {
  if (msg.content == "!help") {
      msg.channel.send("Commands you can use:")
      msg.channel.send(MUTE_CMD + ": Mute users")
      msg.channel.send(UNMUTE_CMD + ": UnMute users")
  }
  if (msg.content == "!chotiya") {
      msg.reply("You are chotiya!!!")
  }
})

client.on('message', (message) => {
    if (message.content == MUTE_CMD) {
        toggleMute(message, true)
     }
    if (message.content == UNMUTE_CMD) {
        toggleMute(message, false)
    }
});

client.login(process.env.BOT_TOKEN)

// helper functions
function toggleMute(message, setMute){
    if (message.member.voice.channel) {
    let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
        for (const [memberID, member] of channel.members) {
            if (setMute){
                member.voice.setMute(true);
                console.log(member + ' is now muted')
            }
            else if (!setMute){
                member.voice.setMute(false);
                console.log(member + ' is now unmuted')
            }
        }
        message.reply(setMute ? 'Everyone is muted!': 'Everyone is unmuted!');
    }
    else {
        message.reply('You need to join a voice channel first!');
    }
}
