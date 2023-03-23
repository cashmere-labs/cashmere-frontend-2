import { chainIdToChain } from '../constants/chains';

export const getNetworkFromNetwork = (network: number) => {
  return chainIdToChain.get(network);
};
