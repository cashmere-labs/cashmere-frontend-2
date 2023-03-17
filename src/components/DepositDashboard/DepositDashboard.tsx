import { Button } from "ui";
import { clsnm } from "utils/clsnm";

import styles from "./DepositDashboard.module.scss";
import { useInjection } from 'inversify-react';
import ThemeStore from '../../store/ThemeStore';
import { observer } from 'mobx-react-lite';

const DepositDashboard = observer(() => {
  const themeStore = useInjection(ThemeStore);
  return (
    <div className={styles.wrapper}>
      <div className={styles.rewardWrapper}>
        <div className={styles.DBTexts}>
          <div className={styles.DBText}>
            <span>MY TOTAL DEPOSIT</span>
            <span className={styles.text2}>$2.890,12</span>
          </div>
          <div className={styles.DBText}>
            <span>MY TOTAL DEPOSIT</span>
            <span className={styles.text2}>$2.890,12</span>
          </div>
        </div>
        <Button
          height="40px"
          width="156px"
          onClick={() => {}}
          color={themeStore.theme === "light" ? "black" : "neutral"}
          className={clsnm(styles.claimAll)}
        >
          Claim All
        </Button>
      </div>
    </div>
  );
});

export { DepositDashboard };
