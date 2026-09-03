// JFIN Mod Start
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import type { TokenInstance } from 'types/api/token';

import { getEnvValue } from 'configs/app/utils';
import { TOKEN_INSTANCE } from 'stubs/token';

const JNS_METADATA_HOST = getEnvValue('NEXT_PUBLIC_JNS_METADATA_HOST');
const JNS_NAMEWRAPPER_ADDRESS = getEnvValue('NEXT_PUBLIC_JNS_NAMEWRAPPER_ADDRESS');

const instance = axios.create({
  baseURL: JNS_METADATA_HOST,
  timeout: 3000,
});

const fetchJNSMetadata = async(contractAddress?: string, tokenId?: string) => {
  if (!contractAddress || contractAddress !== JNS_NAMEWRAPPER_ADDRESS || !tokenId) {
    return null;
  }
  try {
    const response = await instance.get(`/name/${ tokenId }`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch JNS metadata');
  }
};

const useJNSMetadata = (contractAddress?: string, tokenId?: string) => {
  const query = useQuery<TokenInstance['metadata']>([ 'jnsMetadata' ], () => fetchJNSMetadata(contractAddress, tokenId), {
    enabled: Boolean(contractAddress && tokenId),
    placeholderData: TOKEN_INSTANCE.metadata,
  });
  return query;
};

export default useJNSMetadata;
// JFIN Mod End
