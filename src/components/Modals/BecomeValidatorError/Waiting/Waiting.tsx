import SkewLoader from "react-spinners/SkewLoader";

import styles from "./Waiting.module.scss";
import { useInjection } from 'inversify-react';
import ThemeStore from '../../../../store/ThemeStore';
import { observer } from 'mobx-react-lite';

interface WaitingProps {
  functionName: string;
  iconName: any;
  value: string;
  icon?: any;
}

const Waiting = observer(({ functionName, iconName, value, icon }: WaitingProps) => {
    const themeStore = useInjection(ThemeStore);
  return (
    <div className={styles.wrapper}>
      <SkewLoader
        className={styles.loader}
        color={themeStore.theme === "light" ? "black" : "#fff"}
      />
      <div className={styles.text1}>Waiting For Confirmation</div>

      <div className={styles.text2}>
        Please confirm this transaction in your wallet
      </div>
      <div className={styles.text3}>{functionName}</div>
      <div className={styles.values}>
        <div className={styles.value1}>
          <img className={styles.icon} src={icon}></img> {iconName}
        </div>
        <div className={styles.value2}>{value}</div>
      </div>
    </div>
  );
});

export { Waiting };
