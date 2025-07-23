require("dotenv").config();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));


const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  console.log(`${message.content}`);

  if (message.content === "Hi") {
    message.reply("Hey Twink Wassup!!");
  }

  if (message.content === "!emoji") {
    console.log(message.guild.emojis.cache.map((e) => e.name));
    const emoji = message.guild.emojis.cache.first();
    if (emoji) {
      message.channel.send(`Hello! ${emoji.toString()}`);
    } else {
      message.channel.send("No custom emoji found in this server.");
    }
  }
  if (message.content === "!meme") {
    try {
      const res = await fetch("https://meme-api.com/gimme");
      const data = await res.json();

      message.channel.send({
        content: data.title,
        files: [data.url],
      });
    } catch (err) {
      console.error("Failed to fetch meme:", err);
      message.channel.send("Couldn't fetch a meme right now.");
    }
  }
});

client.on("guildMemberAdd", (member) => {
  const welcomeChannel = member.guild.channels.cache.find(
    (channel) => channel.name === "welcome" && channel.type === 0 
  );

  if (welcomeChannel) {
    welcomeChannel.send(`Welcome to the server, ${member.user.username}!`);
  } else {
    console.log("Welcome channel not found.");
  }
});

client.login(process.env.TOKEN);
