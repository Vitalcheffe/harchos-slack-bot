// Price command handler
// Compare compute pricing across regions

import { SlashCommand } from '@slack/bolt';

export async function handlePriceCommand(command: SlashCommand): Promise<string> {
  const args = command.text.replace('price', '').trim();
  return `Pricing info for ${args || 'all regions'} - coming soon!`;
}
