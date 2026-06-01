// GPU command handler
// List available GPU clusters

import { SlashCommand } from '@slack/bolt';

export async function handleGpuCommand(command: SlashCommand): Promise<string> {
  const cluster = command.text.replace('gpu', '').trim();
  return `GPU cluster info for ${cluster || 'all clusters'} - coming soon!`;
}
