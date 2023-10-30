import { Box, Text, chakra } from '@chakra-ui/react';
import React from 'react';

import type { NetworkProfile } from 'types/client/networkProfiles';

import CopyToClipboard from 'ui/shared/CopyToClipboard';
import NetworkAddToWallet from 'ui/shared/NetworkAddToWallet';

type Props = {
  profile: NetworkProfile;
}

const NetworkProfileMobile = ({ profile }: Props) => {
  return (
    <Box mb={ 6 }>
      <Box mb={ 4 }>
        <Text fontWeight="bold">
          Network name
        </Text>
        <Text>
          { profile.name }
          <CopyToClipboard text={ profile.name }/>
        </Text>
      </Box>
      <Box mb={ 4 }>
        <Text fontWeight="bold">
          Token
        </Text>
        <Text>
          { profile.token }
          <CopyToClipboard text={ profile.token }/>
        </Text>
      </Box>
      <Box mb={ 4 }>
        <Text fontWeight="bold">
          RPC
        </Text>
        <Text>
          { profile.rpc }
          <CopyToClipboard text={ profile.rpc }/>
        </Text>
      </Box>
      <Box mb={ 4 }>
        <Text fontWeight="bold">
          Chain ID
        </Text>
        <Text>
          { profile.chainId }
          <CopyToClipboard text={ profile.chainId }/>
        </Text>
      </Box>
      <Box mb={ 4 }>
        <Text fontWeight="bold">
          Block explorer
        </Text>
        <Text>
          { profile.explorerUrl }
          <CopyToClipboard text={ profile.explorerUrl }/>
        </Text>
      </Box>
      <Box mb={ 4 }>
        <Text fontWeight="bold">
          Website
        </Text>
        <Text>
          { profile.websiteUrl }
          <CopyToClipboard text={ profile.websiteUrl }/>
        </Text>
      </Box>
      <NetworkAddToWallet networkProfile={ profile }/>
    </Box>
  );
};

export default chakra(NetworkProfileMobile);
