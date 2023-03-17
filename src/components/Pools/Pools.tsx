import { useState } from "react";
import { Button } from "ui";
import { clsnm } from "utils/clsnm";

import styles from "./Pools.module.scss";
import { useInjection } from 'inversify-react';
import ThemeStore from '../../store/ThemeStore';
import { observer } from 'mobx-react-lite';

const Pools = observer(() => {
  const [whichPool, setWhichPool] = useState(false);
  const themeStore = useInjection(ThemeStore);
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <div className={styles.buttons}>
          <Button
            height="46px"
            width="162px"
            onClick={() => setWhichPool(false)}
            color={themeStore.theme === "light" ? "neutral" : "neutral"}
            className={clsnm(
              whichPool ? styles.poolButtonOff : styles.poolButtonOn,
            )}
          >
            All Pools
          </Button>
          <Button
            height="46px"
            width="162px"
            onClick={() => setWhichPool(true)}
            color={themeStore.theme === "light" ? "neutral" : "neutral"}
            className={clsnm(
              !whichPool ? styles.poolButtonOff : styles.poolButtonOn,
            )}
          >
            My Pools
          </Button>
        </div>
        <div className={styles.TVLInfo}>
          <span className={styles.text1}>TVL:</span>
          <span className={styles.text2}>$518,213,212.42</span>
        </div>
      </div>

      <div className={styles.bodyWrapper}></div>
    </div>
  );
});

export { Pools };
