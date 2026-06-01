// Help command handler
// Shows all available HarchOS bot commands

import { SlashCommand } from '@slack/bolt';

interface CommandInfo {
  name: string;
  description: string;
  usage: string;
  example: string;
}

const COMMANDS: CommandInfo[] = [
  {
    name: '/harchos help',
    description: 'Show this help message with all available commands',
    usage: '/harchos help',
    example: '/harchos help',
  },
  {
    name: '/harchos carbon',
    description: 'Check carbon intensity of compute regions. Lower is better for the environment!',
    usage: '/harchos carbon [region]',
    example: '/harchos carbon eu-west-1',
  },
  {
    name: '/harchos gpu',
    description: 'List available GPU clusters and their current availability status',
    usage: '/harchos gpu [cluster]',
    example: '/harchos gpu',
  },
  {
    name: '/harchos price',
    description: 'Compare compute pricing across regions and GPU types',
    usage: '/harchos price [region] [gpu_type]',
    example: '/harchos price us-east-1 a100',
  },
  {
    name: '/harchos status',
    description: 'Check HarchOS platform status, uptime, and region health',
    usage: '/harchos status',
    example: '/harchos status',
  },
];

export async function handleHelpCommand(command: SlashCommand): Promise<string> {
  let text = `*⚡ HarchOS Bot Commands*\n`;
  text += `Carbon-aware compute at your fingertips.\n\n`;

  for (const cmd of COMMANDS) {
    text += `• *\`${cmd.name}\`*\n`;
    text += `  ${cmd.description}\n`;
    text += `  Usage: \`${cmd.usage}\`\n`;
    text += `  Example: \`${cmd.example}\`\n\n`;
  }

  text += `_Built with ❤️ by Amine for Hack Club Stardance_`;

  return text;
}
