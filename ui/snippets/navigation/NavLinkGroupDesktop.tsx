import {
  Icon,
  Text,
  HStack,
  Box,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  VStack,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

import type { NavGroupItem } from 'types/client/navigation-items';

import chevronIcon from 'icons/arrows/east-mini.svg';
import groupMenuItems from 'lib/groupMenuItems';

import NavLink from './NavLink';
import NavLinkIcon from './NavLinkIcon';
import useNavLinkStyleProps from './useNavLinkStyleProps';

type Props = {
  item: NavGroupItem;
  isCollapsed?: boolean;
}

const NavLinkGroupDesktop = ({ item, isCollapsed }: Props) => {
  const isExpanded = isCollapsed === false;

  const styleProps = useNavLinkStyleProps({ isCollapsed, isExpanded, isActive: item.isActive });
  {/* JFIN Mod Start */ }
  const dividerColor = useColorModeValue('white', 'gray.900');
  const groupedItems = groupMenuItems(item.subItems);
  {/* JFIN Mod End */}

  return (
    <Box as="li" listStyleType="none" w="100%">
      <Popover
        trigger="hover"
        placement="right-start"
        isLazy
      >
        <PopoverTrigger>
          <Link
            { ...styleProps.itemProps }
            w={{ lg: isExpanded ? '180px' : '60px', xl: isCollapsed ? '60px' : '180px' }}
            pl={{ lg: isExpanded ? 3 : '15px', xl: isCollapsed ? '15px' : 3 }}
            pr={{ lg: isExpanded ? 0 : '15px', xl: isCollapsed ? '15px' : 0 }}
            aria-label={ `${ item.text } link group` }
            position="relative"
          >
            <HStack spacing={ 3 } overflow="hidden">
              <NavLinkIcon item={ item }/>
              <Text
                { ...styleProps.textProps }
              >
                { item.text }
              </Text>
              <Icon
                as={ chevronIcon }
                position="absolute"
                right="7px"
                transform="rotate(180deg)"
                boxSize={ 6 }
                opacity={{ lg: isExpanded ? '1' : '0', xl: isCollapsed ? '0' : '1' }}
                transitionProperty="opacity"
                transitionDuration="normal"
                transitionTimingFunction="ease"
              />
            </HStack>
          </Link>
        </PopoverTrigger>
        <PopoverContent width="264px" top={{ lg: isExpanded ? '-16px' : 0, xl: isCollapsed ? 0 : '-16px' }}>
          <PopoverBody p={ 4 }>
            <Text variant="secondary" fontSize="sm" mb={ 2 } display={{ lg: isExpanded ? 'none' : 'block', xl: isCollapsed ? 'block' : 'none' }}>
              { item.text }
            </Text>
            <VStack spacing={ 1 } alignItems="start">
              { /* JFIN Mod Start */ }
              { Object.entries(groupedItems).map(([ groupName, groupItems ], groupIndex) => (
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
                        fontSize="xs"
                        top="-9px"
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
              { /* JFIN Mod End */ }
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default NavLinkGroupDesktop;
