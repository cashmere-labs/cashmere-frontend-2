// import ARBITRUM_IMG from "../../assets/images/networks/arbitrum.png";
// import AVALANCHE_IMG from "../../assets/images/networks/avalanche.png";
// import BNB_IMG from "../../assets/images/networks/bnb.png";
// import ETHEREUM_IMG from '../../assets/images/networks/ethereum.svg';
// import OPTIMISM_IMG from "../../assets/images/networks/optimism.png";
// import FANTOM_IMG from "../../assets/images/networks/phantom.png";
// import POLYGON_IMG from "../../assets/images/networks/polygon.png";
// import BASE_IMG from '../../assets/images/networks/base.svg';
import QUESTIONMARK from '../../assets/images/networks/question.png';
import { NetworkTypes, networkTypeToNetwork } from '../../constants/networks';

export const getBadgeProps = (label: NetworkTypes) => {
  let badgeProps: {
    bg: string;
    hoverBg: string;
    text: string;
    icon?: string;
    name?: string;
  };
  switch (label) {
    case NetworkTypes.AVALANCE:
    case NetworkTypes.AVALANCHE_FUJI: {
      badgeProps = {
        bg: "#ffd9da",
        hoverBg: "#f7c1c3",
        // icon: AVALANCHE_IMG,
        // name: "Avalanche",
        text: "#e84142",
      };
      break;
    }
    case NetworkTypes.BNB:
    case NetworkTypes.BSC_TESTNET: {
      badgeProps = {
        bg: "#ffe29b",
        hoverBg: "#fada8c",
        // icon: BNB_IMG,
        // name: "BSC",
        text: "#282b32",
      };
      break;
    }
    case NetworkTypes.ETHEREUM:
    case NetworkTypes.GOERLI: {
      badgeProps = {
        bg: "#d8dfff",
        hoverBg: "#ccd5fc",
        // icon: ETHEREUM_IMG,
        // name: "Ethereum",
        text: "#627eea",
      };
      break;
    }
    case NetworkTypes.POLYGON:
    case NetworkTypes.MUMBAI: {
      badgeProps = {
        bg: "#f0e6ff",
        hoverBg: "#e9dcfc",
        // icon: POLYGON_IMG,
        // name: "Polygon",
        text: "#8247e5",
      };
      break;
    }
    case NetworkTypes.ARBITRUM:
    case NetworkTypes.ARBITRUM_GOERLI: {
      badgeProps = {
        bg: "#e0f1ff",
        hoverBg: "#d9eeff",
        // icon: ARBITRUM_IMG,
        // name: "Arbitrum",
        text: "#2c374b",
      };
      break;
    }
    case NetworkTypes.OPTIMISM:
    case NetworkTypes.OPTIMISM_GOERLI: {
      badgeProps = {
        bg: "#ffd6d9",
        hoverBg: "#facace",
        // icon: OPTIMISM_IMG,
        // name: "Optimism",
        text: "#fc0d20",
      };
      break;
    }
    case NetworkTypes.FANTOM:
    case NetworkTypes.FANTOM_TESTNET: {
      badgeProps = {
        bg: "#d6f4ff",
        hoverBg: "#caeffc",
        // icon: FANTOM_IMG,
        // name: "Fantom",
        text: "#129cce",
      };
      break;
    }
    case NetworkTypes.BASE_GOERLI: {
      badgeProps = {
        bg: "#d6f4ff",
        hoverBg: "#caeffc",
        // icon: BASE_IMG,
        // name: "Fantom",
        text: "#129cce",
      };
      break;
    }
    default:
      badgeProps = {
        bg: "#d6f4ff",
        hoverBg: "#cff2ff",
        icon: QUESTIONMARK,
        name: label,
        text: "#2c374b",
      };
      break;
  }
  if (!badgeProps.icon) {
    badgeProps.icon = networkTypeToNetwork[label].imageUrl;
    badgeProps.name = networkTypeToNetwork[label].name;
  }
  return badgeProps;
};
