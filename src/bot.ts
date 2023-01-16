import {
  Client,
  Message,
  GatewayIntentBits,
} from "discord.js";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const configuration = new Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

client.on("messageCreate", async (message: Message) => {
  try {
    if (message.author.bot) return;

    const gptResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message.content}\n\
      Sir-Gali:`,
      max_tokens: 64,
      temperature: 0.9,
      stop: ["Sir-Gali:"],
    });
    message.reply(`${gptResponse.data.choices[0].text}`);
    return;
  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.DISCORD_TOKEN);
console.log("Bot is running");
