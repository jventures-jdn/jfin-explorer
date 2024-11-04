/* eslint-disable @typescript-eslint/no-explicit-any */
// JFIN Mod Start
import type { Abi, AbiFunction } from 'abitype';
import React from 'react';
import {
  useAccount,
  useWalletClient,
  useNetwork,
  useSwitchNetwork,
} from 'wagmi';

import type { SmartContractMethodBase, SmartContractWriteMethod } from 'types/api/contract';

import config from 'configs/app';
import useApiQuery from 'lib/api/useApiQuery';
import ContractMethodsAccordion from 'ui/address/contract/ContractMethodsAccordion';
import ContentLoader from 'ui/shared/ContentLoader';
import DataFetchAlert from 'ui/shared/DataFetchAlert';

import ContractConnectWallet from './ContractConnectWallet';
import ContractCustomAbiAlert from './ContractCustomAbiAlert';
import ContractImplementationAddress from './ContractImplementationAddress';
import ContractMethodCallable from './ContractMethodCallable';
import ContractWriteResult from './ContractWriteResult';
import useContractAbi from './useContractAbi';
import { getNativeCoinValue, prepareAbi } from './utils';

interface Props {
  addressHash?: string;
  isProxy?: boolean;
  isCustomAbi?: boolean;
}

const isArgumentValid = (inputType: string, arg: unknown): boolean => {
  if (arg === undefined || arg === null || arg === '') {
    return false;
  }
  if (inputType.startsWith('uint') || inputType.startsWith('int')) {
    return (
      typeof arg === 'number' ||
      typeof arg === 'bigint' ||
      (typeof arg === 'string' && !isNaN(Number(arg)))
    );
  } else if (inputType === 'address') {
    return (
      typeof arg === 'string' &&
      /^0x[a-fA-F\d]{40}$/.test(arg)
    );
  } else if (inputType.startsWith('bytes')) {
    return (
      typeof arg === 'string' &&
      /^0x[a-fA-F\d]*$/.test(arg)
    );
  } else if (inputType === 'bool') {
    return (
      typeof arg === 'boolean' ||
      arg === 'true' ||
      arg === 'false'
    );
  } else if (inputType.endsWith('[]')) {
    return Array.isArray(arg);
  }
  return true;
};

const findFunctionFragment = (
  abi: Abi,
  functionName: string,
  args: Array<unknown>,
): AbiFunction | null => {
  const functions = abi.filter(
    (item): item is AbiFunction =>
      item.type === 'function' && item.name === functionName,
  );

  for (const func of functions) {
    if (func.inputs.length === args.length) {
      let match = true;
      for (let i = 0; i < args.length; i++) {
        const inputType = func.inputs[i].type;
        const arg = args[i];

        if (!isArgumentValid(inputType, arg)) {
          match = false;
          break;
        }
      }
      if (match) {
        return func;
      }
    }
  }
  return null;
};

const validateArguments = (
  func: AbiFunction,
  args: Array<unknown>,
): { isValid: boolean; errorMessage?: string } => {
  if (func.inputs.length !== args.length) {
    return {
      isValid: false,
      errorMessage: `Expected ${ func.inputs.length } arguments, but got ${ args.length }.`,
    };
  }
  for (let i = 0; i < func.inputs.length; i++) {
    const input = func.inputs[i];
    const arg = args[i];
    if (!isArgumentValid(input.type, arg)) {
      return {
        isValid: false,
        errorMessage: `Invalid value for parameter "${ input.name }" of type "${ input.type }".`,
      };
    }
  }
  return { isValid: true };
};

