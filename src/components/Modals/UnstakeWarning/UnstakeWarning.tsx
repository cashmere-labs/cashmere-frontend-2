import WARNING from "../../../assets/icons/warning.png";
import { ModalController } from "../../../hooks/useModal";
import { useMediaQuery } from "react-responsive";
import { Button, Modal } from "../../../ui";

import styles from "./UnstakeWarning.module.scss";
import { useInjection } from 'inversify-react';
import ThemeStore from '../../../store/ThemeStore';
import { observer } from 'mobx-react-lite';

const UnstakeWarning = observer(({
  modal,
  onSuccess,
}: {
  modal: ModalController;
  onSuccess: () => void;
}) => {
    const themeStore = useInjection(ThemeStore);
  const isPhoneOrPC = useMediaQuery({
    query: "(max-width: 550px)",
  });
  return (
    <Modal isOpen={modal.isOpen} close={modal.close} className={styles.wrapper}>
      <div className={styles.title}>Confirm Withdraw</div>
      <div className={styles.warning}>
        <div className={styles.title}>
          <div className={styles.icon}>
            <img src={WARNING}></img>
          </div>
          <div className={styles.text}>Please unstake to withdraw </div>
        </div>
        <div className={styles.description}>
          You have staked the token. Please unstake first to withdraw the
          corresponding token.
        </div>
      </div>
      <Button
        height={isPhoneOrPC ? "34px" : "56px"}
        width={"100%"}
        color={themeStore.theme === "light" ? "black" : "white"}
        className={styles.button1}
        onClick={() => onSuccess()}
      >
        Unstake
      </Button>
    </Modal>
  );
});

export { UnstakeWarning };
