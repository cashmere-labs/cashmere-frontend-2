import { InfoIcon } from "../../../assets/icons";
import GRAYPLUS from "../../../assets/icons/grayPlus.png";
import MINUS from "../../../assets/icons/minus.png";
import WHITEPLUS from "../../../assets/icons/whitePlus.png";
import LOGOBLACK from "../../../assets/images/cashmere.png";
import LOGOWHITE from "../../../assets/images/cashmereWhite.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { setFunctionName, setValue } from "../../../store/slicers/pool";
import { Button, Input } from "../../../ui";
import { Icon, Tooltip } from "../../../ui";

import styles from "./Liquidity.module.scss";
import { useInjection } from 'inversify-react';
import ThemeStore from '../../../store/ThemeStore';
import { observer } from 'mobx-react-lite';

const Liquidity = observer(({ onSuccess }: { onSuccess: () => void }) => {
    const themeStore = useInjection(ThemeStore);
  const dispatch = useDispatch();

  const [isPlus, setIsPlus] = useState(true);

  const isPhoneOrPC = useMediaQuery({
    query: "(max-width: 600px)",
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <div>{`${isPlus ? "Add" : "Remove"}`} Liquidity</div>
        <div className={isPlus ? styles.bgPlus : styles.bgMinus}>
          <div className={styles.dot} onClick={() => setIsPlus(!isPlus)}>
            {isPlus ? (
              themeStore.theme === "light" ? (
                <img src={WHITEPLUS}></img>
              ) : (
                <img src={GRAYPLUS}></img>
              )
            ) : (
              <img src={MINUS}></img>
            )}
          </div>
        </div>
      </div>
      <div className={styles.balance}>
        <div>
          <Button
            width={isPhoneOrPC ? "46px" : "65px"}
            height="34px"
            color={themeStore.theme === "light" ? "transparentWhite" : "transparentBlack"}
          >
            25%
          </Button>{" "}
          <Button
            width={isPhoneOrPC ? "46px" : "65px"}
            height="34px"
            color={themeStore.theme === "light" ? "transparentWhite" : "transparentBlack"}
          >
            50%
          </Button>{" "}
          <Button
            width={isPhoneOrPC ? "46px" : "65px"}
            height="34px"
            color={themeStore.theme === "light" ? "transparentWhite" : "transparentBlack"}
          >
            75%
          </Button>
          <Button
            width={isPhoneOrPC ? "46px" : "65px"}
            height="34px"
            color={themeStore.theme === "light" ? "transparentWhite" : "transparentBlack"}
          >
            MAX
          </Button>
        </div>
        <div>BALANCE 24689.905</div>
      </div>
      <div className={styles.inputBox}>
        <div className={styles.pattern}>
          <img
            className={styles.image}
            src={themeStore.theme === "light" ? LOGOBLACK : LOGOWHITE}
          ></img>
          <div className={styles.text}>CSM</div>
        </div>
        <Input
          extendLeft
          placeholder="Amount"
          height={isPhoneOrPC ? "59px" : "71px"}
          onChange={(e) => dispatch(setValue(e.target.value.toString()))}
        />
      </div>
      <div className={styles.depositingAmount}>
        <div>
          <div>Amount Depositing (After Fee)</div>
          <Tooltip placement="top" content="Content coming here">
            <Icon size={16}>
              <InfoIcon />
            </Icon>
          </Tooltip>
        </div>
        <div>24680 DAI</div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.fee}>
        <div>
          <div>Fee</div>
          <Tooltip placement="top" content="Content coming here">
            <Icon size={16}>
              <InfoIcon />
            </Icon>
          </Tooltip>
        </div>
        <div>15.6235 DAI</div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.totalDeposit}>
        <div>
          <div>My Total Deposits</div>
          <Tooltip placement="top" content="Content coming here">
            <Icon size={16}>
              <InfoIcon />
            </Icon>
          </Tooltip>
        </div>
        <div>34580.21 DAI</div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.poolShare}>
        <div>
          <div>Pool Share</div>
          <Tooltip placement="top" content="Content coming here">
            <Icon size={16}>
              <InfoIcon />
            </Icon>
          </Tooltip>
        </div>
        <div>0.54%</div>
      </div>
      <div className={styles.liquidityButton}>
        <Button
          width="100%"
          height={isPhoneOrPC ? "34px" : "56px"}
          fontWeight="fw600"
          color={themeStore.theme === "light" ? "black" : "white"}
          onClick={() => {
            onSuccess();
            if (isPlus) {
              dispatch(setFunctionName("Add Liquidity"));
            } else {
              dispatch(setFunctionName("Remove Liquidity"));
            }
          }}
        >
          {isPlus ? "Add Liquidity" : "Remove Liquidity"}
        </Button>
      </div>
    </div>
  );
});

export { Liquidity };
