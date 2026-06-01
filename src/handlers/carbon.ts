// Carbon command handler
// Check carbon intensity of compute regions

import { SlashCommand } from '@slack/bolt';
import { harchosApi } from '../services/harchos-api';
import { sanitizeInput, validateRegion } from '../utils/validators';

function getCarbonEmoji(intensity: number): string {
  if (intensity <= 100) return '🟢';
  if (intensity <= 200) return '🟡';
  if (intensity <= 300) return '🟠';
  return '🔴';
}

function getCarbonLabel(intensity: number): string {
  if (intensity <= 100) return 'Very Low';
  if (intensity <= 200) return 'Low';
  if (intensity <= 300) return 'Moderate';
  if (intensity <= 400) return 'High';
  return 'Very High';
}

export async function handleCarbonCommand(command: SlashCommand): Promise<string> {
  const rawRegion = command.text.replace('carbon', '').trim();
  const region = sanitizeInput(rawRegion);

  // Validate region if specified
  if (region) {
    const validation = validateRegion(region);
    if (!validation.valid) {
      return `⚠️ ${validation.error}`;
    }
  }

  try {
    const data = await harchosApi.getCarbonIntensity(region || undefined);

    if (!data || data.length === 0) {
      return region
        ? `No carbon data found for region *${region}*. Check the region code and try again.`
        : 'No carbon data available right now. Try again in a moment.';
    }

    let text = `*🌍 Carbon Intensity Report*\n`;
    
    for (const entry of data) {
      const emoji = getCarbonEmoji(entry.intensity);
      const label = getCarbonLabel(entry.intensity);
      text += `\n${emoji} *${entry.region}* — ${entry.intensity} gCO₂/kWh (${label})`;
      text += `\n   _Updated: ${entry.updatedAt}_`;
    }

    text += `\n\n_Tip: Use \`/harchos carbon [region]\` to check a specific region_`;
    return text;
  } catch (error: any) {
    console.error('Carbon command error:', error.message);
    return `❌ Could not fetch carbon data: ${error.message}`;
  }
}
