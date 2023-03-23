import {
  ChoosePool,
  DepositDashboard,
  Footer,
  Navbar,
  Pools,
} from "../../components";
import { useTitle } from "../../hooks/useTitle";
import { useState } from "react";
import { Token } from "../../types/token";
import { Layout } from "../../ui";

import styles from "./Pool.module.scss";
import { activeChains, Chain } from '../../constants/chains';

export type FilterType = {
  network: null | Chain;
  token: null | Token;
};

export enum PoolTab {
  "ALL",
  "MY",
}

const Pool = () => {
  useTitle("Pools");

  const [filter, setFilter] = useState<FilterType>({
    network: null,
    token: null,
  });

  const [poolTab, setPoolTab] = useState<PoolTab>(PoolTab.ALL);

  return (
    <>
      <Layout>
        <Navbar />
        <div className={styles.wrapper}>
          <DepositDashboard />
          <ChoosePool
            poolTab={poolTab}
            setPoolTab={setPoolTab}
            filter={filter}
            setFilter={setFilter}
            tokenOptions={[] /*tokenOptions*/}
            networkOptions={activeChains}
          />
          <Pools filter={filter} poolTab={poolTab} />
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export { Pool };
