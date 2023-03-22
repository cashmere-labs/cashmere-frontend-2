import ARBITRUM_IMAGE from '../assets/images/networks/arbitrum.png';
import AVALANCHE_IMAGE from '../assets/images/networks/avalanche.png';
import BNB_IMAGE from '../assets/images/networks/bnb.png';
import ETHEREUM_IMAGE from '../assets/images/networks/ethereum.svg';
import OPTIMISM_IMAGE from '../assets/images/networks/optimism.png';
import FANTOM_IMAGE from '../assets/images/networks/phantom.png';
import POLYGON_IMAGE from '../assets/images/networks/polygon.png';
import BASE_IMAGE from '../assets/images/networks/base.svg';
import { Network } from '../types/network';

import arbitrumTokenList from './assets/blockchains/arbitrum/tokenlist.json';
import avalancheTokenList from './assets/blockchains/avalanchec/tokenlist.json';
import bscTokenList from './assets/blockchains/smartchain/tokenlist.json';
import ethereumTokenList from './assets/blockchains/ethereum/tokenlist.json';
import fantomTokenList from './assets/blockchains/fantom/tokenlist.json';
import optimismTokenList from './assets/blockchains/optimism/tokenlist.json';
import polygonTokenList from './assets/blockchains/polygon/tokenlist.json';
import { Token } from '../types/token';

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

const bscTestnetTokenList = [
  {
    asset: '0',
    type: 'BSC',
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
    logoURI: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
  },
  {
    asset: '1',
    type: 'BSC',
    address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    name: 'Wrapped ETH',
    symbol: 'WETH',
    decimals: 18,
    logoURI: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
  },
  {
    asset: '2',
    type: 'BSC',
    address: '0x4325BB533E44c369ed9A154bDe923DF0Bbef129C',
    name: 'USDC',
    symbol: 'USDC',
    decimals: 18,
    logoURI: "https://assets-cdn.trustwallet.com/blockchains/polygon/assets/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174/logo.png",
  },
];

const avalancheFujiTokenList = [
  {
    asset: '0',
    type: 'AVALANCHE',
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
    logoURI: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
  },
  {
    asset: '1',
    type: 'AVALANCHE',
    address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    name: 'Wrapped ETH',
    symbol: 'WETH',
    decimals: 18,
    logoURI: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
  },
  {
    asset: '2',
    type: 'AVALANCHE',
    address: '0x231401dC8b53338d78c08f83CC4EBc74148196d0',
    name: 'USDC',
    symbol: 'USDC',
    decimals: 18,
    logoURI: "https://assets-cdn.trustwallet.com/blockchains/polygon/assets/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174/logo.png",
  },
];

const fantomTestnetTokenList = [
  {
    asset: '0',
    type: 'FANTOM',
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
    logoURI: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
  },
  {
    asset: '1',
    type: 'FANTOM',
    address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    name: 'Wrapped ETH',
    symbol: 'WETH',
    decimals: 18,
    logoURI: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
  },
  {
    asset: '2',
    type: 'FANTOM',
    address: '0x0Fdf019338d4229A160011d0aA87485c756a24f0',
    name: 'USDC',
    symbol: 'USDC',
    decimals: 18,
    logoURI: "https://assets-cdn.trustwallet.com/blockchains/polygon/assets/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174/logo.png",
  },
];

const arbitrumGoerliTokenList = [
  {
    asset: '0',
    type: 'ARBITRUM',
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
    logoURI: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
  },
  {
    asset: '1',
    type: 'ARBITRUM',
    address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    name: 'Wrapped ETH',
    symbol: 'WETH',
    decimals: 18,
    logoURI: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
  },
  {
    asset: '2',
    type: 'ARBITRUM',
    address: '0x747E19a0A0D074598BB5FB758591bFF8dE517312',
    name: 'USDC',
    symbol: 'USDC',
    decimals: 18,
    logoURI: "https://assets-cdn.trustwallet.com/blockchains/polygon/assets/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174/logo.png",
  },
];

