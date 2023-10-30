/* JFIN Mod Start */
/* eslint-disable max-len */
import type { ThemingProps } from '@chakra-ui/react';
import { Card, Heading, Text, useColorModeValue } from '@chakra-ui/react';
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
  const cardBackgroundColor = useColorModeValue('gray.50', 'gray.800');

  const getProfileComponent = (profile: NetworkProfile) => {
    return isMobile ? <NetworkProfileMobile profile={ profile }/> : <NetworkProfileTable profile={ profile }/>;
  };

  const tabs: Array<RoutedTab> = Object.keys(NETWORK_PROFILES).map(network => ({
    id: NETWORK_PROFILES[network].name.split(' ').join('-').toLocaleLowerCase(),
    title: NETWORK_PROFILES[network].name,
    component: getProfileComponent(NETWORK_PROFILES[network]),
  }));

  const HEADING_SIZE: ThemingProps<'Heading'>['size'] = 'sm';

  return (
    <>
      <PageTitle title="Network Profiles"/>
      <RoutedTabs tabs={ tabs } tabListProps={{ mt: 6 }}/>
      <Card p="6" bgColor={ cardBackgroundColor }>
        <Heading as="h2" size={ HEADING_SIZE } fontWeight="semibold" mb={ 2 }>
          Overview
        </Heading>
        <Text mb={ 6 }>
          JFIN Chain is a proof-of-stake blockchain that was developed by J Ventures Co., Ltd., (&quot;JVC&quot;), and will be transferred to JDN Co., Ltd. (&quot;JDN&quot;), an affiliate of JVC, under the management and system maintenance by JVC. Both companies have recognized the opportunities and user needs for a network to support decentralized applications with a variety of functions and utilities, especially DeFi, GameFi, NFTs, and Metaverse, which have grown significantly over the past 2 years. JFIN Chain will use JFIN tokens as its native tokens for transactions (gas fee)
        </Text>
        <Heading as="h2" size={ HEADING_SIZE } fontWeight="semibold" mb={ 2 }>
          Background of The Project
        </Heading>
        <Text mb={ 6 }>
          In February 2018, JVC underwent an initial public offering of 100,000,000 digital
          tokens called &quot;JFIN Token&quot; (out of a total supply of 300,000,000 pre-mined tokens)
          under the ERC-20 standard, with the objective at that time being to develop a peerto-peer lending platform that includes a transaction validation function and data
          storage on a blockchain system, with JFIN Tokens as a gas fee for using the
          blockchain system. JFIN Tokens that are received from blockchain users will be paid
          as rewards to users who participate as transaction validators under the proof-ofstake (POS) concept.
          Over the past 4 years, JVC has recognized the opportunities and needs for more
          diversity in the usage of blockchain systems and technologies, which is not limited
          to lending, but can be developed into other forms of decentralized financial
          services, decentralized hybrid games applications (GameFi), the issuance of nonfungible tokens (NFT), and the development of Metaverse. JVC is therefore focusing
          on developing JFIN Chain, enabling it to support a greater variety of transactions,
          activities, and services. Nevertheless, users of JFIN Chain who participate in the
          validation of transactions on the blockchain system will remain entitled to receive
          JFIN Tokens as gas fees, as per the details set out below.
        </Text>
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
          <Text as="span" fontWeight="bold">Validator nodes:</Text> At the initial stage, there will be 5 validator nodes.
          The number of validator nodes will be increased by 2 every three
          months, according to the preliminary operating plan specified herein.
          Users of each node must stake at least 100,000 JFIN Tokens to
          validate transactions. JFIN Token holders will also be provided with
          opportunities to participate in the staking.
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
        <Text mb={ 6 }>
          <Text as="span" fontWeight="bold">Governance:</Text> Validator nodes will have the right to call for a vote to increase
          or decrease the number of validators, and to activate or deactivate the
          node. The voting power will be calculated from the total number of JFIN
          Tokens delegated to that validation node.
        </Text>
        <Heading as="h2" size={ HEADING_SIZE } fontWeight="semibold" mb={ 2 }>
          Smart Contract Capability
        </Heading>
        <Text mb={ 6 }>
          JFIN Chain can support smart contracts that conform to the Ethereum Virtual
          Machine (EVM) standard, which is currently the most popular solution. The existing
          applications on the EVM standard, irrespective of whether they are DeFi, GameFi,
          NFT, or Metaverse applications, can be used on JFIN Chain immediately in the form of
          decentralized applications (&quot;dAPPs&quot;) that are connected to the Web 3 standard
          blockchain. JFIN Chain can support tokens mined under ERC-20, ERC-721, and
          ERC-1155 standards, as well as other tokens that conform to the standards to be
          introduced by Ethereum in the future.
        </Text>
      </Card>
    </>
  );
};

export default NetworkProfile;

/* JFIN Mod End */
