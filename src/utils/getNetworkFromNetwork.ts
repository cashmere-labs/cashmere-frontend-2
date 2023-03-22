import { NetworkTypes, networkTypeToNetwork } from '../constants/networks';

export const getNetworkFromNetwork = (network: NetworkTypes) => {
  return networkTypeToNetwork[network];
};
