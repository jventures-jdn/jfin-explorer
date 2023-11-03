import { Box, Heading, Flex, LightMode, Image } from '@chakra-ui/react';
import React from 'react';

import config from 'configs/app';
import ChainIndicators from 'ui/home/indicators/ChainIndicators';
import LatestBlocks from 'ui/home/LatestBlocks';
import Stats from 'ui/home/Stats';
import Transactions from 'ui/home/Transactions';
import AdBanner from 'ui/shared/ad/AdBanner';
import ProfileMenuDesktop from 'ui/snippets/profileMenu/ProfileMenuDesktop';
import SearchBar from 'ui/snippets/searchBar/SearchBar';

const Home = () => {
  return (
    <Box as="main">
      { /* JFIN Mod Start */ }
      <Box
        w="100%"
        background={ config.UI.homepage.plate.background }
        borderRadius="24px"
        padding={{ base: '24px', lg: '48px' }}
        minW={{ base: 'unset', lg: '900px' }}
        boxShadow="md"
        data-label="hero plate"
        position="relative"
        overflow="hidden"
      >
        <Image
          src="/static/network-path.png"
          alt="networks"
          position="absolute"
          maxWidth="950px"
          bottom="0"
          right="-13%"
          zIndex={ 1 }
          opacity={ 0.4 }
          pointerEvents="none"
        />
        <Flex mb={{ base: 3, lg: 3 }} justifyContent="space-between" position="relative" zIndex={ 2 }>
          <Heading
            as="h1"
            size={{ base: 'md', lg: 'xl' }}
            lineHeight={{ base: '32px', lg: '50px' }}
            fontWeight={ 600 }
            color={ config.UI.homepage.plate.textColor }
          >
            { config.chain.name } Explorer
          </Heading>
          <Box display={{ base: 'none', lg: 'block' }}>
            { config.features.account.isEnabled && <ProfileMenuDesktop/> }
          </Box>
        </Flex>

        <Heading
          as="h2"
          size={{ base: 'xs', lg: 'sm' }}
          color={ config.UI.homepage.plate.textColor }
          mb={{ base: 6, lg: 6 }}
        >
          Unlocking the Future, Navigating the Blockchain Revolution with Precision and Insight.
        </Heading>
        <Box position="relative" zIndex={ 2 } >
          <LightMode>
            <SearchBar isHomepage/>
          </LightMode>
        </Box>
        { /* JFIN Mod End */ }
      </Box>
      <Stats/>
      <ChainIndicators/>
      <AdBanner mt={{ base: 6, lg: 8 }} mx="auto" display="flex" justifyContent="center"/>
      <Flex mt={ 8 } direction={{ base: 'column', lg: 'row' }} columnGap={ 12 } rowGap={ 8 }>
        <LatestBlocks/>
        <Box flexGrow={ 1 }>
          <Transactions/>
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
