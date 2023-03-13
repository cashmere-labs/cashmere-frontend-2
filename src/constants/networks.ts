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

const mumbaiTokenList = [
  {
    asset: '0',
    type: 'MUMBAI',
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
    logoURI: "https://assets-cdn.trustwallet.com/blockchains/polygon/assets/0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619/logo.png",
  },
  {
    asset: '1',
    type: 'MUMBAI',
    address: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
    name: 'Wrapped MATIC',
    symbol: 'WMATIC',
    decimals: 18,
    logoURI: "https://assets-cdn.trustwallet.com/blockchains/polygon/assets/0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619/logo.png",
  },
  {
    asset: '2',
    type: 'MUMBAI',
    address: '0x9F2bdc7c63D9CAD3Af1C5902d7fbCa297E0fc2Df',
    name: 'USDC',
    symbol: 'USDC',
    decimals: 18,
    logoURI: "https://assets-cdn.trustwallet.com/blockchains/polygon/assets/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174/logo.png",
  },
];

const goerliTokenList = [
  {
    asset: '0',
    type: 'GOERLI',
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
    logoURI: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
  },
  {
    asset: '1',
    type: 'GOERLI',
    address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    name: 'Wrapped ETH',
    symbol: 'WETH',
    decimals: 18,
    logoURI: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
  },
  {
    asset: '2',
    type: 'GOERLI',
    address: '0x9B2660A7BEcd0Bf3d90401D1C214d2CD36317da5',
    name: 'USDC',
    symbol: 'USDC',
    decimals: 18,
    logoURI: "https://assets-cdn.trustwallet.com/blockchains/polygon/assets/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174/logo.png",
  },
];

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

export const MUMBAI: Network = {
  chainId: "0x13881",
  explorer: {
    name: "Polygonscan",
    url: "https://mumbai.polygonscan.com/",
  },
  imageUrl: POLYGON_IMAGE,
  name: "Mumbai",
  nativeCurrency: {
    decimals: 18,
    name: "MATIC",
    symbol: "",
  },
  rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
  tokenList: mumbaiTokenList.map(t => new Token(t)),
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

export const GOERLI: Network = {
  chainId: "0x5",
  explorer: {
    name: "Etherscan",
    url: "https://goerli.etherscan.io/",
  },
  imageUrl: ETHEREUM_IMAGE,
  name: "Goerli",
  nativeCurrency: {
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
  },
  rpcUrls: ["https://goerli.blockpi.network/v1/rpc/public"],
  tokenList: goerliTokenList.map(t => new Token(t)),
};

export const networkTypes = [
  NetworkTypes.ARBITRUM,
  NetworkTypes.AVALANCE,
  NetworkTypes.BNB,
  NetworkTypes.ETHEREUM,
  NetworkTypes.FANTOM,
  NetworkTypes.OPTIMISM,
  NetworkTypes.POLYGON,
  NetworkTypes.MUMBAI,
  NetworkTypes.GOERLI,
];
