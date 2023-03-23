import { EstimateMapping } from "../components/Modals/GasEstimatorModal/GasEstimatorModal";
import { activeChains } from './chains';

export const getMockEstimations = (): EstimateMapping => {
  const mockEstimations: EstimateMapping = new Map();
  activeChains.forEach((network) => {
    const itemMap = new Map();

    for (let i = 0; i < activeChains.length; i++) {
      const item = activeChains[i];
      itemMap.set(item, {
        native: `0.0620 ${item.nativeCurrency?.name}`,
        usd: "$0.0620",
      });
      mockEstimations.set(network, itemMap);
    }
  });

  return mockEstimations;
};
