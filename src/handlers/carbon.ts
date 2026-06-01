// Carbon command handler
// Check carbon intensity of compute regions

import { SlashCommand } from '@slack/bolt';
import { harchosApi } from '../services/harchos-api';

export async function handleCarbonCommand(command: SlashCommand): Promise<string> {
  const region = command.text.replace('carbon', '').trim();
  
  // TODO: actually call the API
  return `Carbon intensity check for ${region || 'all regions'} - coming soon!`;
}
