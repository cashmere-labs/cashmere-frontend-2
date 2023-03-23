import { Footer, Navbar, SwapBox } from "../../components";
import { GasEstimatorModal } from "../../components";
import { getMockEstimations } from "../../constants/mockEstimateData";
import { useModal } from "../../hooks";
import { useTitle } from "../../hooks/useTitle";
import { useState } from 'react';
import { Token } from "../../types/token";
import { Layout } from "../../ui";

import { useSwapSettings } from "../../components/SwapSettings/useSwapSettings";

import styles from "./Swap.module.scss";
import { Chain, goerli, polygonMumbai } from '../../constants/chains';

export type SwapState = {
  fromChain: Chain;
  fromToken: Token;
  toChain: Chain;
  toToken: Token;
  fromamount: string;
};

const Swap = () => {
  useTitle("Swap");
  // console.log("Coded by Ethylene Blockchain Studio!");

  const swapSettings = useSwapSettings();
  const [state, setState] = useState<SwapState>({
    fromamount: "",
    fromChain: goerli,
    fromToken: goerli.tokenList[0],
    toChain: polygonMumbai,
    toToken: polygonMumbai.tokenList[0],
  });

  const estimateModal = useModal();

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
