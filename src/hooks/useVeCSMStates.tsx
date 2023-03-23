import { useInjection } from 'inversify-react';
import VeCSMStore from '../store/VeCSMStore';

export const useVeCSMStates = () => {
  const veCsmStore = useInjection(VeCSMStore);

  const changeIsActive = (newState: boolean) => {
    veCsmStore.setIsActive(newState);
  };

  const increaseValidatorCount = () => {
    veCsmStore.setValidatorCount(veCsmStore.validatorCount + 10);
  };

  const resetValidatorCount = () => {
    veCsmStore.setValidatorCount(6);
  };

  return { resetValidatorCount, increaseValidatorCount, changeIsActive };
};
