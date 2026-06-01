// HarchOS Slack Bot
// Built by Amine for Hack Club Stardance

import { App, ExpressReceiver } from '@slack/bolt';
import dotenv from 'dotenv';

dotenv.config();

const { SLACK_BOT_TOKEN, SLACK_APP_TOKEN, SLACK_SIGNING_SECRET } = process.env;

if (!SLACK_BOT_TOKEN || !SLACK_APP_TOKEN || !SLACK_SIGNING_SECRET) {
  console.error("Missing Slack credentials in .env file!");
  process.exit(1);
}

// Initialize the Bolt app
const app = new App({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: SLACK_APP_TOKEN,
});

// Start the app
(async () => {
  try {
    await app.start();
    console.log("⚡ HarchOS Slack Bot is running!");
  } catch (error) {
    console.error("Failed to start app:", error);
    process.exit(1);
  }
})();
