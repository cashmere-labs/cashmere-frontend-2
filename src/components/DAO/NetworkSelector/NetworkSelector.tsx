import { SelectNetwork } from "../../../ui";

import styles from "./NetworkSelector.module.scss";

const NetworkSelector = () => {
  return (
    <div className={styles.wrapper}>
      <div>
        <h1>Select Network</h1>
      </div>
      <div>
        <SelectNetwork style={{ height: "40px" }} />
      </div>
    </div>
  );
};

export { NetworkSelector };
