import styles from "./DepositDashboard.module.scss";
import { useTheme, useModal } from "hooks";
import { clsnm } from "utils/clsnm";
import { Button, Modal, NetworkBadge } from "ui";
import { Waiting } from "components/Modals/Waiting/Waiting";
import { NetworkTypes } from "ui/NetworkBadge/utils";

const DepositDashboard = () => {
  const claimModal = useModal();
  const { theme } = useTheme();
  return (
    <div className={styles.wrapper}>
      <div className={styles.rewardWrapper}>
        <div className={styles.DBTexts}>
          <div className={styles.DBText}>
            <span>My Total Deposits </span>
            <span className={styles.text2}>$2.890,12</span>
          </div>
          <div className={styles.DBText}>
            <span>My Pending Rewards</span>
            <span className={styles.text2}>
              $1.890,24 <span>CSM</span>
            </span>
          </div>
        </div>
        <div className={styles.buttons}>
          <NetworkBadge label={NetworkTypes.ARBITRUM} className={styles.network}/>
          <Button
            height="40px"
            width="156px"
            fontSize="fs16"
            onClick={() => claimModal.open()}
            color={theme === "light" ? "black" : "white"}
            className={clsnm(styles.claimAll)}
          >
            Claim All
          </Button>
        </div>
        <Modal
          bodyProps={{
            style: {
              borderRadius: "16px",
            },
          }}
          isOpen={claimModal.isOpen}
          close={claimModal.close}
        >
          <Waiting
            icon={null}
            value="24.689.905"
            iconName="veCSM"
            functionName="Claim rewards"
          />
        </Modal>
      </div>
    </div>
  );
};

export { DepositDashboard };
