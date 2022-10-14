import AvaxImage from "assets/images/tokens/avax.png";
import DaiImage from "assets/images/tokens/dai.png";
import EtherImage from "assets/images/tokens/ethereum.svg";
import MaticImage from "assets/images/tokens/polygon.png";
import TetherusImage from "assets/images/tokens/tetherus.png";
import UsdcImage from "assets/pool/usdc.png";
import SushiImage from "assets/pool/sushi.svg";
import UniswapImage from "assets/pool/uniswap.svg";
import { Token } from "types/token";
import { ARBITRUM, POLYGON } from "./networks";

export const Dai = new Token({
  addresses: {
    [ARBITRUM.chainId]: "0x",
    [POLYGON.chainId]: "0x",
  },
  decimal: 18,
  imageUrl: DaiImage,
  name: "DAI",
});

export const Tetherus = new Token({
  addresses: {
    [ARBITRUM.chainId]: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    [POLYGON.chainId]: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  },
  decimal: 18,
  imageUrl: TetherusImage,
  name: "USDT",
});

export const Matic = new Token({
  addresses: {
    [ARBITRUM.chainId]: "0x",
    [POLYGON.chainId]: "0x",
  },
  decimal: 18,
  imageUrl: MaticImage,
  name: "MATIC",
});

export const Avax = new Token({
  addresses: {
    [ARBITRUM.chainId]: "0x",
    [POLYGON.chainId]: "0x",
  },
  decimal: 18,
  imageUrl: AvaxImage,
  name: "AVAX",
});

export const Ether = new Token({
  addresses: {
    [ARBITRUM.chainId]: "0x",
    [POLYGON.chainId]: "0x",
  },
  decimal: 18,
  imageUrl: EtherImage,
  name: "ETH",
});

export const Usdc = new Token({
  addresses: {
    [ARBITRUM.chainId]: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    [POLYGON.chainId]: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
  },
  decimal: 18,
  imageUrl: UsdcImage,
  name: "USDC",
});

export const Sushi = new Token({
  addresses: {
    [ARBITRUM.chainId]: "0xd4d42F0b6DEF4CE0383636770eF773390d85c61A",
    [POLYGON.chainId]: "0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a",
  },
  decimal: 18,
  imageUrl: SushiImage,
  name: "SUSHI",
});

export const Uniswap = new Token({
  addresses: {
    [ARBITRUM.chainId]: "0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0",
    [POLYGON.chainId]: "0xb33EaAd8d922B1083446DC23f610c2567fB5180f",
  },
  decimal: 18,
  imageUrl: UniswapImage,
  name: "UNI",
});
