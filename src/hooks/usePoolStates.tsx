import { useInjection } from 'inversify-react';
import PoolStore from '../store/PoolStore';

export const usePoolStates = () => {
  const poolStore = useInjection(PoolStore);

  const increasePoolCount = () => {
    poolStore.setPoolCount(poolStore.poolCount + 10);
  };

  const resetPoolCount = () => {
    poolStore.setPoolCount(6);
  };

  return { increasePoolCount, resetPoolCount };
};
