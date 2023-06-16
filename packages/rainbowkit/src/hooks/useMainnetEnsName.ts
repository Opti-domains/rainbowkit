import { useEnsName, useNetwork } from 'wagmi';
import { useMainnet } from './useMainnet';
import { useUniversalEnsReverseResolver } from './useUniversalEnsRegistry';

export function useMainnetEnsName(address: string | undefined) {
  const { chain } = useNetwork();
  const { chainId: mainnetChainId, enabled } = useMainnet();

  const { data: universalResolver, isLoading, isError } = useUniversalEnsReverseResolver({ address, chainId: chain.id })
  
  const { data: ensName } = useEnsName({
    address: isLoading || isError || !universalResolver || universalResolver === '0x0000000000000000000000000000000000000000' ? undefined : address,
    chainId: chain.id,
    enabled,
    universalResolverAddress: universalResolver,
  });

  const { data: ensNameMainnet } = useEnsName({
    address,
    chainId: mainnetChainId,
    enabled,
  });

  if (isLoading) return undefined;
  if (isError || !universalResolver || universalResolver === '0x0000000000000000000000000000000000000000') return ensNameMainnet;
  return ensName;
}