const ContractWrite: React.FC<Props> = ({
  addressHash,
  isProxy,
  isCustomAbi,
}) => {
  const { data: walletClient } = useWalletClient();
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();

  const {
    data: methodsData,
    isLoading,
    isError,
  } = useApiQuery(
    isProxy ? 'contract_methods_write_proxy' : 'contract_methods_write',
    {
      pathParams: { hash: addressHash },
      queryParams: {
        is_custom_abi: isCustomAbi ? 'true' : 'false',
      },
      queryOptions: {
        enabled: Boolean(addressHash),
      },
    },
  );

  const contractAbi = useContractAbi({ addressHash, isProxy, isCustomAbi });

  const handleMethodFormSubmit = React.useCallback(
    async(
      item: SmartContractWriteMethod,
      args: Array<unknown>,
    ) => {
      if (!isConnected) {
        throw new Error('Wallet is not connected. Please connect your wallet to proceed.');
      }

      if (chain?.id && String(chain.id) !== config.chain.id) {
        await switchNetworkAsync?.(Number(config.chain.id));
      }

      if (!contractAbi) {
        throw new Error('Contract ABI is not available. Please try again later.');
      }

      if (!walletClient) {
        throw new Error('Wallet client is not available. Please ensure your wallet is properly configured.');
      }

      const isPayable =
        'stateMutability' in item && item.stateMutability === 'payable';
      const _args = isPayable ? args.slice(0, -1) : args;
      const value = isPayable ?
        getNativeCoinValue(args[args.length - 1] as any) :
        undefined;
      const methodName = (item as SmartContractMethodBase).name;

      if (!methodName) {
        throw new Error('Method name is not defined');
      }

      const functionsWithSameName = contractAbi.filter(
        (func): func is AbiFunction =>
          func.type === 'function' && func.name === methodName,
      );

      let abi: Abi;
      let functionName: string;
      let transformedArgs: Array<unknown>;

      if (functionsWithSameName.length === 0) {
        throw new Error(`Function "${ methodName }" not found in ABI`);
      } else if (functionsWithSameName.length > 1) {
        const funcFragment = findFunctionFragment(contractAbi, methodName, _args);

        if (!funcFragment) {
          throw new Error(
            `Function "${ methodName }" with ${ _args.length } arguments not found in ABI`,
          );
        }

        const validation = validateArguments(funcFragment, _args);
        if (!validation.isValid) {
          throw new Error(validation.errorMessage || 'Invalid arguments. Please check your input and try again.');
        }

        transformedArgs = _args.map((arg, index) => {
          const inputType = funcFragment.inputs[index].type;
          if (inputType.startsWith('uint') || inputType.startsWith('int')) {
            if (typeof arg === 'string' || typeof arg === 'number') {
              return BigInt(arg);
            }
          }
          return arg;
        });

        abi = [ funcFragment ];
        functionName = methodName;
      } else {
        const funcFragment = functionsWithSameName[0];

        if (!funcFragment) {
          throw new Error(`Function "${ methodName }" not found in ABI`);
        }

        const validation = validateArguments(funcFragment, _args);
        if (!validation.isValid) {
          throw new Error(validation.errorMessage || 'Invalid arguments. Please check your input and try again.');
        }

        transformedArgs = _args;
        abi = prepareAbi(contractAbi, item);
        functionName = methodName;
      }

      const payload = {
        args: transformedArgs,
        abi,
        functionName,
        address: addressHash as `0x${ string }`,
        value,
      };

      const hash = await walletClient.writeContract(payload);

      return { hash };
    },
    [ isConnected, chain, switchNetworkAsync, contractAbi, walletClient, addressHash ],
  );

  const renderItemContent = React.useCallback(
    (item: SmartContractWriteMethod, index: number, id: number) => {
      return (
        <ContractMethodCallable
          key={ `${ id }_${ index }` }
          data={ item }
          onSubmit={ handleMethodFormSubmit }
          resultComponent={ ContractWriteResult }
          isWrite
        />
      );
    },
    [ handleMethodFormSubmit ],
  );

  if (isError) {
    return <DataFetchAlert/>;
  }

  if (isLoading) {
    return <ContentLoader/>;
  }

  if (methodsData.length === 0 && !isProxy) {
    return <span>No public write functions were found for this contract.</span>;
  }

  return (
    <>
      { isCustomAbi && <ContractCustomAbiAlert/> }
      <ContractConnectWallet/>
      { isProxy && <ContractImplementationAddress hash={ addressHash }/> }
      <ContractMethodsAccordion
        data={ methodsData }
        addressHash={ addressHash }
        renderItemContent={ renderItemContent }
      />
    </>
  );
};

export default React.memo(ContractWrite);

// JFIN Mod End
