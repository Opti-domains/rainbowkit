import packet from 'dns-packet';
import { useContractRead } from 'wagmi';

// Same address across chains
const UNIVERSAL_ENS_REGISTRY = '0x8888110038E46D4c4ba75aFF88EaAC6f9aA537c1';
const UNIVERSAL_ENS_REGISTRY_OPERATOR =
  '0x888811AC3DC01628eBD22b1Aa01a35825aD997e8';

const ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    name: 'getReverseUniversalResolver',
    outputs: [
      {
        internalType: 'contract UniversalResolverTemplate',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'name',
        type: 'bytes',
      },
    ],
    name: 'getRegistryByName',
    outputs: [
      {
        internalType: 'contract ENS',
        name: 'registry',
        type: 'address',
      },
      {
        internalType: 'contract UniversalResolverTemplate',
        name: 'universalResolver',
        type: 'address',
      },
      {
        internalType: 'contract Resolver',
        name: 'resolver',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'finalOffset',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

interface UseUniversalEnsReverseResolverProps {
  address?: string;
  chainId?: number;
  operator?: string;
}

export function useUniversalEnsReverseResolver({
  address,
  chainId,
  operator = UNIVERSAL_ENS_REGISTRY_OPERATOR,
}: UseUniversalEnsReverseResolverProps) {
  return useContractRead<typeof ABI, string, `0x${string}`>({
    abi: ABI,
    address: address && chainId ? UNIVERSAL_ENS_REGISTRY : undefined,
    args: [address, operator],
    chainId,
    functionName: 'getReverseUniversalResolver',
  });
}

interface UseUniversalEnsRegistryResolverProps {
  name?: string | null;
  chainId?: number;
  operator?: string;
}

export function useUniversalEnsRegistryResolver({
  chainId,
  name,
  operator = UNIVERSAL_ENS_REGISTRY_OPERATOR,
}: UseUniversalEnsRegistryResolverProps) {
  return useContractRead<
    typeof ABI,
    string,
    [`0x${string}`, `0x${string}`, `0x${string}`, `0x${string}`, bigint]
  >({
    abi: ABI,
    address: name && chainId ? UNIVERSAL_ENS_REGISTRY : undefined,
    args: [operator, '0x' + (packet as any).name.encode(name).toString('hex')],
    chainId,
    functionName: 'getRegistryByName',
  });
}
