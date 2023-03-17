import ExitBlack from "../../../assets/icons/exit-black.png";
import ExitWhite from "../../../assets/icons/exit-white.png";
import { motion } from "framer-motion";
import { MdOutlineDone } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { Button } from "../../../ui";
import { clsnm } from "../../../utils/clsnm";

import modalStyles from "../../../ui/Modal/Modal.module.scss";
import styles from "./Done.module.scss";
import { useInjection } from 'inversify-react';
import ThemeStore from '../../../store/ThemeStore';
import { observer } from 'mobx-react-lite';

const Done = observer(({
  onDone,
  explorer,
  l0Link,
  link = "#",
}: {
  onDone: () => void;
  explorer?: string;
  link?: string;
  l0Link: string;
}) => {
  const isPhoneOrPC = useMediaQuery({
    query: "(max-width: 700px)",
  });

  const minWidth = useMediaQuery({
    query: "(max-width: 370px)",
  });

  const themeStore = useInjection(ThemeStore);
  return (
    <div className={modalStyles.layout}>
      <div className={clsnm(modalStyles.body, styles.wrapper)}>
        <img
          onClick={onDone}
          className={styles.exit}
          src={themeStore.theme === "light" ? ExitBlack : ExitWhite}
        ></img>
        <motion.div
          className={styles.done}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: [0.8, 1.4, 0.9, 1.3, 1, 1.1, 1] }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <MdOutlineDone
            color={themeStore.theme === "light" ? "green" : "lightgreen"}
            size={"50"}
          />
        </motion.div>

        <div className={styles.text}>Transaction Submitted</div>
        <Button
          onClick={() => window.open(link, "_blank")}
          height={isPhoneOrPC ? "45px" : "71px"}
          width={isPhoneOrPC ? (minWidth ? "260px" : "325px") : "524px"}
          color={themeStore.theme === "light" ? "transparentWhite" : "transparentBlack"}
          className={styles.button1}
        >
          View on {explorer}
        </Button>
        {l0Link && <Button
          onClick={() => window.open(l0Link, "_blank")}
          height={isPhoneOrPC ? "45px" : "71px"}
          width={isPhoneOrPC ? (minWidth ? "260px" : "325px") : "524px"}
          color={themeStore.theme === "light" ? "transparentWhite" : "transparentBlack"}
          className={styles.button1}
        >
          View on LayerZeroScan
        </Button>}
        <Button
          onClick={onDone}
          height={isPhoneOrPC ? "34px" : "56px"}
          width={isPhoneOrPC ? (minWidth ? "260px" : "325px") : "524px"}
          color={themeStore.theme === "light" ? "black" : "white"}
          className={styles.button2}
        >
          Done
        </Button>
      </div>
    </div>
  );
});

export { Done };
