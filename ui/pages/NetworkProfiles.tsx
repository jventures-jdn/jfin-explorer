/* JFIN Mod Start */
import { Box, Heading, Link, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';

import type { NetworkProfiles } from 'types/client/networkProfiles';

import CopyToClipboard from 'ui/shared/CopyToClipboard';
import NetworkAddToWallet from 'ui/shared/NetworkAddToWallet';
import PageTitle from 'ui/shared/Page/PageTitle';

const NETWORK_PROFILES: NetworkProfiles = {
  mainnet: {
    name: 'JFIN Chain',
    token: 'JFIN',
    rpc: 'https://rpc.jfinchain.com',
    chainId: '3501',
    explorerUrl: 'https://exp.jfinchain.com',
    websiteUrl: 'https://jfinchain.com',
  },
  testnet: {
    name: 'JFIN Chain Testnet',
    token: 'JFIN',
    rpc: 'https://rpc.testnet.jfinchain.com',
    chainId: '3502',
    explorerUrl: 'https://exp.testnet.jfinchain.com',
    websiteUrl: 'https://jfinchain.com/',
  },
};

const NetworkProfile = () => {
  return (
    <>
      <PageTitle title="Network Profiles"/>
      { Object.keys(NETWORK_PROFILES).map((network) => {
        const networkProfile = NETWORK_PROFILES[network];
        return (
          <Box mb={{ base: 6 }} key={ network }>
            <Box display="flex" justifyContent="space-between">
              <Heading size="sm" as="h2" mb="4" fontWeight="semibold">{ networkProfile.name }</Heading>
              <NetworkAddToWallet networkProfile={ networkProfile }/>
            </Box>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Attribute</Th>
                    <Th>Details</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td fontWeight="bold">Network name</Td>
                    <Td>
                      { networkProfile.name }
                      <CopyToClipboard text={ networkProfile.name }/>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Token</Td>
                    <Td>
                      { networkProfile.token }
                      <CopyToClipboard text={ networkProfile.token }/>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">RPC</Td>
                    <Td>
                      <Link href={ networkProfile.rpc } target="_blank">
                        { networkProfile.rpc }
                      </Link>
                      <CopyToClipboard text={ networkProfile.rpc }/>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Chain ID</Td>
                    <Td>
                      { networkProfile.chainId }
                      <CopyToClipboard text={ networkProfile.chainId }/>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Block explorer</Td>
                    <Td>
                      <Link href={ networkProfile.explorerUrl } target="_blank">
                        { networkProfile.explorerUrl }
                      </Link>
                      <CopyToClipboard text={ networkProfile.explorerUrl }/>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Website</Td>
                    <Td>
                      <Link href={ networkProfile.websiteUrl } target="_blank">
                        { networkProfile.websiteUrl }
                      </Link>
                      <CopyToClipboard text={ networkProfile.websiteUrl }/>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        );
      }) }
    </>
  );
};

export default NetworkProfile;

/* JFIN Mod End */
