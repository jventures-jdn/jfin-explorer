// JNS Mod Start
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useMemo } from 'react';
import { isAddress } from 'viem';

import { getEnvValue } from 'configs/app/utils';
import validatorWallets from 'configs/app/validatorWallets';

interface JNSName {
  address: string;
  name: string | null;
}

const JNS_API_HOST = getEnvValue('NEXT_PUBLIC_JNS_API_HOST');

const instance = axios.create({
  baseURL: JNS_API_HOST,
  timeout: 3000,
});

const ignoredAddresses = [ ...Object.keys(validatorWallets), '0x0000000000000000000000000000000000000000' ];

async function fetchJNSNames(addresses: Array<string>): Promise<Array<JNSName>> {
  const uniqueAddresses = Array.from(new Set(addresses)).filter(address => !ignoredAddresses.includes(address));
  if (uniqueAddresses.length === 0) {
    return [];
  }
  try {
    const response = await instance.post<Array<string>>('/get-names', { addresses: uniqueAddresses });
    return uniqueAddresses.map((address, index) => ({
      address,
      name: response.data[index] || null,
    })).filter(jnsName => jnsName.name !== null && jnsName.name !== undefined);
  } catch (error) {
    throw new Error('Failed to fetch JNS names');
  }
}

async function fetchJNSAddresses(names: Array<string>): Promise<Array<JNSName>> {
  const uniqueNames = Array.from(new Set(names)).map(name => name.endsWith('.jfin') ? name : isAddress(name) ? name : `${ name }.jfin`);
  if (uniqueNames.length === 0) {
    return [];
  }
  try {
    const response = await instance.post<Array<string>>('/get-addresses', { names: uniqueNames });
    return uniqueNames.map((name, index) => ({
      address: response.data[index],
      name: name || null,
    })).filter(jnsName => jnsName.name !== null && jnsName.name !== undefined);
  } catch (error) {
    throw new Error('Failed to fetch JNS addresses');
  }
}

function useJNSName(payload: Array<string> = []) {
  const queryKey = useMemo(() => [ 'jnsNames', payload ], [ JSON.stringify(payload) ]);
  const queryClient = useQueryClient();

  const fetchQueryData = () => {
    const existingData = queryClient.getQueryData<Array<JNSName>>(queryKey);
    const missingData = payload.filter(p => !existingData?.find(d => d.address === p || d.name === p));
    if (missingData.length === 0) {
      return Promise.resolve(existingData!);
    }
    return payload.every(isAddress) ? fetchJNSNames(missingData) : fetchJNSAddresses(missingData);
  };

  const queryInfo = useQuery<Array<JNSName>, Error>(
    queryKey,
    fetchQueryData,
    {
      enabled: payload.length > 0 && payload[0] !== '',
      keepPreviousData: true,
    },
  );

  return queryInfo;
}

export default useJNSName;
// JNS Mod End
