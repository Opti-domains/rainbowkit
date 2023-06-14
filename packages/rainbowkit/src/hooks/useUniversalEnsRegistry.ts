// Same address across chains
const UNIVERSAL_ENS_REGISTRY = '...'
const UNIVERSAL_ENS_REGISTRY_OPERATOR = '...'

interface UseUniversalReverseResolverProps {
  address?: string
  chainId?: number
  operator?: string
}

export function useUniversalReverseResolver({ address, chainId, operator = UNIVERSAL_ENS_REGISTRY_OPERATOR }: UseUniversalReverseResolverProps) {
  return useContractRead({
    address: UNIVERSAL_ENS_REGISTRY,
    abi: UniversalEnsRegistryAbi,
    chainId,
    functionName: 'getReverseUniversalResovler',
    args: [ address, operator ],
  })
}
