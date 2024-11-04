import type CspDev from 'csp-dev';

export function coinMarketcap(): CspDev.DirectiveDescriptor {
  return {
    'script-src': [
      'files.coinmarketcap.com',
      'ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js',
    ],
    'connect-src': [
      '*.coinmarketcap.com',
    ],
  };
}
