import { Client, GatewayIntentBits } from "discord.js";
import { ChatGPT } from "discord-chat-gpt";
import config from "./config.json" assert { type: "json" };

//creating client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // for guild
    GatewayIntentBits.GuildMembers, // for guild members
    GatewayIntentBits.GuildMessages, // for guild messages
    GatewayIntentBits.MessageContent, // for access message content from channel or member
  ],
  allowedMentions: {
    repliedUser: false, //it will not ping you in reply
  },
});

const gptClient = new ChatGPT({
  apiKey: config.apiKey,
  orgKey: config.orgKey,
});

// checking if bot online console bot is online
client.on("ready", () => {
  console.log(`> ${client.user.username} is Online !!`);
});

// now lets handle chat bot system
client.on("messageCreate", async (message) => {
  if (!message.guild || message.author.bot) return;
  let channelID = "1089694841975349358";
  let channel = message.guild.channels.cache.get(channelID);
  if (!channel) return;
  if (message.channel.id == channel.id) {
    let msg = await message.reply({
      content: `Loading Wait..`,
    });
    let reply = await gptClient.chat(message.content, message.author.username); // it will return text
    msg.edit({
      content: `${reply}`,
    });
  }
});

// now login in bot
client.login(config.token);
