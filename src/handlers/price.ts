// Price command handler
// Compare compute pricing across regions

import { SlashCommand } from '@slack/bolt';
import { harchosApi } from '../services/harchos-api';
import { sanitizeInput, validateRegion, validateGpuType } from '../utils/validators';
import { formatCurrency } from '../utils/formatting';

export async function handlePriceCommand(command: SlashCommand): Promise<string> {
  const args = command.text.replace('price', '').trim().split(/\s+/);
  const region = sanitizeInput(args[0] || '');
  const gpuType = sanitizeInput(args[1] || '');

  // Validate inputs
  if (region) {
    const regionValidation = validateRegion(region);
    if (!regionValidation.valid) {
      return `⚠️ ${regionValidation.error}`;
    }
  }

  if (gpuType) {
    const gpuValidation = validateGpuType(gpuType);
    if (!gpuValidation.valid) {
      return `⚠️ ${gpuValidation.error}`;
    }
  }

  try {
    const data = await harchosApi.getPricing(region || undefined, gpuType || undefined);

    if (!data || data.length === 0) {
      return 'No pricing data available for your query. Try different parameters.';
    }

    let text = `*💰 Compute Pricing*\n`;

    // Sort by price to show cheapest first
    const sorted = [...data].sort((a, b) => a.pricePerHour - b.pricePerHour);

    for (const entry of sorted) {
      const price = formatCurrency(entry.pricePerHour, entry.currency);
      text += `\n• *${entry.region}* / ${entry.gpuType.toUpperCase()} — ${price}/hr`;
    }

    if (sorted.length > 1) {
      const cheapest = sorted[0];
      const cheapestPrice = formatCurrency(cheapest.pricePerHour, cheapest.currency);
      text += `\n\n💡 Cheapest: *${cheapest.region}* at ${cheapestPrice}/hr`;
    }

    text += `\n\n_Tip: Use \`/harchos price [region] [gpu_type]\` to filter_`;
    return text;
  } catch (error: any) {
    console.error('Price command error:', error.message);
    return `❌ Could not fetch pricing data: ${error.message}`;
  }
}
