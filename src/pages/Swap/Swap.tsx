import { Footer, Navbar, SwapBox } from "../../components";
import { GasEstimatorModal } from "../../components";
import { getMockEstimations } from "../../constants/mockEstimateData";
import { useModal } from "../../hooks";
import { useTitle } from "../../hooks/useTitle";
import { useEffect, useState } from 'react';
import { Token } from "../../types/token";
import { Layout } from "../../ui";

import { useSwapSettings } from "../../components/SwapSettings/useSwapSettings";

import styles from "./Swap.module.scss";
import { Chain, goerli, polygonMumbai } from '../../constants/chains';
import { useNetwork } from 'wagmi';
import { watchNetwork } from '@wagmi/core';

export type SwapState = {
  fromChain: Chain;
  fromToken: Token;
  toChain: Chain;
  toToken: Token;
  fromAmount: string;
};

const Swap = () => {
  useTitle("Swap");

  const swapSettings = useSwapSettings();
  const [state, setState] = useState<SwapState>({
    fromAmount: "",
    fromChain: goerli,
    fromToken: goerli.tokenList[0],
    toChain: polygonMumbai,
    toToken: polygonMumbai.tokenList[0],
  });

  const estimateModal = useModal();

  useEffect(() => {
      const unwatch = watchNetwork(({ chain }) => {
          if (!chain)
              return;
          if (chain?.id !== state.fromChain.id && !chain.unsupported) {
              setState({
                  ...state,
                  fromChain: chain as Chain,
                  fromToken: (chain as Chain).tokenList[0],
              });
          }
      });
      return unwatch;
  }, [state]);

  return (
    <Layout>
      <Navbar />
      <div className={styles.wrapper}>
        <SwapBox
          state={state}
          setState={setState}
          swapSettings={swapSettings}
        />
      </div>
      <div onClick={estimateModal.open} className={styles.estimator}>
        <span>Estimate transfer gas fees</span>
      </div>
      <GasEstimatorModal
        modalController={estimateModal}
        estimates={getMockEstimations()}
      />
      <Footer />
    </Layout>
  );
};

export { Swap };
