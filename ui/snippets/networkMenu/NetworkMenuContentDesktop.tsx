/* eslint-disable react/jsx-no-bind */
import { PopoverContent, PopoverBody, Text, Skeleton, Flex, useColorModeValue, Grid, Box, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';

import type { FeaturedNetwork, NetworkGroup } from 'types/networks';

import chevronIcon from 'icons/arrows/east-mini.svg';

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
  const [ selectedMenu, setSelectedMenu ] = useState<string | undefined>();
  const bgColor = useColorModeValue('blackAlpha.50', 'whiteAlpha.50');
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
      {
        selectedMenu ? (
          <>
            {
              selectedMenu && (
                <Flex alignItems="center">
                  <Icon as={ chevronIcon } boxSize={ 6 } mr={ 2 } color={ iconColor } onClick={ handleClickBack } cursor="pointer"/>
                  <Text as="h4" fontSize="18px" lineHeight="30px" fontWeight="500">{ selectedMenu }</Text>
                </Flex>
              )
            }
            <Grid templateColumns="repeat(3, 1fr)" gap={ 4 } mt={ 6 }>
              { items.find((item) => item.title === selectedMenu)?.subMenu?.map(subMenu => (
                <NetworkMenuLink
                  group="Mainnets"
                  key={ subMenu.title }
                  { ...subMenu }/>
              ),
              ) }
            </Grid>
          </>
        ) : (
          <>
            <Text as="h4" fontSize="18px" lineHeight="30px" fontWeight="500">JFIN Chain Ecosystem</Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={ 4 } mt={ 6 }>
              { items
                .map((network) => (
                  <Box
                    key={ network.title }
                    onClick={ () => handleClickMenu(network) }
                  >
                    <NetworkMenuLink
                      { ...network }
                    />
                  </Box>
                )) }
            </Grid>
          </>
        )
      }
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
