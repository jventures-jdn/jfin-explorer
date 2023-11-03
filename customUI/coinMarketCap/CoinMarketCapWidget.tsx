{/* JFIN Mod Start */ }
import { Flex, chakra, useColorModeValue, useToken } from '@chakra-ui/react';
import React from 'react';

const CoinMarketCapWidget = () => {
  const linkColor = useToken('colors', 'purple.200');
  const borderColor = useToken('colors', 'divider');
  const fontFamily = useToken('fonts', 'fonts.body');
  const bgColor = useColorModeValue('white', 'black');

  const applyBorderColor = (element: HTMLElement, newColor: string) => {
    const style = window.getComputedStyle(element);
    const borderValue = '1px solid rgb(225, 229, 234)'; // #e1e5ea in RGB
    if ([ style.borderTop, style.borderRight ].includes(borderValue)) {
      element.style.borderColor = newColor;
    }
  };

  React.useEffect(() => {
    const widgetContainer = document.getElementById('coinmarket-widget');
    const widget = document.getElementById('coinmarketcap-currency-widget');
    if (!widget || !widgetContainer) {
      return;
    }

    const links = widget.getElementsByTagName('a');
    for (const link of links) {
      link.style.color = linkColor;
      link.style.fontWeight = 'bold';
    }

    const firstChild = widget.getElementsByTagName('div')[0];
    if (firstChild) {
      firstChild.style.fontFamily = fontFamily;
      firstChild.style.borderWidth = '0';
    }

    widget.querySelectorAll('*').forEach(el => {
      if (el instanceof HTMLElement) {
        applyBorderColor(el, borderColor);
      }
    });

    widgetContainer.appendChild(widget);
  }, [ borderColor, fontFamily, linkColor ]);
  return (
    <Flex
      borderRadius="md"
      boxShadow="md"
      justifyContent="center"
      alignItems="center"
      bgColor={ bgColor }
    >
      <div id="coinmarket-widget" style={{ width: '100%' }}/>
    </Flex>
  );
};

export default chakra(CoinMarketCapWidget);
{/* JFIN Mod Start */ }
