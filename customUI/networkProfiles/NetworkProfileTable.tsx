/* JFIN Mod Start */
import { Box, Heading, Link, Table, TableContainer, Tbody, Td, Th, Thead, Tr, chakra } from '@chakra-ui/react';
import React from 'react';

import type { NetworkProfile } from 'types/client/networkProfiles';

import CopyToClipboard from 'ui/shared/CopyToClipboard';
import NetworkAddToWallet from 'ui/shared/NetworkAddToWallet';

type Props = {
  profile: NetworkProfile;
}

const NetworkProfileTable = ({ profile }: Props) => {
  return (
    <Box mb={{ base: 6 }}>
      <Box display="flex" justifyContent="space-between">
        <Heading size="md" as="h2" mb="4" fontWeight="semibold">{ profile.name } Profile</Heading>
        <NetworkAddToWallet networkProfile={ profile }/>
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
                { profile.name }
                <CopyToClipboard text={ profile.name }/>
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">RPC</Td>
              <Td>
                { profile.rpc }
                <CopyToClipboard text={ profile.rpc }/>
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Chain ID</Td>
              <Td>
                { profile.chainId }
                <CopyToClipboard text={ profile.chainId }/>
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Currency symbol</Td>
              <Td>
                { profile.token }
                <CopyToClipboard text={ profile.token }/>
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Block explorer URL</Td>
              <Td>
                <Link href={ profile.explorerUrl } target="_blank">
                  { profile.explorerUrl }
                </Link>
                <CopyToClipboard text={ profile.explorerUrl }/>
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Website</Td>
              <Td>
                <Link href={ profile.websiteUrl } target="_blank">
                  { profile.websiteUrl }
                </Link>
                <CopyToClipboard text={ profile.websiteUrl }/>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default chakra(NetworkProfileTable);

/* JFIN Mod End */
