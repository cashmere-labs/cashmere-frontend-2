import { ResponsivePie } from "@nivo/pie";
import {
  BecomeValidator,
  ExecutingModal,
  LockModal,
  ProposalModal,
  Statistics,
  TxProgressModal,
} from "components";
import { mockTxSteps } from "constants/mockTxSteps";
import { useModal } from "hooks";
import { NetworkBadge } from "ui";

import styles from "./Test.module.scss";
import { NetworkTypes } from '../../constants/networks';

const data = [
  {
    id: "css",
    label: "css",
    value: 118,
    color: "rbg(0,0,0,0.5)",
  },
  {
    id: "ruby",
    label: "ruby",
    value: 50,
    color: "yellow",
  },
  {
    id: "go",
    label: "go",
    value: 300,
    color: "blue",
  },
];

const Test = () => {
  const modal = useModal();

  return (
    <div style={{ width: "500px", height: "500px" }}>
      <div onClick={modal.open}>Hey</div>
      {/* <LockModal modal={modal} /> */}
      <div>
        <NetworkBadge
          style={{ marginBottom: "12px" }}
          label={NetworkTypes.AVALANCE}
        />
        <NetworkBadge
          style={{ marginBottom: "12px" }}
          label={NetworkTypes.BNB}
        />
        <NetworkBadge
          style={{ marginBottom: "12px" }}
          label={NetworkTypes.ETHEREUM}
        />{" "}
        <NetworkBadge
          style={{ marginBottom: "12px" }}
          label={NetworkTypes.ARBITRUM}
        />
        <NetworkBadge
          style={{ marginBottom: "12px" }}
          label={NetworkTypes.OPTIMISM}
        />
        <NetworkBadge
          style={{ marginBottom: "12px" }}
          label={NetworkTypes.FANTOM}
        />
        <NetworkBadge style={{ marginBottom: "12px" }} label={"Other Badge"} />
      </div>
      <span style={{ color: "yellow" }} onClick={modal.open}>
        OPEN PROGRESS
      </span>

      <TxProgressModal modalController={modal} steps={mockTxSteps} />
    </div>
  );
};

export { Test };
