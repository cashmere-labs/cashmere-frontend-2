import { InfoIcon } from "../../../assets/icons";
import { Logo, Waiting } from "../../../components";
import { useModal } from "../../../hooks";
import { useEffect, useState } from 'react';
import { Button, Icon, Modal, Tooltip } from "../../../ui";

import styles from "./UpperPage.module.scss";
import { useInjection } from 'inversify-react';
import ThemeStore from '../../../store/ThemeStore';
import { observer } from 'mobx-react-lite';
import { Api, DaoStatsResponse } from '../../../utils/api';
import Big from 'big.js';
import { formatValue } from '../../../utils/formatValue';

const UpperPageReplaced = observer(() => {
  const themeStore = useInjection(ThemeStore);
  const api = useInjection(Api);

  const [ stats, setStats ] = useState<DaoStatsResponse>();

  const waitingModal = useModal();

  useEffect(() => {
    api.daoStats().then(data => setStats(data));
  }, [api]);

  const [functionName, setFunctionName] = useState("");
  const [whichModal, setWhichModal] = useState(0);
  return (
    <div className={styles.wrapper}>
      <div className={styles.infos}>
        <div className={styles.apr}>
          <div>
            <span>Total Volume</span>
            <Tooltip placement="top" content="Content coming here">
              <Icon size={16}>
                <InfoIcon />
              </Icon>
            </Tooltip>
          </div>
          <div>${Big(stats?.volume || 0).toFixed(2)}</div>
          <div>
            <span>Total Unique Users</span>
            <Tooltip placement="top" content="Content coming here">
              <Icon size={16}>
                <InfoIcon />
              </Icon>
            </Tooltip>
          </div>
          <div>{stats?.users || 0}</div>
        </div>
        <div className={styles.totalStaked}>
          <div>
            <span>Generated Fees</span>
            <Tooltip placement="top" content="Content coming here">
              <Icon size={16}>
                <InfoIcon />
              </Icon>
            </Tooltip>
          </div>
          <div>${Big(stats?.fees || 0).toFixed(2)}</div>
          {/*<div>*/}
          {/*  <div>CSM</div>*/}
          {/*  <div>(23.24%)</div>*/}
          {/*</div>*/}
        </div>
      </div>
      <div className={styles.yourProfit}>
        <div className={styles.title}>
          <div>TVL</div>
          <Tooltip placement="top" content="Content coming here">
            <Icon size={16}>
              <InfoIcon />
            </Icon>
          </Tooltip>
        </div>
        <div className={styles.value}>${formatValue(stats?.tvl || '0', 2, true)}</div>
        <div className={styles.line}></div>
          <div className={styles.title}>
            <div>Total Transactions</div>
            <Tooltip placement="top" content="Content coming here">
              <Icon size={16}>
                <InfoIcon />
              </Icon>
            </Tooltip>
          </div>
          <div className={styles.value}>{stats?.transactions || 0}</div>
        {/*<div className={styles.date}>*/}
        {/*  <div>*/}
        {/*    <div>Premium Date</div>*/}
        {/*    <Tooltip placement="top" content="Content coming here">*/}
        {/*      <Icon size={16}>*/}
        {/*        <InfoIcon />*/}
        {/*      </Icon>*/}
        {/*    </Tooltip>*/}
        {/*  </div>*/}
        {/*  <div>25 / 09 / 2022</div>*/}
        {/*</div>*/}
        <div className={styles.claim}>
          <Button
            width="45px"
            height="40px"
            color={themeStore.theme === "light" ? "black" : "white"}
            onClick={() => {
              setWhichModal(0);
              setFunctionName("Claim");
              waitingModal.open();
            }}
          >
            Claim
          </Button>
        </div>
      </div>
      <div className={styles.farm}>
        <div className={styles.logo}>
          <Logo hideLabel disableLink />
        </div>
        <div className={styles.lp}>
          <div> CSM-USN LP</div>
          <Tooltip placement="top" content="Content coming here">
            <Icon size={16}>
              <InfoIcon />
            </Icon>
          </Tooltip>
        </div>
        <div className={styles.apr}>APR</div>
        <div className={styles.value}>53.12%</div>
        <div className={styles.farmButton}>
          <Button
            width="45px"
            height="40px"
            color={themeStore.theme === "light" ? "black" : "white"}
            onClick={() => {
              setWhichModal(1);
              setFunctionName("Farm");
              waitingModal.open();
            }}
          >
            Farm
          </Button>
        </div>
      </div>
      <Modal
        isOpen={waitingModal.isOpen}
        close={() => {
          waitingModal.close();
        }}
      >
        <Waiting
          value={whichModal === 0 ? "2149$" : "2423"}
          iconName={whichModal === 0 ? "Dolar" : "veCSM"}
          icon={null}
          functionName={functionName}
        />
      </Modal>
    </div>
  );
});

export { UpperPageReplaced };
