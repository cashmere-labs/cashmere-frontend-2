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
    baseGoerli as wagmiBaseGoerli
} from 'wagmi/chains';
import { Token } from '../types/token';
import {
    arbitrumGoerliTokenList,
    avalancheFujiTokenList, baseGoerliTokenList,
    bscTestnetTokenList,
    fantomTestnetTokenList,
    goerliTokenList,
    mumbaiTokenList, optimismGoerliTokenList
} from './tokenLists';
import ETHEREUM_IMAGE from '../assets/images/networks/ethereum.svg';
import POLYGON_IMAGE from '../assets/images/networks/polygon.png';
import BSC_IMAGE from '../assets/images/networks/bnb.png';
import AVALANCHE_IMAGE from '../assets/images/networks/avalanche.png';
import FANTOM_IMAGE from '../assets/images/networks/phantom.png';
import ARBITRUM_IMAGE from '../assets/images/networks/arbitrum.png';
import OPTIMISM_IMAGE from '../assets/images/networks/optimism.png';
import BASE_IMAGE from '../assets/images/networks/base.svg';

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

// todo
const baseBadgeColors: BadgeColors = {
    bg: "#d6f4ff",
    hoverBg: "#caeffc",
    text: "#129cce",
};


export type Chain = WagmiChain & {
    iconUrl: string;
    tokenList: Token[];
    badgeColors: BadgeColors;
};

export const ethereum: Chain = {
    ...wagmiEthereum,
    iconUrl: ETHEREUM_IMAGE,
    tokenList: [],
    badgeColors: ethereumBadgeColors,
};

export const goerli: Chain = {
    ...wagmiGoerli,
    iconUrl: ETHEREUM_IMAGE,
    tokenList: goerliTokenList.map(t => new Token(t)),
    badgeColors: ethereumBadgeColors,
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
};

export const bsc: Chain = {
    ...wagmiBsc,
    iconUrl: BSC_IMAGE,
    tokenList: [],
    badgeColors: bscBadgeColors,
};

export const bscTestnet: Chain = {
    ...wagmiBscTestnet,
    iconUrl: BSC_IMAGE,
    tokenList: bscTestnetTokenList.map(t => new Token(t)),
    badgeColors: bscBadgeColors,
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
};

export const baseGoerli: Chain = {
    ...wagmiBaseGoerli,
    iconUrl: BASE_IMAGE,
    tokenList: baseGoerliTokenList.map(t => new Token(t)),
    badgeColors: baseBadgeColors,
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
];

export const chainIdToChain: Map<number, Chain> = allChains.reduce((prev, c) => {
    prev.set(c.id, c);
    return prev;
}, new Map<number, Chain>());

