import { Box, Flex, Icon, Text, Image, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import type { FeaturedNetwork } from 'types/networks';

import checkIcon from 'icons/check.svg';
import placeholderIcon from 'icons/networks/icon-placeholder.svg';

import useColors from './useColors';

interface Props extends FeaturedNetwork {
  isActive?: boolean;
  isMobile?: boolean;
}

const NetworkMenuLink = ({ title, icon, isActive, isMobile, url, invertIconInDarkMode }: Props) => {
  const colors = useColors();
  const darkModeFilter = { filter: 'brightness(0) invert(1)' };
  const style = useColorModeValue({}, invertIconInDarkMode ? darkModeFilter : {});
  const itemHoverStyle = useColorModeValue({ bgColor: 'gray.100' }, { bgColor: 'gray.700' });

  const iconEl = icon ? (
    <Image w="30px" h="30px" src={ icon } alt={ `${ title } network icon` } style={ style }/>
  ) : (
    <Icon
      as={ placeholderIcon }
      boxSize="30px"
      color={ colors.iconPlaceholder.default }
    />
  );

  return (
    <Box as="li" listStyleType="none">
      <Flex
        as="a"
        href={ url }
        direction={ isMobile ? 'row' : 'column' }
        px={ isMobile ? 3 : 0 }
        py={ isMobile ? 2 : 2 }
        justifyItems="center"
        alignItems="center"
        cursor="pointer"
        height="100%"
        pointerEvents={ isActive ? 'none' : 'initial' }
        borderRadius="base"
        color={ isActive ? colors.text.active : colors.text.default }
        bgColor={ isActive ? colors.bg.active : colors.bg.default }
        _hover={{ color: isActive ? colors.text.active : colors.text.default, ...itemHoverStyle }}
      >
        { iconEl }
        <Text
          fontWeight="500"
          color="inherit"
          fontSize="sm"
          lineHeight={ isMobile ? '20px' : '24px' }
          textAlign={ isMobile ? 'left' : 'center' }
        >
          { title }
        </Text>
        { isActive && (
          <Icon
            as={ checkIcon }
            boxSize="24px"
            marginLeft="auto"
          />
        ) }
      </Flex>
    </Box>
  );
};

export default React.memo(NetworkMenuLink);
