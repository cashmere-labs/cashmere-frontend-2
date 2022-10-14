import { Footer, Navbar, SwapBox } from "components";
import { GasEstimatorModal } from "components";
import { getMockEstimations } from "constants/mockEstimateData";
import { ARBITRUM, POLYGON } from "constants/networks";
import { Sushi, Uniswap } from "constants/tokens";
import { useModal } from "hooks";
import { useTitle } from "hooks/useTitle";
import { useState } from "react";
import { Network } from "types/network";
import { Token } from "types/token";
import { Layout } from "ui";

import { useSwapSettings } from "components/SwapSettings/useSwapSettings";

import styles from "./Swap.module.scss";

export type SwapState = {
  fromfrom: Network;
  fromto: Token;
  tofrom: Network;
  toto: Token;
  fromamount: string;
  toamount: string;
};

const Swap = () => {
  useTitle("Swap");
  console.log("Coded by Ethylene Blockchain Studio!");

  const swapSettings = useSwapSettings();
  const [state, setState] = useState<SwapState>({
    fromamount: "",
    fromfrom: ARBITRUM,
    fromto: Sushi,
    toamount: "",
    tofrom: POLYGON,
    toto: Uniswap,
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
