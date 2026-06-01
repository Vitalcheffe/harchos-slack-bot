// HarchOS Slack Bot
// Built by Amine for Hack Club Stardance
// Commands: help, carbon, gpu, price, status

import { App } from '@slack/bolt';
import dotenv from 'dotenv';
import { handleHelpCommand } from './handlers/help';
import { handleCarbonCommand } from './handlers/carbon';
import { handleGpuCommand } from './handlers/gpu';
import { handlePriceCommand } from './handlers/price';
import { handleStatusCommand } from './handlers/status';

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

app.event('app_mention', async ({ event, say }) => {
  try {
    await say({
      text: `Hey <@${event.user}>! 👋 Type \`/harchos help\` to see what I can do!`,
    });
  } catch (error) {
    console.error('Error handling app_mention:', error);
  }
});

app.command('/harchos', async ({ command, ack, respond }) => {
  await ack();

  const subCommand = command.text.trim().toLowerCase().split(' ')[0];

  try {
    switch (subCommand) {
      case 'help':
      case '':
        await respond({ text: await handleHelpCommand(command), response_type: 'in_channel' });
        break;
      case 'carbon':
        await respond({ text: await handleCarbonCommand(command), response_type: 'in_channel' });
        break;
      case 'gpu':
        await respond({ text: await handleGpuCommand(command), response_type: 'in_channel' });
        break;
      case 'price':
        await respond({ text: await handlePriceCommand(command), response_type: 'in_channel' });
        break;
      case 'status':
        await respond({ text: await handleStatusCommand(command), response_type: 'in_channel' });
        break;
      default:
        await respond({
          text: `Unknown command: \`${subCommand}\`. Type \`/harchos help\` for available commands.`,
          response_type: 'ephemeral',
        });
    }
  } catch (error) {
    console.error('Command handler error:', error);
    await respond({
      text: '❌ Something went wrong processing your command. Try again.',
      response_type: 'ephemeral',
    });
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
