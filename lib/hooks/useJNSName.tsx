/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getName = async(address: string): Promise<string> => {
  try {
    const { data } = await axios.get<string>(`https://jns-bridge-testnet.jfin.workers.dev/get-name/${ address }`);
    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch name for address ${ address }: ${ error.message }`);
  }
};

const getNames = async(addresses: Array<string>): Promise<Array<string>> => {
  try {
    const { data } = await axios.post<Array<string>>('https://jns-bridge-testnet.jfin.workers.dev/get-names', { addresses });
    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch names: ${ error.message }`);
  }
};

const useJNSName = (addresses: string | Array<string>, disabled = false): any => {
  const addressList = Array.isArray(addresses) ? addresses : [ addresses ];

  const shouldFetch = !disabled && addressList.length > 0 && addressList.every(address => address !== '' && address !== undefined);

  const query = useQuery<string | Array<string>, unknown>(
    [ 'jnsName', ...addressList ],
    () => Array.isArray(addresses) ? getNames(addressList) : getName(addressList[0]),
    {
      enabled: shouldFetch,
    },
  );

  return {
    names: [ query.data ] as any,
    isLoading: shouldFetch ? query.isLoading : false,
    isError: shouldFetch ? query.isError : false,
    errors: shouldFetch ? query.error : [],
  };
};

export default useJNSName;
