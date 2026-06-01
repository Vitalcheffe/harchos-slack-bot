// HarchOS Slack Bot
// Built by Amine for Hack Club Stardance

import { App } from '@slack/bolt';
import dotenv from 'dotenv';

dotenv.config();

const { SLACK_BOT_TOKEN, SLACK_APP_TOKEN, SLACK_SIGNING_SECRET } = process.env;

if (!SLACK_BOT_TOKEN || !SLACK_APP_TOKEN || !SLACK_SIGNING_SECRET) {
  console.error("Missing Slack credentials! Check your .env file.");
  console.error("Required: SLACK_BOT_TOKEN, SLACK_APP_TOKEN, SLACK_SIGNING_SECRET");
  process.exit(1);
}

const app = new App({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: SLACK_APP_TOKEN,
});

// Handle when someone mentions the bot
app.event('app_mention', async ({ event, say }) => {
  try {
    console.log(`Mentioned by ${event.user}: ${event.text}`);
    await say({
      text: `Hey <@${event.user}>! 👋 I'm HarchOS Bot. Type \`/harchos help\` to see what I can do!`,
    });
  } catch (error) {
    console.error('Error handling app_mention:', error);
  }
});

(async () => {
  try {
    await app.start();
    console.log("⚡ HarchOS Slack Bot is running!");
  } catch (error) {
    console.error("Failed to start app:", error);
    process.exit(1);
  }
})();