const optimismGoerliTokenList = [
  {
    asset: '0',
    type: 'OPTIMISM',
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
    logoURI: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
  },
  {
    asset: '1',
    type: 'OPTIMISM',
    address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    name: 'Wrapped ETH',
    symbol: 'WETH',
    decimals: 18,
    logoURI: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
  },
  {
    asset: '2',
    type: 'OPTIMISM',
    address: '0x12AAef2833E39d556d9D913574a8B021D8e954c0',
    name: 'USDC',
    symbol: 'USDC',
    decimals: 18,
    logoURI: "https://assets-cdn.trustwallet.com/blockchains/polygon/assets/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174/logo.png",
  },
];

const baseGoerliTokenList = [
  {
    asset: '0',
    type: 'BASE',
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
    logoURI: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
  },
  {
    asset: '1',
    type: 'BASE',
    address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    name: 'Wrapped ETH',
    symbol: 'WETH',
    decimals: 18,
    logoURI: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
  },
  {
    asset: '2',
    type: 'BASE',
    address: '0x290B54A504A3b0cB21888e3E405AFC1b2946598C',
    name: 'USDC',
    symbol: 'USDC',
    decimals: 18,
    logoURI: "https://assets-cdn.trustwallet.com/blockchains/polygon/assets/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174/logo.png",
  },
];

export enum NetworkTypes {
  'AVALANCE',
  'BNB',
  'ETHEREUM',
  'POLYGON',
  'ARBITRUM',
  'OPTIMISM',
  'FANTOM',
  'GOERLI',
  'MUMBAI',
  'BSC_TESTNET',
  'AVALANCHE_FUJI',
  'FANTOM_TESTNET',
  'ARBITRUM_GOERLI',
  'OPTIMISM_GOERLI',
  'BASE_GOERLI',
}

export const POLYGON: Network = {
  type: NetworkTypes.POLYGON,
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
  type: NetworkTypes.MUMBAI,
  chainId: "0x13881",
  explorer: {
    name: "Polygonscan",
    url: "https://mumbai.polygonscan.com/",
  },
  imageUrl: POLYGON_IMAGE,
  name: "Polygon Mumbai",
  nativeCurrency: {
    decimals: 18,
    name: "MATIC",
    symbol: "",
  },
  rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
  tokenList: mumbaiTokenList.map(t => new Token(t)),
};

export const AVALANCHE: Network = {
  type: NetworkTypes.AVALANCE,
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
  type: NetworkTypes.BNB,
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
  type: NetworkTypes.OPTIMISM,
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
  type: NetworkTypes.FANTOM,
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
  type: NetworkTypes.ARBITRUM,
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
  type: NetworkTypes.ETHEREUM,
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

export const BSC_TESTNET: Network = {
  type: NetworkTypes.BSC_TESTNET,
  chainId: "0x61",
  explorer: {
    name: "BSCScan",
    url: "https://testnet.bscscan.com/",
  },
  imageUrl: BNB_IMAGE,
  name: "BSC Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "BNB",
  },
  rpcUrls: ["https://data-seed-prebsc-2-s1.binance.org:8545"],
  tokenList: bscTestnetTokenList.map(t => new Token(t)),
};

export const AVALANCHE_FUJI: Network = {
  type: NetworkTypes.AVALANCHE_FUJI,
  chainId: "0xa869",
  explorer: {
    name: "Snowtrace",
    url: "https://testnet.snowtrace.io/",
  },
  imageUrl: AVALANCHE_IMAGE,
  name: "Avalanche Fuji",
  nativeCurrency: {
    decimals: 18,
    name: "AVAX",
    symbol: "AVAX",
  },
  rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
  tokenList: avalancheFujiTokenList.map(t => new Token(t)),
};

