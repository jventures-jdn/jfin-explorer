// JNS Mod Start
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { isAddress } from 'viem';

import { getEnvValue } from 'configs/app/utils';

interface JNSName {
  address: string;
  name: string;
}

const JNS_API_HOST = getEnvValue('NEXT_PUBLIC_JNS_API_HOST');

const instance = axios.create({
  baseURL: JNS_API_HOST,
  timeout: 3000,
});

const fetchJNSNames = async(addresses: Array<string>): Promise<Array<JNSName>> => {
  const uniqueAddresses = Array.from(new Set(addresses));

  try {
    const response = await instance.post<Array<string>>('/get-names', { addresses: uniqueAddresses });
    return uniqueAddresses.map((address, index) => ({
      address,
      name: response.data[index],
    }));
  } catch (error) {
    throw new Error('Failed to fetch JNS names');
  }
};

const fetchJNSAddresses = async(names: Array<string>): Promise<Array<JNSName>> => {
  const uniqueNames = Array.from(new Set(names)).map(name => name.endsWith('.jfin') ? name : name + '.jfin');

  try {
    const response = await instance.post<Array<string>>('/get-addresses', { names: uniqueNames });
    return uniqueNames.map((name, index) => ({
      address: response.data[index],
      name,
    }));
  } catch (error) {
    throw new Error('Failed to fetch JNS addresses');
  }
};

const useJNSName = (data: Array<string> = []) => {
  const [ previousAddresses, setPreviousAddresses ] = useState<Array<string>>([]);
  const [ result, setResult ] = useState<Array<JNSName>>([]);

  const shouldFetchData = data.length > 0 && data.at(0) !== '' && JSON.stringify(data) !== JSON.stringify(previousAddresses);

  const isAddresses = data.every(item => isAddress(item));

  const { isLoading, isError } = useQuery<Array<JNSName>, Error>(
    [ 'jnsNames', data ],
    () => isAddresses ? fetchJNSNames(data) : fetchJNSAddresses(data),
    {

      enabled: shouldFetchData,
      onSuccess: (_result) => {
        setPreviousAddresses(data);
        setResult((prevNames) => [ ...prevNames, ..._result ]);
      },
      keepPreviousData: true,
    },
  );

  return {
    result,
    isLoading,
    isError,
  };
};

export default useJNSName;
// JNS Mod End
