// HarchOS Slack Bot
// Built by Amine for Hack Club Stardance

import dotenv from 'dotenv';

dotenv.config();

const { SLACK_BOT_TOKEN, SLACK_APP_TOKEN, SLACK_SIGNING_SECRET } = process.env;

if (!SLACK_BOT_TOKEN || !SLACK_APP_TOKEN || !SLACK_SIGNING_SECRET) {
  console.error("Missing Slack credentials in .env file!");
  process.exit(1);
}

console.log("HarchOS Slack Bot starting...");
console.log("Credentials loaded, setting up Bolt app...");
