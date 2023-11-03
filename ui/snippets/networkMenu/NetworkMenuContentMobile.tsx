import { Box, VStack, Skeleton, Flex } from '@chakra-ui/react';
import React from 'react';

import type { NetworkGroup, FeaturedNetwork } from 'types/networks';

import NetworkMenuLink from './NetworkMenuLink';

interface Props {
  tabs: Array<NetworkGroup>;
  items?: Array<FeaturedNetwork>;
}

const NetworkMenuContentMobile = ({ items }: Props) => {
  {/* JFIN Mod Start */}
  {/* JFIN Mod End */}

  const content = !items || items.length === 0 ? (
    <>
      <Skeleton h="32px" w="100%"/>
      <Flex mt={ 6 } flexDir="column" rowGap={ 2 }>
        <Flex mx={ 3 } my={ 2 } alignItems="center">
          <Skeleton h="30px" w="30px" borderRadius="full"/>
          <Skeleton h="20px" w="60px" ml={ 3 }/>
        </Flex>
        <Flex mx={ 3 } my={ 2 } alignItems="center">
          <Skeleton h="30px" w="30px" borderRadius="full"/>
          <Skeleton h="20px" w="120px" ml={ 3 }/>
        </Flex>
        <Flex mx={ 3 } my={ 2 } alignItems="center">
          <Skeleton h="30px" w="30px" borderRadius="full"/>
          <Skeleton h="20px" w="80px" ml={ 3 }/>
        </Flex>
      </Flex>
    </>
  ) : (
    <>
      { /* JFIN Mod Start */ }
      <VStack as="ul" spacing={ 2 } alignItems="stretch">
        { items
          .map((network) => (
            <NetworkMenuLink
              key={ network.title }
              { ...network }
              isMobile
            />
          ))
        }
      </VStack>
      { /* JFIN Mod End */ }
    </>
  );

  return (
    <Box mt={ 6 }>
      { content }
    </Box>
  );
};

export default React.memo(NetworkMenuContentMobile);
