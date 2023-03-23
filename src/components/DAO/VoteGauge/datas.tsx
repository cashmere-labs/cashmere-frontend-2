import DAI from "../../../assets/pool/dai.png";
import USDC from "../../../assets/pool/usdc.png";
import USDT from "../../../assets/pool/usdt.png";
import { TokenTypes } from "../../../ui/Token/utils";
import { arbitrum, avalanche, ethereum, fantom, optimism, polygon } from '../../../constants/chains';

export const VOTEGAUGE = [
  {
    logo: DAI,
    name: "DAI",
    token: TokenTypes.DAI,
    network: ethereum.id,
    totalVotedveCSM: "5,739,012.04",
    currentAPY: "3.2% -> 13.2",
    futureAPY: "3.2% -> 13.2",
    usedPower: "50",
  },
  {
    logo: USDC,
    name: "USDC",
    token: TokenTypes.USDC,
    network: arbitrum.id,
    totalVotedveCSM: "5,739,012.04",
    currentAPY: "3.2% -> 13.2",
    futureAPY: "3.2% -> 13.2",
    usedPower: "50",
  },
  {
    logo: USDT,
    name: "USDT",
    token: TokenTypes.USDT,
    network: optimism.id,
    totalVotedveCSM: "5,739,012.04",
    currentAPY: "3.2% -> 13.2",
    futureAPY: "3.2% -> 13.2",
    usedPower: "50",
  },
  {
    logo: DAI,
    name: "DAI",
    token: TokenTypes.DAI,
    network: fantom.id,
    totalVotedveCSM: "5,739,012.04",
    currentAPY: "3.2% -> 13.2",
    futureAPY: "3.2% -> 13.2",
    usedPower: "50",
  },
  {
    logo: USDC,
    name: "USDC",
    token: TokenTypes.USDC,
    network: avalanche.id,
    totalVotedveCSM: "5,739,012.04",
    currentAPY: "3.2% -> 13.2",
    futureAPY: "3.2% -> 13.2",
    usedPower: "50",
  },
  {
    logo: USDT,
    name: "USDT",
    token: TokenTypes.USDT,
    network: polygon.id,
    totalVotedveCSM: "5,739,012.04",
    currentAPY: "3.2% -> 13.2",
    futureAPY: "3.2% -> 13.2",
    usedPower: "50",
  },
];
