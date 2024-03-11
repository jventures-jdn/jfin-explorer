import { Grid } from '@chakra-ui/react';
import React from 'react';

import useApiQuery from 'lib/api/useApiQuery';
import { STATS_COUNTER } from 'stubs/stats';

import DataFetchAlert from '../shared/DataFetchAlert';
import NumberWidget from './NumberWidget';

const NumberWidgetsList = () => {
  const { data, isPlaceholderData, isError } = useApiQuery('stats_counters', {
    queryOptions: {
      placeholderData: { counters: Array(10).fill(STATS_COUNTER) },
    },
  });

  if (isError) {
    return <DataFetchAlert/>;
  }

  // JFIN Mod Start
  const modifiedData = data ? { ...data } : null;
  if (modifiedData && modifiedData.counters) {
    const averageBlockTimeIndex = modifiedData.counters.findIndex(counter => counter.id === 'averageBlockTime');
    if (averageBlockTimeIndex !== -1) {
      modifiedData.counters[averageBlockTimeIndex].value = '3.00';
    }
  }

  return (
    <Grid
      gridTemplateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
      gridGap={ 4 }
    >
      {
        modifiedData?.counters?.map(({ id, title, value, units, description }, index) => {
          return (
            <NumberWidget
              key={ id + (isPlaceholderData ? index : '') }
              label={ title }
              value={ `${ Number(value).toLocaleString(undefined, { maximumFractionDigits: 3, notation: 'compact' }) } ${ units ? units : '' }` }
              isLoading={ isPlaceholderData }
              description={ description }
            />
          );
        })
      }
    </Grid>
  );
};
// JFIN Mod End

export default NumberWidgetsList;
