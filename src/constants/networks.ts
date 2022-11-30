import ARBITRUM_IMAGE from "assets/images/networks/arbitrum.png";
import AVALANCHE_IMAGE from "assets/images/networks/avalanche.png";
import BNB_IMAGE from "assets/images/networks/bnb.png";
import ETHEREUM_IMAGE from "assets/images/networks/ethereum.svg";
import OPTIMISM_IMAGE from "assets/images/networks/optimism.png";
import FANTOM_IMAGE from "assets/images/networks/phantom.png";
import POLYGON_IMAGE from "assets/images/networks/polygon.png";
import { Network } from "types/network";
import { NetworkTypes } from "ui/NetworkBadge/utils";

import arbitrumTokenList from "./assets/blockchains/arbitrum/tokenlist.json";
import avalancheTokenList from "./assets/blockchains/avalanchec/tokenlist.json";
import bscTokenList from "./assets/blockchains/smartchain/tokenlist.json";
import ethereumTokenList from "./assets/blockchains/ethereum/tokenlist.json";
import fantomTokenList from "./assets/blockchains/fantom/tokenlist.json";
import optimismTokenList from "./assets/blockchains/optimism/tokenlist.json";
import polygonTokenList from "./assets/blockchains/polygon/tokenlist.json";
import { Token } from "../types/token";

export const POLYGON: Network = {
  chainId: "0x89",
  explorer: {
    name: "Polygonscan",
    url: "https://polygonscan.com/",
  },
  imageUrl: POLYGON_IMAGE,
  name: "Polygon",
  nativeCurrency: {
    decimals: 18,
    name: "MATIC",
    symbol: "",
  },
  rpcUrls: ["https://polygon-rpc.com"],
  tokenList: polygonTokenList.tokens.map(t => new Token(t)),
};

export const AVALANCHE: Network = {
  chainId: "0xa86a",
  explorer: {
    name: "SnowTrace",
    url: "https://snowtrace.io/",
  },
  imageUrl: AVALANCHE_IMAGE,
  name: "Avalance",
  nativeCurrency: {
    decimals: 18,
    name: "AVAX",
    symbol: "AVAX",
  },
  rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
  tokenList: avalancheTokenList.tokens.map(t => new Token(t)),
};

export const BSC: Network = {
  chainId: "0x38",
  explorer: {
    name: "BSCScan",
    url: "https://bscscan.com/",
  },
  imageUrl: BNB_IMAGE,
  name: "BNB Smart Chain",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "BNB",
  },
  rpcUrls: ["https://bsc-dataseed.binance.org/"],
  tokenList: bscTokenList.tokens.map(t => new Token(t)),
};

export const OPTIMISM: Network = {
  chainId: "0xa",
  explorer: {
    name: "The Optimism Explorer",
    url: "https://optimistic.etherscan.io/",
  },
  imageUrl: OPTIMISM_IMAGE,
  name: "Optimism",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: ["https://mainnet.optimism.io/"],
  tokenList: optimismTokenList.tokens.map(t => new Token(t)),
};

export const FANTOM: Network = {
  chainId: "0xfa",
  explorer: {
    name: "FTMScan",
    url: "https://ftmscan.com/",
  },
  imageUrl: FANTOM_IMAGE,
  name: "Fantom",
  nativeCurrency: {
    decimals: 18,
    name: "FTM",
    symbol: "FTM",
  },
  rpcUrls: ["https://rpc.ankr.com/fantom/"],
  tokenList: fantomTokenList.tokens.map(t => new Token(t)),
};

export const ARBITRUM: Network = {
  chainId: "0xa4b1",
  explorer: {
    name: "Arbiscan",
    url: "https://arbiscan.io/",
  },
  imageUrl: ARBITRUM_IMAGE,
  name: "Arbitrum",
  nativeCurrency: {
    decimals: 18,
    name: "AETH",
    symbol: "AETH",
  },
  rpcUrls: ["https://arb1.arbitrum.io/rpc"],
  tokenList: arbitrumTokenList.tokens.map(t => new Token(t)),
};

export const ETHEREUM: Network = {
  chainId: "0x1",
  explorer: {
    name: "Etherscan",
    url: "https://etherscan.io/",
  },
  imageUrl: ETHEREUM_IMAGE,
  name: "Ethereum",
  nativeCurrency: {
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
  },
  rpcUrls: ["https://eth-mainnet.g.alchemy.com/v2/dcp_zwzQ14lWcfuLy3tGJxz1MV0VtRY4"],
  tokenList: ethereumTokenList.tokens.map(t => new Token(t)),
};

export const networkTypes = [
  NetworkTypes.ARBITRUM,
  NetworkTypes.AVALANCE,
  NetworkTypes.BNB,
  NetworkTypes.ETHEREUM,
  NetworkTypes.FANTOM,
  NetworkTypes.OPTIMISM,
  NetworkTypes.POLYGON,
];
