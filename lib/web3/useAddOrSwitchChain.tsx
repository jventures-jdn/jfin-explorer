import React from 'react';

import type { NetworkProfile } from 'types/client/networkProfiles';

import config from 'configs/app';
import getErrorObj from 'lib/errors/getErrorObj';

import useProvider from './useProvider';

/* JFIN Mod Start */
export default function useAddOrSwitchChain(networkProfile?: NetworkProfile) {
  const { wallet, provider } = useProvider();

  return React.useCallback(async() => {
    if (!wallet || !provider) {
      return;
    }

    const hexadecimalChainId = '0x' + Number(networkProfile?.chainId || config.chain.id).toString(16);

    try {
      return await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [ { chainId: hexadecimalChainId } ],
      });
    } catch (error) {

      const errorObj = getErrorObj(error);
      const code = errorObj && 'code' in errorObj ? errorObj.code : undefined;

      // This error code indicates that the chain has not been added to Wallet.
      if (code === 4902) {
        const params = [ {
          chainId: hexadecimalChainId,
          chainName: networkProfile?.name || config.chain.name,
          nativeCurrency: {
            name: networkProfile?.token || config.chain.currency.name,
            symbol: networkProfile?.token || config.chain.currency.symbol,
            decimals: config.chain.currency.decimals,
          },
          rpcUrls: [ networkProfile?.rpc || config.chain.rpcUrl ],
          blockExplorerUrls: [ networkProfile?.explorerUrl || config.app.baseUrl ],
        } ] as never;
        // in wagmi types for wallet_addEthereumChain method is not provided
        // eslint-disable-next-line @typescript-eslint/no-explicit-any

        return await provider.request({
          method: 'wallet_addEthereumChain',
          params: params,
        });
      }

      throw error;
    }
  }, [ networkProfile, provider, wallet ]);
}

/* JFIN Mod End */
