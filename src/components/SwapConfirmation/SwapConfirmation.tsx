import { RotateIcon } from "assets/icons";
import { Done, Row } from "components";
import { useTheme } from "hooks";
import { ModalController } from "hooks/useModal";
import { ReactNode, useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Network } from "types/network";
import { SwapDetailsData } from "types/swap";
import { Token } from "types/token";
import { Button, Icon, Modal } from "ui";

// import { SwapBoxDetails } from "components/SwapBox/SwapBoxDetails";
import { SwapSettings } from "components/SwapSettings/useSwapSettings";
import { TokenOrNetworkRenderer } from "components/TokenOrNetworkRenderer/TokenOrNetworkRenderer";

import styles from "./SwapConfirmation.module.scss";
import Big from "big.js";
import { useAccount, useProvider, useSigner } from "ethylene/hooks";
import { constants, ethers } from "ethers";
import { ERC20 } from "ethylene/constants/abi";

type SwapConfirmationModal = {
  swapSettings: SwapSettings;
  from: {
    amount: string;
    token: Token;
    network: Network;
  };
  to: {
    amount: string;
    token: Token;
    network: Network;
  };
  data: SwapDetailsData;
  modalController: ModalController;
};

const SwapConfirmation = ({
  modalController,
  swapSettings,
  from,
  to,
  data,
}: SwapConfirmationModal) => {
  const { theme } = useTheme();
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const { address: accountAddress } = useAccount();
  const { provider } = useProvider();
  const signer = useSigner();

  const _handleSwap = async () => {
    console.log(data);
    console.log(from);
    const fromAmount = new Big(from.amount).mul(new Big(10).pow(from.token.decimal)).toFixed(0);
    const r = await fetch("https://api.cashmere.exchange/swapParams?" + new URLSearchParams({
      fromAmount,
      fromChain: parseInt(from.network.chainId, 16).toString(),
      fromToken: from.token.addresses[from.network.chainId],
      toChain: parseInt(to.network.chainId, 16).toString(),
      toToken: to.token.addresses[to.network.chainId],
    }));
    const resp = await r.json();
    console.log(resp);
    const tx = {
      ...resp,
      from: accountAddress,
      gasPrice: await provider?.getGasPrice(),
    };

    const fromToken = new ethers.Contract(from.token.addresses[from.network.chainId], ERC20, signer);
    if ((await fromToken.allowance(accountAddress, resp.to)).lt(fromAmount)) {
      const tx = await fromToken.approve(resp.to, constants.MaxUint256);
      await tx.wait();
    }

    console.log("beforeEstimate", tx);
    tx.gasLimit = await provider?.estimateGas(tx);
    console.log("afterEstimate", tx);
    await signer?.sendTransaction(tx);

    setIsConfirmed(true);
  };

  useEffect(() => {
    /**
     * @dev Reset the state on close
     */
    if (!modalController.isOpen) {
      setIsConfirmed(false);
    }
  }, [modalController.isOpen]);

  return isConfirmed ? (
    modalController.isOpen ? (
      <Done onDone={modalController.close} />
    ) : null
  ) : (
    <Modal
      bodyProps={{
        style: {
          padding: "36px 56px 12px 56px",
        },
      }}
      width="660px"
      isOpen={modalController.isOpen}
      close={modalController.close}
    >
      <div className={styles.header}>
        <span>Confirm swap</span>
      </div>
      <SwapConfirmationContentRenderer
        showArrow={false}
        right={from.amount}
        left={<TokenOrNetworkRenderer tokenOrNetwork={from.token} />}
      />
      <Row justifyContent="center">
        <Icon size={24} style={{ marginTop: "12px" }}>
          <RotateIcon />
        </Icon>
      </Row>
      <SwapConfirmationContentRenderer
        showArrow={false}
        right={to.amount}
        left={<TokenOrNetworkRenderer tokenOrNetwork={to.token} />}
      />
      <Row>
        <SwapConfirmationContentRenderer
          showArrow={true}
          left={
            <Row>
              <span style={{ fontSize: "12px", marginRight: "12px" }}>
                From
              </span>
              <TokenOrNetworkRenderer
                type="badge"
                tokenOrNetwork={from.network}
              />
            </Row>
          }
          right={
            <Row justifyContent="flex-end">
              <span style={{ fontSize: "12px", marginRight: "12px" }}>To</span>
              <TokenOrNetworkRenderer
                type="badge"
                tokenOrNetwork={to.network}
              />
            </Row>
          }
        />
      </Row>
      {/*<SwapBoxDetails data={data} />*/}
      <Button
        onClick={_handleSwap}
        style={{ marginBottom: "1.5rem", marginTop: "2rem" }}
        height="56px"
        width="100%"
        color={theme === "dark" ? "white" : "black"}
      >
        Swap
      </Button>
    </Modal>
  );
};

const SwapConfirmationContentRenderer = ({
  left,
  right,
  showArrow,
}: {
  left: ReactNode;
  right: ReactNode;
  showArrow: boolean;
}) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.left}>{left}</span>
      <VerticalDivider showArrow={showArrow} />
      <span className={styles.right}>{right}</span>
    </div>
  );
};

const VerticalDivider = ({ showArrow }: { showArrow: boolean }) => {
  return (
    <div className={styles.arrowWrapper}>
      {showArrow ? (
        <div className={styles.arrow}>
          <Icon style={{ color: "var(--text)" }} size={12}>
            <FaChevronRight />
          </Icon>
        </div>
      ) : null}
      <div className={styles.divider}></div>
    </div>
  );
};

export { SwapConfirmation };
