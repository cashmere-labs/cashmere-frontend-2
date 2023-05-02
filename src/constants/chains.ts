import {
    Chain as WagmiChain,
    mainnet as wagmiEthereum,
    goerli as wagmiGoerli,
    polygon as wagmiPolygon,
    polygonMumbai as wagmiPolygonMumbai,
    bsc as wagmiBsc,
    bscTestnet as wagmiBscTestnet,
    avalanche as wagmiAvalanche,
    avalancheFuji as wagmiAvalancheFuji,
    fantom as wagmiFantom,
    fantomTestnet as wagmiFantomTestnet,
    arbitrum as wagmiArbitrum,
    arbitrumGoerli as wagmiArbitrumGoerli,
    optimism as wagmiOptimism,
    optimismGoerli as wagmiOptimismGoerli,
    baseGoerli as wagmiBaseGoerli,
    polygonZkEvmTestnet as wagmiPolygonZkEvmTestnet,
    // zkSyncTestnet as wagmiZkSyncTestnet,
    metisGoerli as wagmiMetisGoerli,

} from 'wagmi/chains';
import { Token } from '../types/token';
import {
    arbitrumGoerliTokenList,
    avalancheFujiTokenList, baseGoerliTokenList,
    bscTestnetTokenList,
    fantomTestnetTokenList,
    goerliTokenList, lineaTestnetTokenList, metisGoerliTokenList,
    mumbaiTokenList, optimismGoerliTokenList, polygonZkEvmTestnetTokenList,
} from './tokenLists';
import ETHEREUM_IMAGE from '../assets/images/networks/ethereum.svg';
import POLYGON_IMAGE from '../assets/images/networks/polygon.png';
import BSC_IMAGE from '../assets/images/networks/bnb.png';
import AVALANCHE_IMAGE from '../assets/images/networks/avalanche.png';
import FANTOM_IMAGE from '../assets/images/networks/phantom.png';
import ARBITRUM_IMAGE from '../assets/images/networks/arbitrum.png';
import OPTIMISM_IMAGE from '../assets/images/networks/optimism.png';
import BASE_IMAGE from '../assets/images/networks/base.svg';
import LINEA_IMAGE from '../assets/images/networks/linea.svg';
import METIS_IMAGE from '../assets/images/networks/metis.png';

export type BadgeColors = {
    bg: string;
    hoverBg: string;
    text: string;
}

const ethereumBadgeColors: BadgeColors = {
    bg: "#d8dfff",
    hoverBg: "#ccd5fc",
    text: "#627eea",
};

const polygonBadgeColors: BadgeColors = {
    bg: "#f0e6ff",
    hoverBg: "#e9dcfc",
    text: "#8247e5",
};

const bscBadgeColors: BadgeColors = {
    bg: "#ffe29b",
    hoverBg: "#fada8c",
    text: "#282b32",
};

const avalancheBadgeColors: BadgeColors = {
    bg: "#ffd9da",
    hoverBg: "#f7c1c3",
    text: "#e84142",
};

const fantomBadgeColors: BadgeColors = {
    bg: "#d6f4ff",
    hoverBg: "#caeffc",
    text: "#129cce",
};

const arbitrumBadgeColors: BadgeColors = {
    bg: "#e0f1ff",
    hoverBg: "#d9eeff",
    text: "#2c374b",
};

const optimismBadgeColors: BadgeColors = {
    bg: "#ffd6d9",
    hoverBg: "#facace",
    text: "#fc0d20",
};

const lineaBadgeColors: BadgeColors = {
    bg: "#B9F1FF",
    hoverBg: "#7c8cc2",
    text: "#000",
};

const baseBadgeColors: BadgeColors = {
    bg: "#B0CAFA",
    hoverBg: "#7985cb",
    text: "#0052FF",
};

const metisBadgeColors: BadgeColors = {
    bg: "#00100B",
    hoverBg: "#7985cb",
    text: "#03D7CC",
};


export type Chain = WagmiChain & {
    iconUrl: string;
    tokenList: Token[];
    badgeColors: BadgeColors;
    faucetUrl?: string;
};

export const ethereum: Chain = {
    ...wagmiEthereum,
    iconUrl: ETHEREUM_IMAGE,
    tokenList: [],
    badgeColors: ethereumBadgeColors,
};

