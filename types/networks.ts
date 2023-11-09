import type { ArrayElement } from 'types/utils';

export const NETWORK_GROUPS = [ 'Mainnets', 'Testnets', 'Other' ] as const;
export type NetworkGroup = ArrayElement<typeof NETWORK_GROUPS>;

export interface FeaturedNetworkSubMenu {
  title: string;
  url: string;
  icon?: string;
}

export interface FeaturedNetwork {
  title: string;
  url?: string;
  group: NetworkGroup;
  icon?: string;
  isActive?: boolean;
  invertIconInDarkMode?: boolean;
  subMenu?: Array<FeaturedNetworkSubMenu>;
}

export interface NetworkExplorer {
  title: string;
  baseUrl: string;
  paths: {
    tx?: string;
    address?: string;
    token?: string;
    block?: string;
  };
}

export type NetworkVerificationType = 'mining' | 'validation';
