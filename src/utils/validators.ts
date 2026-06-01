// Input validation for HarchOS bot commands

const VALID_REGIONS = [
  'eu-west-1', 'eu-central-1', 'eu-north-1',
  'us-east-1', 'us-west-2', 'us-central-1',
  'ap-southeast-1', 'ap-northeast-1', 'ap-south-1',
];

const VALID_GPU_TYPES = [
  'a100', 'h100', 'a10g', 't4', 'v100',
  'l40s', 'mi300x',
];

export function validateRegion(region: string): { valid: boolean; error?: string } {
  if (!region) return { valid: true }; // empty = all regions
  if (VALID_REGIONS.includes(region.toLowerCase())) {
    return { valid: true };
  }
  return {
    valid: false,
    error: `Unknown region: \`${region}\`. Valid regions: ${VALID_REGIONS.slice(0, 5).join(', ')}, ...`,
  };
}

export function validateGpuType(gpuType: string): { valid: boolean; error?: string } {
  if (!gpuType) return { valid: true };
  if (VALID_GPU_TYPES.includes(gpuType.toLowerCase())) {
    return { valid: true };
  }
  return {
    valid: false,
    error: `Unknown GPU type: \`${gpuType}\`. Valid types: ${VALID_GPU_TYPES.join(', ')}`,
  };
}

export function sanitizeInput(input: string): string {
  // Remove any potentially dangerous characters
  return input.replace(/[<>&|;`$]/g, '').trim();
}
