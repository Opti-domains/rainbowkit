import { useEnsName, useNetwork } from 'wagmi';
import { useMainnet } from './useMainnet';
import { useUniversalReverseResolver } from './useUniversalEnsRegistry.ts';

export function useMainnetEnsName(address: string | undefined) {
  const { chainId } = useNetwork();
  const { chainId: mainnetChainId, enabled } = useMainnet();

  const { data: universalResolver, isLoading, isError } = useUniversalReverseResolver({ address, chainId })
  
  const { data: ensName } = useEnsName({
    address: isLoading || isError || !universalResolver || universalResolver === '0x0000000000000000000000000000000000000000' ? undefined : address,
    chainId,
    enabled,
    universalResolverAddress: universalResolver,
  });

  const { data: ensNameMainnet } = useEnsName({
    address,
    chainId: mainnetChainId,
    enabled,
  });

  if (isLoading) return undefined;
  if (isError) return ensNameMainnet;
  return ensName;
}
