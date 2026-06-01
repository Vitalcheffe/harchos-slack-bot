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

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || HARCHOS_API_BASE;
  }

  private async request(endpoint: string): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HarchOS API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
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
