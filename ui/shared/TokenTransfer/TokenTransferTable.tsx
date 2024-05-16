import { Table, Tbody, Tr, Th } from '@chakra-ui/react';
import React from 'react';

import type { TokenTransfer } from 'types/api/tokenTransfer';

import useJNSName from 'lib/hooks/useJNSName';
import * as SocketNewItemsNotice from 'ui/shared/SocketNewItemsNotice';
import { default as Thead } from 'ui/shared/TheadSticky';
import TokenTransferTableItem from 'ui/shared/TokenTransfer/TokenTransferTableItem';

interface Props {
  data: Array<TokenTransfer>;
  baseAddress?: string;
  showTxInfo?: boolean;
  top: number;
  enableTimeIncrement?: boolean;
  showSocketInfo?: boolean;
  socketInfoAlert?: string;
  socketInfoNum?: number;
  isLoading?: boolean;
}

const TokenTransferTable = ({
  data,
  baseAddress,
  showTxInfo,
  top,
  enableTimeIncrement,
  showSocketInfo,
  socketInfoAlert,
  socketInfoNum,
  isLoading,
}: Props) => {
  // JNS Mod Start
  const addressesFrom = data?.map(item => item.from.hash) || [];
  const addressesTo = data?.map(item => item.to?.hash) || [];

  const allAddresses = [ ...addressesFrom, ...addressesTo ];

  const { data: jnsData } = useJNSName(allAddresses);

  const dataWithJNSName = data?.map(item => ({
    ...item,
    to: {
      ...item.to,
      name: jnsData?.find(name => name.address === item.to?.hash)?.name || null,
    },
    from: {
      ...item.from,
      name: jnsData?.find(name => name.address === item.from.hash)?.name || null,
    },
  }));

  return (
    <Table variant="simple" size="sm" minW="950px">
      <Thead top={ top }>
        <Tr>
          { showTxInfo && <Th width="44px"></Th> }
          <Th width="185px">Token</Th>
          <Th width="160px">Token ID</Th>
          { showTxInfo && <Th width="25%">Txn hash</Th> }
          <Th width="25%">From</Th>
          { baseAddress && <Th width="50px" px={ 0 }/> }
          <Th width="25%">To</Th>
          <Th width="25%" isNumeric>Value</Th>
        </Tr>
      </Thead>
      <Tbody>
        { showSocketInfo && (
          <SocketNewItemsNotice.Desktop
            url={ window.location.href }
            alert={ socketInfoAlert }
            num={ socketInfoNum }
            type="token_transfer"
            isLoading={ isLoading }
          />
        ) }
        { dataWithJNSName.map((item, index) => (
          <TokenTransferTableItem
            key={ item.tx_hash + item.block_hash + item.log_index + (isLoading ? index : '') }
            { ...item }
            baseAddress={ baseAddress }
            showTxInfo={ showTxInfo }
            enableTimeIncrement={ enableTimeIncrement }
            isLoading={ isLoading }
          />
        )) }
      </Tbody>
    </Table>
  );
};
// JNS Mod End

export default React.memo(TokenTransferTable);
