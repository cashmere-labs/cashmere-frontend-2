import {
  LiquidityStakeReward,
  PoolDesktopTable,
  PoolDesktopTitle,
  PoolPhoneTable,
  PoolPhoneTitle,
  Waiting,
} from "../../../components";
import { useModal } from "../../../hooks";
import { usePoolStates } from "../../../hooks";
import { FilterType, PoolTab } from "../../../pages/Pool/Pool";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Button, Modal } from "../../../ui";
import { clsnm } from "../../../utils/clsnm";

import { GlobalData, PersonalData } from "../datas";
import styles from "./Pools.module.scss";
import { useInjection } from 'inversify-react';
import ThemeStore from '../../../store/ThemeStore';
import { observer } from 'mobx-react-lite';
import PoolStore from '../../../store/PoolStore';

enum Page {
  "FORM",
  "SUCCESS",
}

type PoolsProps = {
  filter: FilterType;
  poolTab: PoolTab;
};

const Pools = observer(({ filter, poolTab }: PoolsProps) => {
  const poolStore = useInjection(PoolStore);
  const poolCount = poolStore.poolCount;
  const functionName = poolStore.functionName;
  const value = poolStore.value;

  const [whichModal, setWhichModal] = useState<Page>(Page.FORM);

  const stakeModal = useModal();
  const [whichNetwork, setWhichNetwork] = useState();
  const { increasePoolCount } = usePoolStates();
  const isPhoneOrLaptop = useMediaQuery({
    query: "(max-width: 850px)",
  });
  const themeStore = useInjection(ThemeStore);
  const whichData = poolTab === PoolTab.MY ? PersonalData : GlobalData;

  return (
    <div className={styles.wrapper}>
      <div className={styles.dashboard}>
        {isPhoneOrLaptop ? (
          <PoolPhoneTitle />
        ) : (
          <PoolDesktopTitle whichPool={poolTab === PoolTab.MY} />
        )}
        {isPhoneOrLaptop ? (
          <PoolPhoneTable
            whichPool={poolTab === PoolTab.MY}
            bodyCount={poolCount}
            modal={stakeModal}
            datas={whichData}
            filter={filter}
            setWhichNetwork={setWhichNetwork}
          />
        ) : (
          <PoolDesktopTable
            whichPool={poolTab === PoolTab.MY}
            bodyCount={poolCount}
            modal={stakeModal}
            datas={whichData}
            filter={filter}
            setWhichNetwork={setWhichNetwork}
          />
        )}
      </div>
      {/*<div className={styles.footer}>*/}
      {/*  The base emission rate is currently 1.5 CSM per second.*/}
      {/*</div>*/}
      {poolTab === PoolTab.MY
        ? PersonalData.length > poolCount && (
            <div className={styles.more}>
              <Button
                height="40px"
                width="156px"
                onClick={() => increasePoolCount()}
                color={themeStore.theme === "light" ? "black" : "white"}
                className={clsnm(
                  styles.moreButton,
                  themeStore.theme === "light" ? styles.white : styles.black,
                )}
              >
                more
              </Button>
            </div>
          )
        : GlobalData.length > poolCount && (
            <div className={styles.more}>
              <Button
                height="40px"
                width="156px"
                fontSize="fs16"
                onClick={() => increasePoolCount()}
                color={themeStore.theme === "light" ? "black" : "white"}
                className={clsnm(
                  styles.moreButton,
                  themeStore.theme === "light" ? styles.white : styles.black,
                )}
              >
                more
              </Button>
            </div>
          )}
      {whichModal === Page.FORM ? (
        <LiquidityStakeReward
          modal={stakeModal}
          onSuccess={() => setWhichModal(Page.SUCCESS)}
          whichNetwork={whichNetwork}
        />
      ) : (
        <Modal
          isOpen={stakeModal.isOpen}
          close={() => {
            stakeModal.close();
            setWhichModal(Page.FORM);
          }}
        >
          <Waiting
            value={value}
            iconName={"veCSM"}
            icon={null}
            functionName={functionName}
          />
        </Modal>
      )}
    </div>
  );
});

export { Pools };
