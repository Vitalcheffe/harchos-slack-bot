// HarchOS API client
// Talks to the HarchOS platform API

import fetch from 'node-fetch';

const HARCHOS_API_BASE = process.env.HARCHOS_API_URL || 'https://api.harchos.ai/v1';

interface CarbonData {
  region: string;
  intensity: number;
  label: string;
  updatedAt: string;
}

interface GpuCluster {
  id: string;
  name: string;
  region: string;
  gpusAvailable: number;
  status: string;
}

interface PricingData {
  region: string;
  gpuType: string;
  pricePerHour: number;
  currency: string;
}

interface SystemStatus {
  status: string;
  uptime: number;
  lastIncident: string | null;
  regions: { name: string; status: string }[];
}

export class HarchOSApiClient {
  private baseUrl: string;
  private timeout: number;

  constructor(baseUrl?: string, timeout: number = 10000) {
    this.baseUrl = baseUrl || HARCHOS_API_BASE;
    this.timeout = timeout;
  }

  private async request(endpoint: string): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorBody = await response.text().catch(() => 'Unknown error');
        console.error(`HarchOS API ${response.status}: ${errorBody}`);
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new Error(`HarchOS API request timed out after ${this.timeout}ms`);
      }
      throw new Error(`Failed to reach HarchOS API: ${error.message}`);
    }
  }

  async getCarbonIntensity(region?: string): Promise<CarbonData[]> {
    const endpoint = region
      ? `/carbon?region=${encodeURIComponent(region)}`
      : '/carbon';
    return this.request(endpoint);
  }

  async getGpuClusters(cluster?: string): Promise<GpuCluster[]> {
    const endpoint = cluster
      ? `/gpu?cluster=${encodeURIComponent(cluster)}`
      : '/gpu';
    return this.request(endpoint);
  }

  async getPricing(region?: string, gpuType?: string): Promise<PricingData[]> {
    let endpoint = '/pricing';
    const params: string[] = [];
    if (region) params.push(`region=${encodeURIComponent(region)}`);
    if (gpuType) params.push(`gpu=${encodeURIComponent(gpuType)}`);
    if (params.length > 0) endpoint += '?' + params.join('&');
    return this.request(endpoint);
  }

  async getSystemStatus(): Promise<SystemStatus> {
    return this.request('/status');
  }
}

// Export a singleton instance
export const harchosApi = new HarchOSApiClient();
