import { useEnsAvatar, useNetwork } from 'wagmi';
import { useMainnet } from './useMainnet';
import { useUniversalEnsRegistryResolver } from './useUniversalEnsRegistry';

export function useMainnetEnsAvatar(name: string | null | undefined) {
  const { chain } = useNetwork();
  const { chainId: mainnetChainId, enabled } = useMainnet();

  const {
    data: getRegistryByNameResult,
    isError,
    isLoading,
  } = useUniversalEnsRegistryResolver({ chainId: chain?.id, name });

  const universalResolver = getRegistryByNameResult
    ? getRegistryByNameResult[1]
    : undefined;

  const { data: ensAvatar } = useEnsAvatar({
    chainId: chain?.id,
    name:
      isLoading ||
      isError ||
      !universalResolver ||
      universalResolver === '0x0000000000000000000000000000000000000000'
        ? undefined
        : name,
    universalResolverAddress: universalResolver,
  });

  const { data: ensAvatarMainnet } = useEnsAvatar({
    chainId: mainnetChainId,
    enabled,
    name,
  });

  if (isLoading) return undefined;
  if (
    isError ||
    !universalResolver ||
    universalResolver === '0x0000000000000000000000000000000000000000'
  )
    return ensAvatarMainnet;
  return ensAvatar;
}
