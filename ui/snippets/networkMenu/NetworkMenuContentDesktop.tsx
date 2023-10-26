import { PopoverContent, PopoverBody, Text, Skeleton, Flex, useColorModeValue, Grid } from '@chakra-ui/react';
import React from 'react';

import type { FeaturedNetwork, NetworkGroup } from 'types/networks';

import NetworkMenuLink from './NetworkMenuLink';

interface Props {
  tabs: Array<NetworkGroup>;
  items?: Array<FeaturedNetwork>;
}

const NetworkMenuPopup = ({ items }: Props) => {
  { /* JFIN Mod Start */ }
  // const selectedNetwork = items?.find(({ isActive }) => isActive);
  // const selectedTab = tabs.findIndex((tab) => selectedNetwork?.group === tab);
  { /* JFIN Mod End */ }
  const bgColor = useColorModeValue('blackAlpha.50', 'whiteAlpha.50');

  const content = !items || items.length === 0 ? (
    <>
      <Skeleton h="30px" w="120px"/>
      <Flex mt={ 4 } alignItems="center">
        <Flex h="40px" w="105px" bgColor={ bgColor } borderRadius="base" px={ 4 } py={ 2 }>
          <Skeleton h="24px" w="100%"/>
        </Flex>
        <Skeleton h="24px" w="68px" mx={ 4 }/>
        <Skeleton h="24px" w="45px" mx={ 4 }/>
      </Flex>
      <Flex mt={ 8 } flexDir="column" rowGap={ 2 }>
        <Flex mx={ 4 } my={ 2 } alignItems="center">
          <Skeleton h="30px" w="30px" borderRadius="full"/>
          <Skeleton h="24px" w="120px" ml={ 3 }/>
        </Flex>
        <Flex mx={ 4 } my={ 2 } alignItems="center">
          <Skeleton h="30px" w="30px" borderRadius="full"/>
          <Skeleton h="24px" w="180px" ml={ 3 }/>
        </Flex>
        <Flex mx={ 4 } my={ 2 } alignItems="center">
          <Skeleton h="30px" w="30px" borderRadius="full"/>
          <Skeleton h="24px" w="150px" ml={ 3 }/>
        </Flex>
      </Flex>
    </>
  ) : (
    <>
      { /* JFIN Mod Start */ }
      <Text as="h4" fontSize="18px" lineHeight="30px" fontWeight="500">JFIN Chain Ecosystem</Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={ 4 } mt={ 6 }>
        { items
          .map((network) => (
            <NetworkMenuLink
              key={ network.title }
              { ...network }
            />
          )) }
      </Grid>
      { /* JFIN Mod End */ }
    </>
  );

  return (
    <PopoverContent w="382px">
      <PopoverBody>
        { content }
      </PopoverBody>
    </PopoverContent>
  );
};

export default React.memo(NetworkMenuPopup);
