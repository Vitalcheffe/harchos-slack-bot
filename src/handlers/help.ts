// Help command handler
// Shows all available HarchOS bot commands

import { SlashCommand } from '@slack/bolt';

interface CommandInfo {
  name: string;
  description: string;
  usage: string;
}

const COMMANDS: CommandInfo[] = [
  {
    name: '/harchos help',
    description: 'Show this help message with all available commands',
    usage: '/harchos help',
  },
  {
    name: '/harchos carbon',
    description: 'Check carbon intensity of compute regions',
    usage: '/harchos carbon [region]',
  },
  {
    name: '/harchos gpu',
    description: 'List available GPU clusters and their status',
    usage: '/harchos gpu [cluster]',
  },
  {
    name: '/harchos price',
    description: 'Compare compute pricing across regions',
    usage: '/harchos price [region] [gpu_type]',
  },
  {
    name: '/harchos status',
    description: 'Check HarchOS platform status and uptime',
    usage: '/harchos status',
  },
];

export async function handleHelpCommand(command: SlashCommand): Promise<string> {
  let text = `*HarchOS Bot Commands* ⚡\n`;
  text += `Carbon-aware compute at your fingertips.\n\n`;

  for (const cmd of COMMANDS) {
    text += `• *\`${cmd.name}\`* — ${cmd.description}\n`;
    text += `  Usage: \`${cmd.usage}\`\n\n`;
  }

  text += `_Built by Amine for Hack Club Stardance_ 🚀`;

  return text;
}
