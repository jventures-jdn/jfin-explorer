/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid } from '@chakra-ui/react';
import React from 'react';

import useIsMobile from 'lib/hooks/useIsMobile';
import useJNSName from 'lib/hooks/useJNSName';
import ActionBar from 'ui/shared/ActionBar';
import DataListDisplay from 'ui/shared/DataListDisplay';
import Pagination from 'ui/shared/pagination/Pagination';
import type { QueryWithPagesResult } from 'ui/shared/pagination/useQueryWithPages';

import TokenInventoryItem from './TokenInventoryItem';

type Props = {
  inventoryQuery: QueryWithPagesResult<'token_inventory'>;
}

const TokenInventory = ({ inventoryQuery }: Props) => {
  const isMobile = useIsMobile();

  const actionBar = isMobile && inventoryQuery.pagination.isVisible && (
    <ActionBar mt={ -6 }>
      <Pagination ml="auto" { ...inventoryQuery.pagination }/>
    </ActionBar>
  );

  const items = inventoryQuery.data?.items;
  // JNS Mod Start
  const ownerAddresses = items?.map(item => item?.owner?.hash || '') || [];

  const { data } = useJNSName(ownerAddresses);

  const dataWithJNSName = items?.map(item => {
    return {
      ...item,
      owner: {
        ...item.owner,
        name: data?.find(name => name.address === item.owner?.hash)?.name || null,
      },
    };
  });

  const content = items ? (
    <Grid
      w="100%"
      columnGap={{ base: 3, lg: 6 }}
      rowGap={{ base: 3, lg: 6 }}
      gridTemplateColumns={{ base: 'repeat(2, calc((100% - 12px)/2))', lg: 'repeat(auto-fill, minmax(210px, 1fr))' }}
    >
      { dataWithJNSName?.map((item: any, index) => (
        <TokenInventoryItem
          key={ item.token.address + '_' + item.id + (inventoryQuery.isPlaceholderData ? '_' + index : '') }
          item={ item }
          isLoading={ inventoryQuery.isPlaceholderData }
        />
      )) }
    </Grid>
  ) : null;

  return (
    <DataListDisplay
      isError={ inventoryQuery.isError }
      items={ items }
      emptyText="There are no tokens."
      content={ content }
      actionBar={ actionBar }
    />
  );
};
// JNS Mod End
export default TokenInventory;
