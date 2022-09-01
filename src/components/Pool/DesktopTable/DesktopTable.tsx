import styles from "./DesktopTable.module.scss";
import { Icon, Tooltip, NetworkBadge } from "ui";
import { InfoIcon } from "assets/icons";
import { setWhichGlobalModal, setWhichPersonalModal } from "store/slicers/pool";
import { useDispatch } from "react-redux";
import { ModalController } from "hooks/useModal";
import { getBadgeProps } from "ui/NetworkBadge/utils";
import { Fragment } from "react";

interface Table {
  whichPool?: boolean;
  bodyCount: number;
  modal: ModalController;
  datas: any;
  filter: any;
  setWhichNetwork: any;
}

interface Title {
  whichPool?: boolean;
}

const PoolDesktopTitle = ({ whichPool }: Title) => {
  return (
    <div className={styles.tableTitle}>
      <div className={styles.title1}>Name</div>
      <div className={styles.title2}>Network</div>
      <div className={styles.title3}>
        Co. Ratio{" "}
        <Tooltip placement="top" content="Content coming here">
          <Icon size={16}>
            <InfoIcon />
          </Icon>
        </Tooltip>
      </div>
      <div className={styles.title4}>Staked LP</div>
      <div className={styles.title5}>
        veAPR{" "}
        <Tooltip placement="top" content="Content coming here">
          <Icon size={16}>
            <InfoIcon />
          </Icon>
        </Tooltip>
      </div>
      <div className={styles.title6}>My APR</div>
      {whichPool === true && <div className={styles.title7}>Rewards</div>}
    </div>
  );
};

const PoolDesktopTable = ({
  whichPool,
  bodyCount,
  modal,
  datas,
  filter,
  setWhichNetwork,
}: Table) => {
  return (
    <div>
      {datas.map((data: any, i: number) => {
        if (
          i < bodyCount &&
          filter.token === "All Tokens" &&
          filter.chain === "All Chains"
        ) {
          return (
            <>
              <Row
                whichPool={whichPool}
                modal={modal}
                index={i}
                data={data}
                setWhichNetwork={setWhichNetwork}
              />
            </>
          );
        } else if (
          !(filter.token === "All Tokens" && filter.chain === "All Chains") &&
          (data.name === filter.token || filter.token === "All Tokens") &&
          (filter.chain === "All Chains" ||
            getBadgeProps(data.network).name === filter.chain)
        ) {
          return (
            <Row
              whichPool={whichPool}
              modal={modal}
              index={i}
              data={data}
              setWhichNetwork={setWhichNetwork}
            />
          );
        } else {
          return <Fragment />;
        }
      })}
    </div>
  );
};

interface Row {
  whichPool?: boolean;
  modal: ModalController;
  data: any;
  index: number;
  setWhichNetwork: any;
}

const Row = ({ whichPool, modal, data, index, setWhichNetwork }: Row) => {
  const dispatch = useDispatch();
  return (
    <div
      className={styles.tableBody}
      key={index}
      onClick={() => {
        modal.open();
        setWhichNetwork(data.network);
        dispatch(setWhichPersonalModal(-1));
        dispatch(setWhichGlobalModal(index));
      }}
    >
      <div className={styles.line}></div>
      <div className={styles.datas}>
        <div className={styles.data1}>
          <span className={styles.logoAndName}>
            {data.logo && (
              <img
                style={{ width: "25px", marginRight: "14.5px" }}
                src={data.logo}
                alt="Logo"
              ></img>
            )}
            <span>{data.name}</span>
          </span>
        </div>
        <div className={styles.data2}>
          <NetworkBadge label={data.network} className={styles.network} />
        </div>
        <div className={styles.data3}>%{data.CR}</div>
        <div className={styles.data4}>%{data.stakedLP}</div>
        <div className={styles.data5}>{data.veAPR}%</div>
        <div className={styles.data6}>{data.myAPR}%</div>
        {whichPool === true && (
          <div className={styles.data7}>
            {data.rewards}%{" "}
            {index === 0 && (
              <Tooltip placement="top" content="Content coming here">
                <Icon size={20} style={{ color: "#d3b200" }}>
                  <InfoIcon />
                </Icon>
              </Tooltip>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export { PoolDesktopTable, PoolDesktopTitle };
