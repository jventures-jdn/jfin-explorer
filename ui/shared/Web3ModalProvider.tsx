import { useColorModeValue, useToken } from '@chakra-ui/react';
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc';
import { EthereumClient, w3mConnectors } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import React from 'react';
import type { Chain } from 'wagmi';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';

import config from 'configs/app';

const feature = config.features.blockchainInteraction;

const WALLETCONNECT_EXPLORER_HOST = 'explorer-api.walletconnect.com';
const WALLETCONNECT_INJECTED_LISTINGS_PATH = '/w3m/v1/getInjectedListings';
const FETCH_PATCH_FLAG = '__JFIN_WALLETCONNECT_INJECTED_LISTINGS_PATCHED__';

const getRequestUrl = (input: RequestInfo | URL) => {
  if (typeof input === 'string') {
    return input;
  }

  if (input instanceof URL) {
    return input.toString();
  }

  if (typeof Request !== 'undefined' && input instanceof Request) {
    return input.url;
  }

  return String(input);
};

const patchWalletConnectInjectedListingsResponse = () => {
  if (typeof window === 'undefined') {
    return;
  }

  const win = window as typeof window & { [FETCH_PATCH_FLAG]?: boolean };

  if (win[FETCH_PATCH_FLAG]) {
    return;
  }

  const originalFetch = window.fetch.bind(window);

  window.fetch = (async(...args) => {
    const response = await originalFetch(...args);
    const url = getRequestUrl(args[0]);
    const isWalletConnectInjectedListingsRequest =
      url.includes(WALLETCONNECT_EXPLORER_HOST) &&
      url.includes(WALLETCONNECT_INJECTED_LISTINGS_PATH);

    if (!isWalletConnectInjectedListingsRequest) {
      return response;
    }

    try {
      const json = await response.clone().json();

      if (!json || typeof json !== 'object' || !('listings' in json) || typeof json.listings !== 'object') {
        return response;
      }

      const listings = json.listings as Record<string, { injected?: unknown }>;
      let hasChanges = false;

      Object.values(listings).forEach((listing) => {
        if (listing && !Array.isArray(listing.injected)) {
          listing.injected = [];
          hasChanges = true;
        }
      });

      if (!hasChanges) {
        return response;
      }

      const headers = new Headers(response.headers);
      headers.delete('content-encoding');
      headers.set('content-type', 'application/json');

      return new Response(JSON.stringify(json), {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    } catch {
      return response;
    }
  }) as typeof window.fetch;

  win[FETCH_PATCH_FLAG] = true;
};

patchWalletConnectInjectedListingsResponse();

const getConfig = () => {
  try {
    if (!feature.isEnabled) {
      throw new Error();
    }

    const currentChain: Chain = {
      id: Number(config.chain.id),
      name: config.chain.name || '',
      network: config.chain.name || '',
      nativeCurrency: {
        decimals: config.chain.currency.decimals,
        name: config.chain.currency.name || '',
        symbol: config.chain.currency.symbol || '',
      },
      rpcUrls: {
        'public': {
          http: [ config.chain.rpcUrl || '' ],
        },
        'default': {
          http: [ config.chain.rpcUrl || '' ],
        },
      },
      blockExplorers: {
        'default': {
          name: 'Blockscout',
          url: config.app.baseUrl,
        },
      },
    };

    const chains = [ currentChain ];

    const { publicClient } = configureChains(chains, [
      jsonRpcProvider({
        rpc: () => ({
          http: config.chain.rpcUrl || '',
        }),
      }),
    ]);
    const wagmiConfig = createConfig({
      autoConnect: true,
      connectors: w3mConnectors({ projectId: feature.walletConnect.projectId, chains }),
      publicClient,
    });
    const ethereumClient = new EthereumClient(wagmiConfig, chains);

    return { wagmiConfig, ethereumClient };
  } catch (error) {
    return { wagmiConfig: undefined, ethereumClient: undefined };
  }
};

const { wagmiConfig, ethereumClient } = getConfig();

interface Props {
  children: React.ReactNode;
  fallback?: JSX.Element | (() => JSX.Element);
}

const Web3ModalProvider = ({ children, fallback }: Props) => {
  const modalZIndex = useToken<string>('zIndices', 'modal');
  const web3ModalTheme = useColorModeValue('light', 'dark');

  if (!wagmiConfig || !ethereumClient || !feature.isEnabled) {
    return typeof fallback === 'function' ? fallback() : (fallback || null);
  }

  return (
    <>
      <WagmiConfig config={ wagmiConfig }>
        { children }
      </WagmiConfig>
      <Web3Modal
        projectId={ feature.walletConnect.projectId }
        ethereumClient={ ethereumClient }
        themeMode={ web3ModalTheme }
        themeVariables={{
          '--w3m-z-index': modalZIndex,
        }}
      />
    </>
  );
};

export default Web3ModalProvider;
