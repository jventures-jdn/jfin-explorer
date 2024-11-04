/* JFIN Mod Start */
import React from 'react';

import config from 'configs/app';
import useToast from 'lib/hooks/useToast';
import * as mixpanel from 'lib/mixpanel/index';
import useAddOrSwitchChain from 'lib/web3/useAddOrSwitchChain';
import useProvider from 'lib/web3/useProvider';

const feature = config.features.web3Wallet;

const NetworkAddToWallet = () => {
  const toast = useToast();
  const { provider, wallet } = useProvider();
  const addOrSwitchChain = useAddOrSwitchChain();

  const handleClick = React.useCallback(async() => {
    if (!wallet || !provider) {
      return;
    }

    try {
      await addOrSwitchChain();

      toast({
        position: 'top-right',
        title: 'Success',
        description: 'Successfully added network to your wallet',
        status: 'success',
        variant: 'subtle',
        isClosable: true,
      });

      mixpanel.logEvent(mixpanel.EventTypes.ADD_TO_WALLET, {
        Target: 'network',
        Wallet: wallet,
      });

    } catch (error) {
      toast({
        position: 'top-right',
        title: 'Error',
        description: (error as Error)?.message || 'Something went wrong',
        status: 'error',
        variant: 'subtle',
        isClosable: true,
      });
    }
  }, [ addOrSwitchChain, provider, toast, wallet ]);

  if (!provider || !wallet || !config.chain.rpcUrl || !feature.isEnabled) {
    return null;
  }

  return (
    <span onClick={ handleClick }>
        Add { config.chain.name }
    </span>
  );
};

export default React.memo(NetworkAddToWallet);

/* JFIN Mod End */
