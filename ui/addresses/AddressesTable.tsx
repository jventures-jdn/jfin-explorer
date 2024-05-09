import { Table, Tbody, Tr, Th } from '@chakra-ui/react';
import type BigNumber from 'bignumber.js';
import React from 'react';

import type { AddressesItem } from 'types/api/addresses';

import config from 'configs/app';
import { ZERO } from 'lib/consts';
import useJNSName from 'lib/hooks/useJNSName';
import { default as Thead } from 'ui/shared/TheadSticky';

import AddressesTableItem from './AddressesTableItem';

interface Props {
  items: Array<AddressesItem>;
  totalSupply: BigNumber;
  pageStartIndex: number;
  top: number;
  isLoading?: boolean;
}

const AddressesTable = ({ items, totalSupply, pageStartIndex, top, isLoading }: Props) => {
  // JNS Mod Start
  const ownerAddresses = items?.map(item => item?.hash || '') || [];

  const { data } = useJNSName(ownerAddresses);

  const dataWithJNSName = items?.map(item => {
    return {
      ...item,
      name: data?.find(name => name.address === item?.hash)?.name || null,
    };
  });

  const hasPercentage = !totalSupply.eq(ZERO);
  return (
    <Table variant="simple" size="sm">
      <Thead top={ top }>
        <Tr>
          <Th width="64px">Rank</Th>
          <Th width={ hasPercentage ? '30%' : '40%' }>Address</Th>
          <Th width="20%" pl={ 10 }>Public tag</Th>
          <Th width={ hasPercentage ? '20%' : '25%' } isNumeric>{ `Balance ${ config.chain.currency.symbol }` }</Th>
          { hasPercentage && <Th width="15%" isNumeric>Percentage</Th> }
          <Th width="15%" isNumeric>Txn count</Th>
        </Tr>
      </Thead>
      <Tbody>
        { dataWithJNSName.map((item, index) => (
          <AddressesTableItem
            key={ item.hash + (isLoading ? index : '') }
            item={ item }
            totalSupply={ totalSupply }
            index={ pageStartIndex + index }
            hasPercentage={ hasPercentage }
            isLoading={ isLoading }
          />
        )) }
      </Tbody>
    </Table>
  );
};
// JNS Mod End
export default AddressesTable;
