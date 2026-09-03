/* JFIN Mod Start */
/* eslint-disable max-len */
import type { ThemingProps } from '@chakra-ui/react';
import { Card, Heading, Link, Text, useColorModeValue } from '@chakra-ui/react';
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
    name: '🌏 JFIN Chain',
    token: 'JFIN',
    rpc: 'https://rpc.jfinchain.com',
    chainId: '3501',
    explorerUrl: 'https://jfinscan.com',
    websiteUrl: 'https://jfinchain.com',
  },
  testnet: {
    name: '🏗️ JFIN Chain Testnet',
    token: 'JFIN',
    rpc: 'https://rpc.testnet.jfinchain.com',
    chainId: '3502',
    explorerUrl: 'https://testnet.jfinscan.com',
    websiteUrl: 'https://jfinchain.com',
  },
};

const NetworkProfile = () => {
  const isMobile = useIsMobile();
  const cardBackgroundColor = useColorModeValue('gray.50', 'gray.800');

  const getProfileComponent = (profile: NetworkProfile) => {
    return isMobile ? <NetworkProfileMobile profile={ profile }/> : <NetworkProfileTable profile={ profile }/>;
  };

  const tabs: Array<RoutedTab> = Object.keys(NETWORK_PROFILES).map(network => {
    const { name, ...otherProps } = NETWORK_PROFILES[network];
    // Cleaning up the network name by removing emojis and extraneous whitespace
    const cleanName = name.replace(/[^\w\s]/g, '').trim();
    // Creating a slug for the ID
    const slugId = cleanName.split(' ').join('-').toLowerCase();
    return {
      id: slugId,
      title: name,
      component: getProfileComponent({ name: cleanName, ...otherProps }),
    };
  });

  const HEADING_SIZE: ThemingProps<'Heading'>['size'] = 'sm';

  return (
    <>
      <PageTitle title="Network Profiles"/>
      <RoutedTabs tabs={ tabs } tabListProps={{ mt: 6 }}/>
      <Card p={ 6 } bgColor={ cardBackgroundColor }>
        <Heading as="h2" size={ HEADING_SIZE } fontWeight="semibold" mb={ 2 }>
          Technical Information of JFIN Tokens
        </Heading>
        <Text mb={ 2 } whiteSpace="pre-line">
          {
            `JFIN Chain Mainnet
            Consensus: Proof-of-Stake ("PoS") Chain Configuration
            Block time: 3 seconds
            Epoch: 1,200 blocks (approximately 1 hour)`
          }
        </Text>
        <Text mb={ 2 }>
          <Text as="span" fontWeight="bold">Validator nodes:</Text>
          JFIN Chain network has stabilized with 11 validator nodes in operation <Link fontWeight="bold" textDecoration="underline" href="/blocks" target="_blank">here</Link>.
          Users of each node must stake at least 100,000 JFIN Tokens to validate transactions.
          JFIN Token holders will also be provided with opportunities to participate in the staking.
          <br/>
          <Text as="span" fontWeight="bold">Consensus:</Text> PoS consensus mechanism, whereby validator nodes with
          at least 100,000 JFIN Tokens staked and registered with the system
          will be granted the right to validate blocks on a round-robin basis. A
          validator node with no-response number in excess of 200 blocks per
          epoch will be penalized by being suspended from the participation
          for 10 epochs (approximately 10 hours).
          <br/>
          <Text as="span" fontWeight="bold">Allocation of validator rewards:</Text> (both in the forms of gas fee and
          block reward (if any))
        </Text>
        <Text mb={ 2 } whiteSpace="pre-line">
          {
            `• 33 percent to the owner of JFIN Chain, i.e. JDN;
            • 6.7 percent to the validation nodes that are granted the right to create the blocks; and
            • 60.3 percent to the holders of JFIN Tokens staked on the nodes that are granted the right to create the blocks.`
          }
        </Text>
        <Text>
          <Text as="span" fontWeight="bold">Governance:</Text> Validator nodes will have the right to call for a vote to increase
          or decrease the number of validators, and to activate or deactivate the
          node. The voting power will be calculated from the total number of JFIN
          Tokens delegated to that validation node.
        </Text>
      </Card>
    </>
  );
};

export default NetworkProfile;

/* JFIN Mod End */
