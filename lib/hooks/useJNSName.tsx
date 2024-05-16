// JFIN Mod Start
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { isAddress } from 'viem';

import { getEnvValue } from 'configs/app/utils';
import validatorWallets from 'configs/app/validatorWallets';
import { ADDRESS_HASH } from 'stubs/addressParams';

interface JNSName {
  address: string | null;
  name: string | null;
}

const JNS_API_HOST = getEnvValue('NEXT_PUBLIC_JNS_API_HOST');

const instance = axios.create({
  baseURL: JNS_API_HOST,
  timeout: 3000,
});

const ignoredAddresses = [
  ...Object.keys(validatorWallets),
  ADDRESS_HASH,
  '0x0000000000000000000000000000000000000000',
];

async function fetchJNSNames(addresses: Array<string>): Promise<Array<JNSName>> {
  const uniqueAddresses = Array.from(new Set(addresses)).filter(address => !ignoredAddresses.includes(address));
  if (uniqueAddresses.length === 0) {
    return [];
  }
  try {
    const responses = await Promise.all(
      uniqueAddresses.map(address =>
        instance.get<string>(`/get-name/${ address }`).then(response => ({
          address,
          name: response.data || null,
        })).catch((error: AxiosError) => {
          if (error.response?.status === 404) {
            return { address, name: null };
          }
          return { address: null, name: null };
        }),
      ),
    );

    return responses.filter(jnsName => jnsName.name !== null && jnsName.name !== undefined);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch JNS names');
  }
}

async function fetchJNSAddresses(names: Array<string>): Promise<Array<JNSName>> {
  const uniqueNames = Array.from(new Set(names)).map(name =>
    name.endsWith('.jfin') ? name : isAddress(name) ? name : `${ name }.jfin`,
  );
  if (uniqueNames.length === 0) {
    return [];
  }
  try {
    const responses = await Promise.all(
      uniqueNames.map(name =>
        instance.get<string>(`/get-address/${ name }`).then(response => ({
          address: response.data || null,
          name,
        })).catch((error: AxiosError) => {
          if (error.response?.status === 404) {
            return { address: null, name };
          }
          return { address: null, name: null };
        }),
      ),
    );

    return responses.filter(jnsName => jnsName?.address !== null && jnsName?.address !== undefined);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch JNS addresses');
  }
}

function useJNSName(payload: Array<string> = []) {
  const queryKey = [ 'jnsNames', payload ];
  const queryClient = useQueryClient();

  const fetchQueryData = async() => {
    const existingData = queryClient.getQueryData<Array<JNSName>>(queryKey) || [];
    const missingData = payload.filter(p => p !== '' && !existingData?.find(d => d.address === p || d.name === p));

    if (missingData.length === 0) {
      return existingData;
    }

    const addresses = missingData.filter(isAddress);
    const names = missingData.filter(p => !isAddress(p));

    const fetchedAddresses = addresses.length ? await fetchJNSNames(addresses) : [];
    const fetchedNames = names.length ? await fetchJNSAddresses(names) : [];

    const fetchedData = [ ...fetchedAddresses, ...fetchedNames ];
    const newData = [ ...existingData, ...fetchedData ].filter((item, index, self) =>
      index === self.findIndex((t) => (t.address === item.address && t.name === item.name)),
    );

    return newData;
  };

  const queryInfo = useQuery<Array<JNSName>, Error>(
    queryKey,
    fetchQueryData,
    {
      enabled: payload.length > 0 && payload[0] !== '',
      keepPreviousData: true,
      onSuccess: (data) => {
        const existingData = queryClient.getQueryData<Array<JNSName>>(queryKey) || [];
        const newData = [ ...existingData, ...data ].filter((item, index, self) =>
          index === self.findIndex((t) => (t.address === item.address && t.name === item.name)),
        );
        queryClient.setQueryData(queryKey, newData);
      },
    },
  );

  return queryInfo;
}

export default useJNSName;
// JFIN Mod End
