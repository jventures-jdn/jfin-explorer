{/* JFIN Mod Start */ }
import { Flex, chakra, useColorModeValue, useToken } from '@chakra-ui/react';
import React from 'react';

const CoinMarketCapWidget = () => {
  const linkColor = useToken('colors', 'purple.200');
  const borderColor = useToken('colors', 'divider');
  const fontFamily = useToken('fonts', 'fonts.body');
  const bgColor = useColorModeValue('white', 'black');

  React.useEffect(() => {
    const widgetContainer = document.getElementById('coinmarket-widget');
    const widget = document.getElementById('coinmarketcap-currency-widget');
    if (!widget || !widgetContainer) {
      return;
    }

    widgetContainer.appendChild(widget);
  }, [ borderColor, fontFamily, linkColor ]);
  return (
    <Flex
      borderRadius="md"
      boxShadow="md"
      justifyContent="center"
      alignItems="center"
      bgColor={ bgColor }
      sx={{
        a: {
          color: `${ linkColor }!important`,
          fontWeight: 'bold!important',
        },
        '.coinmarketcap-currency-widget > div': {
          fontFamily: `${ fontFamily }!important`,
          border: '0!important',
        },
        '.coinmarketcap-currency-widget > div > div:not(:first-child)': {
          borderTop: `1px solid ${ borderColor }!important`,
        },
        '.coinmarketcap-currency-widget > div > div:nth-child(2) > div': {
          borderColor: `${ borderColor }!important`,
        },
      }}
    >
      <div id="coinmarket-widget" style={{ width: '100%' }}/>
    </Flex>
  );
};

export default chakra(CoinMarketCapWidget);
{/* JFIN Mod End */ }
