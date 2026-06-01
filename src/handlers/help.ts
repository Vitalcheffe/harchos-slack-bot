// Help command handler
// Shows available HarchOS bot commands

import { SlashCommand } from '@slack/bolt';

export async function handleHelpCommand(command: SlashCommand): Promise<string> {
  // TODO: list all commands here
  return "HarchOS Bot Commands:\nMore coming soon...";
}
