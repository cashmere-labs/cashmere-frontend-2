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
import { TransactionRequest } from "@ethersproject/abstract-provider";

// import { SwapBoxDetails } from "components/SwapBox/SwapBoxDetails";
import { SwapSettings } from "components/SwapSettings/useSwapSettings";
import { TokenOrNetworkRenderer } from "components/TokenOrNetworkRenderer/TokenOrNetworkRenderer";

import styles from "./SwapConfirmation.module.scss";
import Big from "big.js";
import { useAccount, useProvider, useSigner } from "ethylene/hooks";
import { BigNumber, constants, ethers } from "ethers";
import { ERC20 } from "ethylene/constants/abi";
import { ContractContext as CashmereRouter2L0Context } from "../../abi/CashmereRouter2L0";
import CashmereRouter2L0ABI from "../../abi/CashmereRouter2L0.abi.json";

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

const apiAddress = process.env.REACT_APP_LOCATION === "test" ? "/swapParamsL0?" : "http://localhost:3001/swapParamsL0?";

const SwapConfirmation = ({
  modalController,
  swapSettings,
  from,
  to,
  data,
}: SwapConfirmationModal) => {
  const { theme } = useTheme();
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [ transactionHash, setTransactionHash ] = useState<string>();
  const { address: accountAddress } = useAccount();
  const { provider } = useProvider();
  const signer = useSigner();

  const _handleSwap = async () => {
    console.log(`location: ${process.env.LOCATION}`);
    console.log(data);
    console.log(from);

    // const signature = await signer?.signMessage(ethers.utils.defaultAbiCoder.encode(
    //     ['address', 'address', 'address', 'address', 'uint256'],
    //     [accountAddress, ]
    // ));

    const fromAmount = new Big(from.amount).mul(new Big(10).pow(from.token.decimals)).toFixed(0);
    const r = await fetch(apiAddress + new URLSearchParams({
      fromAmount,
      fromChain: parseInt(from.network.chainId, 16).toString(),
      fromToken: from.token.address,
      toChain: parseInt(to.network.chainId, 16).toString(),
      toToken: to.token.address,
    }));
    const resp = await r.json();
    console.log(resp);
    console.log({
          name: "Cashmere Swap",
          version: "0.0.1",
          chainId: from.network.chainId,
          verifyingContract: resp.to,
        },
        {
          Parameters: [
            { name: 'receiver', type: 'address' },
            { name: 'lwsToken', type: 'address' },
            { name: 'hgsToken', type: 'address' },
            { name: 'dstToken', type: 'address' },
            { name: 'minHgsAmount', type: 'uint256' },
          ]
        },
        {
          receiver: accountAddress,
          lwsToken: resp.args.lwsToken,
          hgsToken: resp.args.hgsToken,
          dstToken: resp.args.dstToken,
          minHgsAmount: BigNumber.from(resp.args.hgsEstimate).mul("9").div("10")
        });
    const signature = await signer?._signTypedData(
      {
        name: "Cashmere Swap",
        version: "0.0.1",
        chainId: from.network.chainId,
        verifyingContract: resp.to,
      },
      {
        Parameters: [
          { name: 'receiver', type: 'address' },
          { name: 'lwsToken', type: 'address' },
          { name: 'hgsToken', type: 'address' },
          { name: 'dstToken', type: 'address' },
          { name: 'minHgsAmount', type: 'uint256' },
        ]
      },
      {
        receiver: accountAddress,
        lwsToken: resp.args.lwsToken,
        hgsToken: resp.args.hgsToken,
        dstToken: resp.args.dstToken,
        minHgsAmount: BigNumber.from(resp.args.hgsEstimate).mul("9").div("10")
      }
    );
    console.log(signature);

    // const signature = await signer?._signTypedData(ethers.utils.arrayify(ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(
    //     ["address", "address", "address", "address", "uint256"],
    //     [
    //       accountAddress,
    //       resp.args.lwsToken,
    //       resp.args.hgsToken,
    //       resp.args.dstToken,
    //       BigNumber.from(resp.args.hgsEstimate).mul("9").div("10"),
    //     ]
    // ))));
    const aggRouter: CashmereRouter2L0Context = new ethers.Contract(resp.to, CashmereRouter2L0ABI, signer) as unknown as CashmereRouter2L0Context;
    const txData = aggRouter.interface.encodeFunctionData(
      aggRouter.interface.functions["startSwap((address,uint256,address,address,bytes,address,uint256,address,uint16,uint256,bytes))"],
      [{
        srcToken: resp.args.srcToken,
        srcAmount: resp.args.srcAmount,
        lwsToken: resp.args.lwsToken,
        router1Inch: resp.args.oneInchAddress,
        data: resp.args.oneInchData,
        hgsToken: resp.args.hgsToken,
        hgsAssetId: resp.args.hgsAssetId,
        dstToken: resp.args.dstToken,
        dstChain: resp.args.dstChainId,
        minHgsAmount: BigNumber.from(resp.args.hgsEstimate).mul("9").div('10'),
        signature: signature!,
      }]
    );
    const tx: TransactionRequest = {
      data: txData,
      from: accountAddress,
      gasPrice: await provider?.getGasPrice(),
      to: resp.to,
      value: resp.value,
    };

    const fromToken = new ethers.Contract(from.token.address, ERC20, signer);
    if ((await fromToken.allowance(accountAddress, resp.to)).lt(fromAmount)) {
      const tx = await fromToken.approve(resp.to, constants.MaxUint256);
      await tx.wait();
    }

    console.log("beforeEstimate", tx);
    tx.gasLimit = await provider?.estimateGas(tx);
    console.log("afterEstimate", tx);
    const receipt = await signer?.sendTransaction(tx);

    setTransactionHash(receipt?.hash);
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
      <Done
          onDone={modalController.close}
          link={`${from.network.explorer?.url}tx/${transactionHash}`}
          explorer={from.network.explorer?.name}
      />
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
