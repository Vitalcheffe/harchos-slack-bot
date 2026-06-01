// Status command handler
// Check HarchOS platform status and uptime

import { SlashCommand } from '@slack/bolt';
import { harchosApi } from '../services/harchos-api';
import { statusEmoji, formatUptime, formatPercent } from '../utils/formatting';

export async function handleStatusCommand(command: SlashCommand): Promise<string> {
  try {
    const data = await harchosApi.getSystemStatus();

    const mainEmoji = statusEmoji(data.status);
    const uptime = formatUptime(data.uptime);

    let text = `*${mainEmoji} HarchOS Platform Status*\n`;
    text += `Overall: *${data.status.toUpperCase()}* | Uptime: ${uptime}\n`;

    if (data.lastIncident) {
      text += `Last Incident: ${data.lastIncident}\n`;
    }

    if (data.regions && data.regions.length > 0) {
      text += `\n*Regions:*\n`;
      for (const region of data.regions) {
        const emoji = statusEmoji(region.status);
        text += `${emoji} ${region.name} — ${region.status}\n`;
      }
    }

    return text;
  } catch (error: any) {
    console.error('Status command error:', error.message);
    return `❌ Could not fetch platform status: ${error.message}`;
  }
}
