import { Token } from "./token";

export interface Network {
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
