import { Token } from "./token";
import { NetworkTypes } from '../constants/networks';

export interface Network {
  type: NetworkTypes;
  chainId: string;
  name: string;
  rpcUrls: string[];
  nativeCurrency: {
    name?: string;
    decimals?: number;
    symbol?: string;
  };
  imageUrl?: string;
  explorer?: {
    url: string;
    name: string;
  };
  tokenList: Token[],
}
