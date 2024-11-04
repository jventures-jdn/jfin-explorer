import { Box, Flex, Text, Icon, VStack, useColorModeValue, Divider } from '@chakra-ui/react';
import { animate, motion, useMotionValue } from 'framer-motion';
import React, { Fragment, useCallback } from 'react';

import chevronIcon from 'icons/arrows/east-mini.svg';
import groupMenuItems from 'lib/groupMenuItems';
import useHasAccount from 'lib/hooks/useHasAccount';
import useNavItems, { isGroupItem } from 'lib/hooks/useNavItems';
import NavLink from 'ui/snippets/navigation/NavLink';

import NavLinkGroupMobile from './NavLinkGroupMobile';

interface Props {
  onNavLinkClick?: () => void;
}

const NavigationMobile = ({ onNavLinkClick }: Props) => {
  const { mainNavItems, accountNavItems } = useNavItems();

  const [ openedGroupIndex, setOpenedGroupIndex ] = React.useState(-1);

  const mainX = useMotionValue(0);
  const subX = useMotionValue(250);

  const onGroupItemOpen = (index: number) => () => {
    setOpenedGroupIndex(index);
    animate(mainX, -250, { ease: 'easeInOut' });
    animate(subX, 0, { ease: 'easeInOut' });
  };

  const onGroupItemClose = useCallback(() => {
    animate(mainX, 0, { ease: 'easeInOut' });
    animate(subX, 250, { ease: 'easeInOut', onComplete: () => setOpenedGroupIndex(-1) });
  }, [ mainX, subX ]);

  const hasAccount = useHasAccount();

  /* JFIN Mod Start */
  const iconColor = useColorModeValue('purple.600', 'purple.200');
  const dividerColor = useColorModeValue('white', 'gray.900');

  /* JFIN Mod End */

  const openedItem = mainNavItems[openedGroupIndex];

  return (
    <Flex position="relative" flexDirection="column" flexGrow={ 1 }>
      <Box
        display="flex"
        flexDirection="column"
        flexGrow={ 1 }
        as={ motion.div }
        style={{ x: mainX }}
        maxHeight={ openedGroupIndex > -1 ? '100vh' : 'unset' }
        overflowY={ openedGroupIndex > -1 ? 'hidden' : 'unset' }
      >
        <Box
          as="nav"
          mt={ 6 }
        >
          <VStack
            w="100%"
            as="ul"
            spacing="1"
            alignItems="flex-start"
          >
            { mainNavItems.map((item, index) => {
              if (isGroupItem(item)) {
                return (
                  <Fragment key={ item.text }>
                    { (item.text === 'Mainnet' || item.text === 'Testnet') && (
                      <Text
                        bg="divider"
                        display="inline-block"
                        whiteSpace="nowrap"
                        variant="secondary"
                        fontSize="2xs"
                        borderRadius="md"
                        px={ 2 }
                        marginLeft={ 3 }
                        my={ 1 }
                      >
                          Network
                      </Text>
                    ) }
                    <NavLinkGroupMobile key={ item.text } item={ item } onClick={ onGroupItemOpen(index) }/>
                  </Fragment>
                );
              } else {
                return <NavLink key={ item.text } item={ item } onClick={ onNavLinkClick }/>;
              }
            }) }
          </VStack>
        </Box>
        { hasAccount && (
          <Box
            as="nav"
            mt={ 6 }
            pt={ 6 }
            borderTopWidth="1px"
            borderColor="divider"
          >
            <VStack as="ul" spacing="1" alignItems="flex-start">
              { accountNavItems.map((item) => <NavLink key={ item.text } item={ item } onClick={ onNavLinkClick }/>) }
            </VStack>
          </Box>
        ) }
      </Box>
      { openedGroupIndex >= 0 && (
        <Box
          as={ motion.nav }
          w="100%"
          mt={ 6 }
          position="absolute"
          top={ 0 }
          style={{ x: subX }}
          key="sub"
        >
          <Flex alignItems="center" px={ 3 } py={ 2.5 } w="100%" h="50px" onClick={ onGroupItemClose } mb={ 1 }>
            <Icon as={ chevronIcon } boxSize={ 6 } mr={ 2 } color={ iconColor }/>
            <Text variant="secondary" fontSize="sm">{ mainNavItems[openedGroupIndex].text }</Text>
          </Flex>
          <Box
            w="100%"
            as="ul"
          >
            { isGroupItem(openedItem) && Object.entries(groupMenuItems(openedItem.subItems))?.map(([ groupName, groupItems ], groupIndex) => (
              <Box key={ groupIndex } w="100%">
                { groupName !== 'Ungrouped' && (
                  <Box position="relative" my={ 6 } px={ 1 }>
                    <Divider/>
                    <Text
                      bg={ dividerColor }
                      display="inline-block"
                      whiteSpace="nowrap"
                      position="absolute"
                      variant="secondary"
                      fontSize="sm"
                      top="-1"
                      mt="-2"
                      px={ 2 }
                    >
                      { groupName }
                    </Text>
                  </Box>
                ) }
                <Box
                  as="ul"
                  _notLast={{
                    mb: 2,
                    pb: 2,
                    borderBottomWidth: '1px',
                    borderColor: 'divider',
                  }}
                >
                  { groupItems.map(item => (
                    <NavLink key={ item.text } item={ item } isCollapsed={ false }/>
                  )) }
                </Box>
              </Box>
            )) }
          </Box>
        </Box>
      ) }
    </Flex>
  );
};

export default NavigationMobile;