export const FANTOM_TESTNET: Network = {
  type: NetworkTypes.FANTOM_TESTNET,
  chainId: "0xfa2",
  explorer: {
    name: "FTMScan",
    url: "https://testnet.ftmscan.com/",
  },
  imageUrl: FANTOM_IMAGE,
  name: "Fantom Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Fantom",
    symbol: "FTM",
  },
  rpcUrls: ["https://rpc.testnet.fantom.network"],
  tokenList: fantomTestnetTokenList.map(t => new Token(t)),
};

export const ARBITRUM_GOERLI: Network = {
  type: NetworkTypes.ARBITRUM_GOERLI,
  chainId: "0x66eed",
  explorer: {
    name: "Arbiscan",
    url: "https://testnet.arbiscan.io/",
  },
  imageUrl: ARBITRUM_IMAGE,
  name: "Arbitrum Goerli",
  nativeCurrency: {
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
  },
  rpcUrls: ["https://goerli-rollup.arbitrum.io/rpc"],
  tokenList: arbitrumGoerliTokenList.map(t => new Token(t)),
};

export const OPTIMISM_GOERLI: Network = {
  type: NetworkTypes.OPTIMISM_GOERLI,
  chainId: "0x1a4",
  explorer: {
    name: "Etherscan",
    url: "https://goerli-optimism.etherscan.io/",
  },
  imageUrl: OPTIMISM_IMAGE,
  name: "Optimism Goerli",
  nativeCurrency: {
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
  },
  rpcUrls: ["https://goerli.optimism.io"],
  tokenList: optimismGoerliTokenList.map(t => new Token(t)),
};

export const BASE_GOERLI: Network = {
  type: NetworkTypes.BASE_GOERLI,
  chainId: "0x14a33",
  explorer: {
    name: "Basescan",
    url: "https://goerli.basescan.org/",
  },
  imageUrl: BASE_IMAGE,
  name: "Base Goerli",
  nativeCurrency: {
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
  },
  rpcUrls: ["https://goerli.base.org"],
  tokenList: baseGoerliTokenList.map(t => new Token(t)),
};

export const GOERLI: Network = {
  type: NetworkTypes.GOERLI,
  chainId: "0x5",
  explorer: {
    name: "Etherscan",
    url: "https://goerli.etherscan.io/",
  },
  imageUrl: ETHEREUM_IMAGE,
  name: "Ethereum Goerli",
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
  NetworkTypes.BSC_TESTNET,
  NetworkTypes.AVALANCHE_FUJI,
  NetworkTypes.FANTOM_TESTNET,
  NetworkTypes.ARBITRUM_GOERLI,
  NetworkTypes.OPTIMISM_GOERLI,
  NetworkTypes.BASE_GOERLI,
];

export const networkTypeToNetwork = {
  [NetworkTypes.ARBITRUM]: ARBITRUM,
  [NetworkTypes.AVALANCE]: AVALANCHE,
  [NetworkTypes.BNB]: BSC,
  [NetworkTypes.ETHEREUM]: ETHEREUM,
  [NetworkTypes.FANTOM]: FANTOM,
  [NetworkTypes.OPTIMISM]: OPTIMISM,
  [NetworkTypes.POLYGON]: POLYGON,
  [NetworkTypes.MUMBAI]: MUMBAI,
  [NetworkTypes.GOERLI]: GOERLI,
  [NetworkTypes.BSC_TESTNET]: BSC_TESTNET,
  [NetworkTypes.AVALANCHE_FUJI]: AVALANCHE_FUJI,
  [NetworkTypes.FANTOM_TESTNET]: FANTOM_TESTNET,
  [NetworkTypes.ARBITRUM_GOERLI]: ARBITRUM_GOERLI,
  [NetworkTypes.OPTIMISM_GOERLI]: OPTIMISM_GOERLI,
  [NetworkTypes.BASE_GOERLI]: BASE_GOERLI,
};
