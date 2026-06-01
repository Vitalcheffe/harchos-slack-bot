// HarchOS Slack Bot
// Built by Amine for Hack Club Stardance

import { App } from '@slack/bolt';
import dotenv from 'dotenv';
import { handleHelpCommand } from './handlers/help';

dotenv.config();

const { SLACK_BOT_TOKEN, SLACK_APP_TOKEN, SLACK_SIGNING_SECRET } = process.env;

if (!SLACK_BOT_TOKEN || !SLACK_APP_TOKEN || !SLACK_SIGNING_SECRET) {
  console.error("Missing Slack credentials! Check your .env file.");
  process.exit(1);
}

const app = new App({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: SLACK_APP_TOKEN,
});

// App mention handler
app.event('app_mention', async ({ event, say }) => {
  try {
    await say({
      text: `Hey <@${event.user}>! 👋 Type \`/harchos help\` to see what I can do!`,
    });
  } catch (error) {
    console.error('Error handling app_mention:', error);
  }
});

// /harchos help command
app.command('/harchos', async ({ command, ack, respond }) => {
  await ack();

  const subCommand = command.text.trim().toLowerCase();

  if (subCommand === 'help' || subCommand === '') {
    const helpText = await handleHelpCommand(command);
    await respond({ text: helpText, response_type: 'in_channel' });
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
