const semanticTokens = {
  colors: {
    divider: {
      'default': 'blackAlpha.200',
      _dark: 'whiteAlpha.200',
    },
    text: {
      'default': 'blackAlpha.800',
      _dark: 'whiteAlpha.800',
    },
    text_secondary: {
      'default': 'gray.500',
      _dark: 'gray.400',
    },
    link: {

      /* JFIN Mod Start */
      'default': 'red.600',

      /* JFIN Mod End */
      _dark: 'red.300',
    },
    link_hovered: {

      /* JFIN Mod Start */
      'default': 'red.800',

      /* JFIN Mod End */
    },
    error: {
      'default': 'red.400',
      _dark: 'red.300',
    },
  },
  shadows: {
    action_bar: '0 4px 4px -4px rgb(0 0 0 / 10%), 0 2px 4px -4px rgb(0 0 0 / 6%)',
  },
};

export default semanticTokens;
