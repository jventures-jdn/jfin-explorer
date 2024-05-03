import type { UseQueryResult } from '@tanstack/react-query';
import React from 'react';

import type { TxsResponse } from 'types/api/transaction';
import type { Sort } from 'types/client/txs-sort';

import * as cookies from 'lib/cookies';
// JNS Mod Start
import useJNSName from 'lib/hooks/useJNSName';
import sortTxs from 'lib/tx/sortTxs';

type HookResult = UseQueryResult<TxsResponse> & {
  sorting: Sort;
  setSortByField: (field: 'val' | 'fee') => () => void;
  setSortByValue: (value: Sort | undefined) => void;
}

export default function useTxsSort(
  queryResult: UseQueryResult<TxsResponse>,
): HookResult {
  const addressesFrom = queryResult.data?.items.map(item => item.from.hash) || [];
  // JFIN Mod Start
  const addressesTo = queryResult.data?.items.map(item => item.to?.hash || '') || [];

  const allAddresses = [ ...addressesFrom, ...addressesTo ];

  const { result } = useJNSName(allAddresses);
  // JFIN Mod End
  const [ sorting, setSorting ] = React.useState<Sort>(cookies.get(cookies.NAMES.TXS_SORT) as Sort);

  const setSortByField = React.useCallback((field: 'val' | 'fee') => () => {
    if (queryResult.isPlaceholderData) {
      return;
    }

    setSorting((prevVal) => {
      let newVal: Sort = '';
      if (field === 'val') {
        if (prevVal === 'val-asc') {
          newVal = '';
        } else if (prevVal === 'val-desc') {
          newVal = 'val-asc';
        } else {
          newVal = 'val-desc';
        }
      }
      if (field === 'fee') {
        if (prevVal === 'fee-asc') {
          newVal = '';
        } else if (prevVal === 'fee-desc') {
          newVal = 'fee-asc';
        } else {
          newVal = 'fee-desc';
        }
      }
      cookies.set(cookies.NAMES.TXS_SORT, newVal);
      return newVal;
    });
  }, [ queryResult.isPlaceholderData ]);

  const setSortByValue = React.useCallback((value: Sort | undefined) => {
    setSorting((prevVal: Sort) => {
      let newVal: Sort = '';
      if (value !== prevVal) {
        newVal = value as Sort;
      }
      cookies.set(cookies.NAMES.TXS_SORT, newVal);
      return newVal;
    });
  }, []);

  return React.useMemo(() => {
    if (queryResult.isError || queryResult.isLoading) {
      return { ...queryResult, setSortByField, setSortByValue, sorting };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const queryResultWithJNSName: any = queryResult.data.items.slice().sort(sortTxs(sorting)).map(item => ({
      ...item,
      to: {
        ...item.to,
        name: result.find(name => name.address === item.to?.hash)?.name || null,
      },
      from: {
        ...item.from,
        name: result.find(name => name.address === item.from?.hash)?.name || null,
      },
    }));

    return {
      ...queryResult,
      data: { ...queryResult.data, items: queryResultWithJNSName },
      setSortByField,
      setSortByValue,
      sorting,
    };
  }, [ result, queryResult, setSortByField, setSortByValue, sorting ]);
  // JNS Mod End
}
