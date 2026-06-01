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
  console.error("Required: SLACK_BOT_TOKEN, SLACK_APP_TOKEN, SLACK_SIGNING_SECRET");
  process.exit(1);
}

const app = new App({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: SLACK_APP_TOKEN,
});

// Handle app mentions
app.event('app_mention', async ({ event, say }) => {
  try {
    await say({
      text: `Hey <@${event.user}>! 👋 Type \`/harchos help\` to see what I can do!`,
    });
  } catch (error) {
    console.error('Error handling app_mention:', error);
  }
});

// Command router
app.command('/harchos', async ({ command, ack, respond }) => {
  await ack();

  const subCommand = command.text.trim().toLowerCase().split(' ')[0];
  const startTime = Date.now();

  try {
    let response: string;

    switch (subCommand) {
      case 'help':
      case '':
        response = await handleHelpCommand(command);
        break;
      case 'carbon':
        response = await handleCarbonCommand(command);
        break;
      case 'gpu':
        response = await handleGpuCommand(command);
        break;
      case 'price':
        response = await handlePriceCommand(command);
        break;
      case 'status':
        response = await handleStatusCommand(command);
        break;
      default:
        response = `Unknown command: \`${subCommand}\`. Type \`/harchos help\` for available commands.`;
        await respond({ text: response, response_type: 'ephemeral' });
        return;
    }

    const elapsed = Date.now() - startTime;
    console.log(`Command /harchos ${subCommand} completed in ${elapsed}ms`);

    await respond({ text: response, response_type: 'in_channel' });
  } catch (error) {
    console.error('Command handler error:', error);
    await respond({
      text: '❌ Something went wrong processing your command. Try again or use `/harchos status` to check if the platform is up.',
      response_type: 'ephemeral',
    });
  }
});

(async () => {
  try {
    await app.start();
    console.log("⚡ HarchOS Slack Bot is running!");
    console.log("Available commands: help, carbon, gpu, price, status");
  } catch (error) {
    console.error("Failed to start app:", error);
    process.exit(1);
  }
})();
