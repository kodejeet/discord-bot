require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content === "Hi") {
    message.reply("Bata Bsdke??");
  }
  console.log(message.content);
});

client.on("interactionCreate", (interaction) => {
  console.log(interaction);
  interaction.reply("Pong!");
});

client.login(TOKEN);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});
