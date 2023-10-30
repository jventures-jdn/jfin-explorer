/* JFIN Mod Start */
import NetworkProfileMobile from 'customUI/networkProfiles/NetworkProfileMobile';
import NetworkProfileTable from 'customUI/networkProfiles/NetworkProfileTable';
import React from 'react';

import { NetworkProfile } from 'types/client/networkProfiles';
import type { NetworkProfiles } from 'types/client/networkProfiles';
import type { RoutedTab } from 'ui/shared/Tabs/types';

import useIsMobile from 'lib/hooks/useIsMobile';
import PageTitle from 'ui/shared/Page/PageTitle';
import RoutedTabs from 'ui/shared/Tabs/RoutedTabs';

const NETWORK_PROFILES: NetworkProfiles = {
  mainnet: {
    name: 'JFIN Chain',
    token: 'JFIN',
    rpc: 'https://rpc.jfinchain.com',
    chainId: '3501',
    explorerUrl: 'https://exp.jfinchain.com',
    websiteUrl: 'https://jfinchain.com',
  },
  testnet: {
    name: 'JFIN Chain Testnet',
    token: 'JFIN',
    rpc: 'https://rpc.testnet.jfinchain.com',
    chainId: '3502',
    explorerUrl: 'https://exp.testnet.jfinchain.com',
    websiteUrl: 'https://jfinchain.com',
  },
};

const NetworkProfile = () => {
  const isMobile = useIsMobile();

  const tabs: Array<RoutedTab> = [
    {
      id: 'jfin-chain',
      title: 'JFIN Chain',
      component: isMobile ?
        <NetworkProfileMobile profile={ NETWORK_PROFILES.mainnet }/> :
        <NetworkProfileTable profile={ NETWORK_PROFILES.mainnet }/>,
    },
    {
      id: 'jfin-chain-testnet',
      title: 'JFIN Chain Testnet',
      component: isMobile ?
        <NetworkProfileMobile profile={ NETWORK_PROFILES.testnet }/> :
        <NetworkProfileTable profile={ NETWORK_PROFILES.testnet }/>,
    },
  ];

  return (
    <>
      <PageTitle title="Network Profiles"/>
      <RoutedTabs tabs={ tabs } tabListProps={{ mt: 8 }}/>
    </>
  );
};

export default NetworkProfile;

/* JFIN Mod End */
