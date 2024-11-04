/* eslint-disable react/jsx-no-bind */
import { Box, VStack, Skeleton, Flex, useColorModeValue, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

import type { NetworkGroup, FeaturedNetwork } from 'types/networks';

import chevronIcon from 'icons/arrows/east-mini.svg';
import Icon from 'ui/shared/chakra/Icon';

import NetworkMenuLink from './NetworkMenuLink';

interface Props {
  tabs: Array<NetworkGroup>;
  items?: Array<FeaturedNetwork>;
}

const NetworkMenuContentMobile = ({ items }: Props) => {
  {/* JFIN Mod Start */}
  const [ selectedMenu, setSelectedMenu ] = useState<string | undefined>();
  const iconColor = useColorModeValue('purple.600', 'purple.200');

  const handleClickMenu = (network: FeaturedNetwork) => {
    if (!network?.subMenu) {
      return;
    }
    setSelectedMenu(network.title);
  };

  const handleClickBack = () => {
    setSelectedMenu(undefined);
  };
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
      { selectedMenu ? (
        <>
          {
            selectedMenu && (
              <Flex alignItems="center" onClick={ handleClickBack }>
                <Icon as={ chevronIcon } boxSize={ 6 } mr={ 2 } color={ iconColor } cursor="pointer"/>
                <Text as="h4" fontSize="18px" lineHeight="30px" fontWeight="500">{ selectedMenu }</Text>
              </Flex>
            )
          }
          <VStack as="ul" spacing={ 2 } mt={ 4 } alignItems="stretch">
            { items.find((item) => item.title === selectedMenu)?.subMenu?.map(subMenu => (
              <NetworkMenuLink
                group="Mainnets"
                key={ subMenu.title }
                isMobile
                { ...subMenu }/>
            ),
            ) }
          </VStack>
        </>
      ) : (
        <VStack as="ul" spacing={ 2 } alignItems="stretch">
          { items
            .map((network) => (
              <Box
                key={ network.title }
                onClick={ () => handleClickMenu(network) }
              >
                <NetworkMenuLink
                  key={ network.title }
                  { ...network }
                  isMobile
                />
              </Box>
            ))
          }
        </VStack>
      ) }
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
