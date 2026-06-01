// GPU command handler
// List available GPU clusters and their status

import { SlashCommand } from '@slack/bolt';
import { harchosApi } from '../services/harchos-api';
import { sanitizeInput } from '../utils/validators';
import { statusEmoji } from '../utils/formatting';

export async function handleGpuCommand(command: SlashCommand): Promise<string> {
  const cluster = sanitizeInput(command.text.replace('gpu', '').trim());

  try {
    const data = await harchosApi.getGpuClusters(cluster || undefined);

    if (!data || data.length === 0) {
      return cluster
        ? `No GPU cluster found with name *${cluster}*. Check the cluster name and try again.`
        : 'No GPU clusters available right now. Try again later.';
    }

    let text = `*🖥️ GPU Clusters*\n`;

    for (const c of data) {
      const emoji = statusEmoji(c.status);
      text += `\n${emoji} *${c.name}* (${c.id})`;
      text += `\n   Region: ${c.region} | GPUs Available: ${c.gpusAvailable} | Status: ${c.status}`;
    }

    text += `\n\n_Tip: Use \`/harchos gpu [cluster]\` for details on a specific cluster_`;
    return text;
  } catch (error: any) {
    console.error('GPU command error:', error.message);
    return `❌ Could not fetch GPU data: ${error.message}`;
  }
}