export const goerli: Chain = {
    ...wagmiGoerli,
    rpcUrls: {
        ...wagmiGoerli.rpcUrls,
        default: {
            http: ['https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
        },
    },
    iconUrl: ETHEREUM_IMAGE,
    tokenList: goerliTokenList.map(t => new Token(t)),
    badgeColors: ethereumBadgeColors,
    faucetUrl: 'https://goerlifaucet.com/',
};

export const polygon: Chain = {
    ...wagmiPolygon,
    iconUrl: POLYGON_IMAGE,
    tokenList: [],
    badgeColors: polygonBadgeColors,
};

export const polygonMumbai: Chain = {
    ...wagmiPolygonMumbai,
    iconUrl: POLYGON_IMAGE,
    tokenList: mumbaiTokenList.map(t => new Token(t)),
    badgeColors: polygonBadgeColors,
    faucetUrl: 'https://faucet.polygon.technology',
};

export const bsc: Chain = {
    ...wagmiBsc,
    iconUrl: BSC_IMAGE,
    tokenList: [],
    badgeColors: bscBadgeColors,
};

export const bscTestnet: Chain = {
    ...wagmiBscTestnet,
    name: 'BSC Testnet',
    iconUrl: BSC_IMAGE,
    tokenList: bscTestnetTokenList.map(t => new Token(t)),
    badgeColors: bscBadgeColors,
    faucetUrl: 'https://testnet.binance.org/faucet-smart',
};

export const avalanche: Chain = {
    ...wagmiAvalanche,
    iconUrl: AVALANCHE_IMAGE,
    tokenList: [],
    badgeColors: avalancheBadgeColors,
};

export const avalancheFuji: Chain = {
    ...wagmiAvalancheFuji,
    iconUrl: AVALANCHE_IMAGE,
    tokenList: avalancheFujiTokenList.map(t => new Token(t)),
    badgeColors: avalancheBadgeColors,
    faucetUrl: 'https://faucet.avax-test.network',
};

export const fantom: Chain = {
    ...wagmiFantom,
    iconUrl: FANTOM_IMAGE,
    tokenList: [],
    badgeColors: fantomBadgeColors,
};

export const fantomTestnet: Chain = {
    ...wagmiFantomTestnet,
    iconUrl: FANTOM_IMAGE,
    tokenList: fantomTestnetTokenList.map(t => new Token(t)),
    badgeColors: fantomBadgeColors,
    faucetUrl: 'https://faucet.fantom.network',
};

export const arbitrum: Chain = {
    ...wagmiArbitrum,
    iconUrl: ARBITRUM_IMAGE,
    tokenList: [],
    badgeColors: arbitrumBadgeColors,
};

export const arbitrumGoerli: Chain = {
    ...wagmiArbitrumGoerli,
    iconUrl: ARBITRUM_IMAGE,
    tokenList: arbitrumGoerliTokenList.map(t => new Token(t)),
    badgeColors: arbitrumBadgeColors,
    faucetUrl: 'https://faucet.quicknode.com/arbitrum/goerli',
};

export const optimism: Chain = {
    ...wagmiOptimism,
    iconUrl: OPTIMISM_IMAGE,
    tokenList: [],
    badgeColors: optimismBadgeColors,
};

export const optimismGoerli: Chain = {
    ...wagmiOptimismGoerli,
    iconUrl: OPTIMISM_IMAGE,
    tokenList: optimismGoerliTokenList.map(t => new Token(t)),
    badgeColors: optimismBadgeColors,
    faucetUrl: 'https://faucet.quicknode.com/optimism/goerli',
};

export const baseGoerli: Chain = {
    ...wagmiBaseGoerli,
    iconUrl: BASE_IMAGE,
    tokenList: baseGoerliTokenList.map(t => new Token(t)),
    badgeColors: baseBadgeColors,
    faucetUrl: 'https://faucet.quicknode.com/base/goerli',
};

export const lineaTestnet: Chain = {
    id: 59140,
    name: 'Linea zkEVM Testnet',
    network: 'linea-zkevm-testnet',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.goerli.linea.build'],
        },
        public: {
            http: ['https://rpc.goerli.linea.build'],
        }
    },
    blockExplorers: {
        default: {
            name: 'BlockScout',
            url: 'https://explorer.goerli.linea.build/',
        }
    },
    testnet: true,
    iconUrl: LINEA_IMAGE,
    tokenList: lineaTestnetTokenList,
    badgeColors: lineaBadgeColors,
    faucetUrl: 'https://goerli.hop.exchange/#/send?token=ETH&sourceNetwork=ethereum&destNetwork=linea',
};

export const polygonZkEvmTestnet: Chain = {
    ...wagmiPolygonZkEvmTestnet,
    iconUrl: POLYGON_IMAGE,
    tokenList: polygonZkEvmTestnetTokenList,
    badgeColors: polygonBadgeColors,
    faucetUrl: 'https://faucet.triangleplatform.com/polygonzkevm/testnet',
};

// export const zkSyncTestnet: Chain = {
//     ...wagmiZkSyncTestnet,
//     iconUrl: POLYGON_IMAGE,
//     tokenList: zkSyncTestnetTokenList,
//     badgeColors: polygonBadgeColors,
// };

export const metisGoerli: Chain = {
    ...wagmiMetisGoerli,
    iconUrl: METIS_IMAGE,
    tokenList: metisGoerliTokenList,
    badgeColors: metisBadgeColors,
    faucetUrl: 'https://goerli.faucet.metisdevops.link/',
};

export const allChains: Chain[] = [
    ethereum,
    goerli,
    polygon,
    polygonMumbai,
    bsc,
    bscTestnet,
    avalanche,
    avalancheFuji,
    fantom,
    fantomTestnet,
    arbitrum,
    arbitrumGoerli,
    optimism,
    optimismGoerli,
    baseGoerli,
    lineaTestnet,
    polygonZkEvmTestnet,
    // zkSyncTestnet,
    metisGoerli,
];

export const activeChains: Chain[] = [
    goerli,
    polygonMumbai,
    bscTestnet,
    avalancheFuji,
    fantomTestnet,
    arbitrumGoerli,
    optimismGoerli,
    baseGoerli,
    lineaTestnet,
    polygonZkEvmTestnet,
    // zkSyncTestnet,
    // metisGoerli,
];

export const chainIdToChain: Map<number, Chain> = allChains.reduce((prev, c) => {
    prev.set(c.id, c);
    return prev;
}, new Map<number, Chain>());


