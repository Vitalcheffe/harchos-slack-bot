// HarchOS API client
// Talks to the HarchOS platform API

const HARCHOS_API_BASE = process.env.HARCHOS_API_URL || 'https://api.harchos.ai/v1';

export class HarchOSApiClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || HARCHOS_API_BASE;
  }

  // TODO: implement API methods
  async getCarbonIntensity(region?: string): Promise<any> {
    throw new Error('Not implemented yet');
  }

  async getGpuClusters(cluster?: string): Promise<any> {
    throw new Error('Not implemented yet');
  }

  async getPricing(region?: string, gpuType?: string): Promise<any> {
    throw new Error('Not implemented yet');
  }

  async getSystemStatus(): Promise<any> {
    throw new Error('Not implemented yet');
  }
}
