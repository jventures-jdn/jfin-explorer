import { useColorModeValue } from '@chakra-ui/react';

export default function useColors() {
  return {

    /* JFIN Mod Start */
    text: {
      'default': useColorModeValue('gray.600', 'gray.400'),
      active: useColorModeValue('red.700', 'gray.50'),
      hover: 'link_hovered',
    },
    bg: {
      'default': 'transparent',
      active: useColorModeValue('red.50', 'gray.800'),
    },
    border: {
      'default': 'divider',
      active: useColorModeValue('red.50', 'gray.800'),
    },

    /* JFIN Mod End */
  };
}
