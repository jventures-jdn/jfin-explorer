import { useDisclosure } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import type { FeaturedNetwork } from 'types/networks';
import { NETWORK_GROUPS } from 'types/networks';

import config from 'configs/app';
import type { ResourceError } from 'lib/api/resources';

export default function useNetworkMenu() {
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();

  const network = {
    mainnet: {
      title: 'Mainnet',
      url: 'https://jfinscan.com/',
      group: 'Testnets',
      icon: '/static/commons/globe.svg',
      invertIconInDarkMode: 'true',
    },
    testnet: {
      title: 'Testnet',
      url: 'https://testnet.jfinscan.com/',
      group: 'Testnets',
      icon: '/static/commons/construction.svg',
      invertIconInDarkMode: 'true',
    },
  };

  const featuredNetworks = [
    {
      title: 'Bridge',
      url: 'https://bridge.jfinchain.com/',
      group: 'Mainnets',
      icon: '/static/commons/rpc.svg',
      invertIconInDarkMode: 'true',
    },
    {
      title: 'Staking',
      url: 'https://staking.jfinchain.com/',
      group: 'Mainnets',
      icon: '/static/commons/link.svg',
      invertIconInDarkMode: 'true',
    },
    {
      title: 'Join Wallet',
      url: 'https://www.joinapp.digital',
      group: 'Mainnets',
      icon: '/static/apps/joinwallet.png',
    },
    {
      title: 'Community',
      url: 'https://www.jfincoin.io/jfin-community',
      group: 'Mainnets',
      icon: '/static/commons/discussions.svg',
      invertIconInDarkMode: 'true',
    },
    {
      title: 'Coinmarketcap',
      url: 'https://coinmarketcap.com/currencies/jfin/',
      group: 'Mainnets',
      icon: '/static/apps/coinmarketcap.png',
    },
    {
      title: 'JNFT',
      url: 'https://marketplace.jnft.digital/',
      group: 'Mainnets',
      icon: '/static/apps/jnft.png',
    },
    {
      title: 'J2O (L2)',
      url: 'https://j2o.io/',
      group: 'Mainnets',
      icon: '/static/apps/j2o.png',
    },
    config.chain.isTestnet ? { ...network.mainnet } : { ...network.testnet },
    {
      title: 'Markets',
      group: 'Mainnets',
      icon: '/static/commons/token.svg',
      invertIconInDarkMode: 'true',
      subMenu: [
        {
          title: 'Bitkub',
          icon: '/static/markets/bitkub.png',
          url: 'https://www.bitkub.com/market/JFIN',
        },
        {
          title: 'Coinstore',
          icon: '/static/markets/coinstore.png',
          url: 'https://www.coinstore.com/#/spot/jfinusdt',
        },
        {
          title: 'Satang Pro',
          icon: '/static/markets/satang-pro.png',
          url: 'https://satangcorp.com/exchange/trade/JFIN-THB',
        },
        {
          title: 'Liquid Crypto',
          icon: '/static/markets/liquid-crypto.png',
          url: 'https://jfinchain.liquidcrypto.finance/swap',
        },
      ],
    },
  ];

  const { isLoading, data } = useQuery<unknown, ResourceError<unknown>, Array<FeaturedNetwork>>(
    [ 'featured-network' ],
    async() => featuredNetworks,
    {
      enabled: isOpen,
      staleTime: Infinity,
    });

  return React.useMemo(() => ({
    isOpen,
    onClose,
    onOpen,
    onToggle,
    isLoading,
    data,
    availableTabs: NETWORK_GROUPS.filter((tab) => data?.some(({ group }) => group === tab)),
  }), [ isOpen, onClose, onOpen, onToggle, data, isLoading ]);
}
