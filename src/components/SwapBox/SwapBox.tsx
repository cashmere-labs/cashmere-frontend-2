import { RotateIcon, SettingsIcon } from "assets/icons";
import { Row } from "components";
import { SwapConfirmation, TokenOrNetworkRenderer } from "components";
import { networkOptions } from "constants/networkOptions";
// import { ETHEREUM, POLYGON } from "constants/networks";
// import { tokenOptions } from "constants/tokenOptions";
import { useAccount, useConnection, useOnNetworkChange, useProvider, useRightNetwork } from "ethylene/hooks";
import { useModal, useTheme } from "hooks";
import { SwapState } from "pages/Swap/Swap";
import { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Network } from "types/network";
import { Token } from "types/token";
import { Button, Icon, Input, Select } from "ui";

// import { SwapBoxDetails } from "components/SwapBox/SwapBoxDetails";
import { SwapNetworkSelector } from "components/SwapBox/SwapNetworkSelector";
import { SwapSettings } from "components/SwapSettings/SwapSettings";
import { SwapSettings as SwapSettingType } from "components/SwapSettings/useSwapSettings";

import styles from "./SwapBox.module.scss";
import { ethers } from "ethers";
import { ERC20 as ERC20_ABI } from "ethylene/constants/abi";
import Big from "big.js";
import { EthyleneNetwork } from "ethylene/types/app";
import { useNetwork } from "../../store/hooks/networkHooks";

const switchNetwork = function (network: EthyleneNetwork) {
    const fn = async () => {
        try {
            // @ts-ignore
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: network.chainId }],
            });
        } catch (error: any) {
            const WALLET_ERROR_CODE = 4902;

            if (error.code === WALLET_ERROR_CODE) {
                try {
                    // @ts-ignore
                    await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                chainId: network.chainId,
                                rpcUrls: network.rpcUrls,
                                nativeCurrency: network.nativeCurrency,
                                chainName: network.name,
                            },
                        ],
                    });
                } catch (addError) {
                    console.log("[DEBUG] Network Add error", addError);
                    return;
                }
            }
            console.log("[DEBUG] Switch Network Error");
            return;
        }
    };
    fn().then().catch();
};

const SwapBox = ({
  state,
  swapSettings,
  setState,
}: {
  state: SwapState;
  setState: (to: SwapState) => void;
  swapSettings: SwapSettingType;
}) => {
  const { auth, address: accountAddress } = useAccount();
  const { connect, disconnect } = useConnection();
  const { provider } = useProvider();
  const network = useNetwork();
  const { isRightNetwork, switchTo } = useRightNetwork(state.fromfrom);
  const [method, setMethod] = useState<"stable" | "aggregator">("stable");

  const [ networkId, setNetworkId ] = useState<number | undefined>();

  useEffect(() => {
      setNetworkId(provider?.network.chainId);
  }, [provider]);

  useOnNetworkChange(() => {
      setNetworkId(provider?.network.chainId);
  });

  const swapSettingsModal = useModal();
  const swapConfirmationModal = useModal();
  const { theme } = useTheme();

  const rightNetwork = useMemo(() => networkId === parseInt(state.fromfrom.chainId, 16), [networkId, state]);

  const [ fromBalance, setFromBalance ] = useState<Big>();
  const [ toBalance, setToBalance ] = useState<Big>();
  useEffect(() => void (async () => {
      if (!accountAddress) {
          setFromBalance(undefined);
          setToBalance(undefined);
          return;
      }
      const fromContract = new ethers.Contract(state.fromto.address, ERC20_ABI, new ethers.providers.JsonRpcProvider(state.fromfrom.rpcUrls[0]));
      const toContract = new ethers.Contract(state.toto.address, ERC20_ABI, new ethers.providers.JsonRpcProvider(state.tofrom.rpcUrls[0]));
      setFromBalance(new Big((await fromContract.balanceOf(accountAddress)).toString()).div(new Big(10).pow(state.fromto.decimals)));
      setToBalance(new Big((await toContract.balanceOf(accountAddress)).toString()).div(new Big(10).pow(state.toto.decimals)));
  })(), [accountAddress, state.fromfrom, state.fromto, state.tofrom, state.toto]);

  const onNetworkSelect = useRef<(item: Network | Token) => void>(
    () => undefined,
  );
  const onTokenSelect = useRef<(item: Network | Token) => void>(
    () => undefined,
  );
  const networkSelectorModal = useModal();
  const tokenSelectorModal = useModal();
  const tokenList = useRef<Token[]>([]);
  const tokenSelectorNetwork = useRef<Network>();

  /**
   * @dev Reverse the from and to positions
   */
  const reverse = () => {
    const _state = { ...state };
    _state.fromfrom = state.tofrom;
    _state.fromto = state.toto;
    _state.tofrom = state.fromfrom;
    _state.toto = state.fromto;

    setState(_state);
  };

  /**
   * @dev Handles swap action
   */
  const handleSwap = async () => {
    if (!auth) {
      connect();
      return;
    }
    if (!rightNetwork) {
      switchNetwork(state.fromfrom);
      return;
    }
    swapConfirmationModal.open();
  };

  /**
   * @dev Formats the swap button content
   */
  const getSwapButtonContent = () => {
    if (!auth) return "Connect Wallet";
    if (!rightNetwork) return "Switch network";
    return "Swap";
  };

  /**
   * @dev erc20Balance can be acquired a hook that is inside ethylene/hooks
   *
   * Check for docs:
   * https://ethylene.itublockchain.com/docs/hooks/useERC20Balance
   * const {balance} = useERC20Balance(props);
   */

  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!wrapperRef.current) return;
    if (networkSelectorModal.isOpen) {
      wrapperRef.current.style.boxShadow = "var(--shadow1)";
    } else {
      wrapperRef.current.style.boxShadow = "none";
    }
  }, [networkSelectorModal.isOpen]);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      {networkSelectorModal.isOpen && (
        <SwapNetworkSelector
          onSelect={onNetworkSelect.current}
          modalController={networkSelectorModal}
          options={{
            data: networkOptions,
            type: "network",
          }}
        />
      )}
      {tokenSelectorModal.isOpen && (
        <SwapNetworkSelector
          onSelect={onTokenSelect.current}
          modalController={tokenSelectorModal}
          options={{
            data: tokenList.current /*tokenOptions*/,
            type: "token",
              network: tokenSelectorNetwork.current!,
          }}
        />
      )}
      <SwapSettings modal={swapSettingsModal} swapSettings={swapSettings} />
      <SwapConfirmation
        data={{
          fee: "24.169.287 USDT",
          minimumReceived: "15.6235 USDT",
          priceImpact: "0.05%",
          rataAfterFee: "1 UST = 1.017 USDT",
        }}
        modalController={swapConfirmationModal}
        swapSettings={swapSettings}
        from={{
          amount: state.fromamount,
          network: state.fromfrom,
          token: state.fromto,
        }}
        to={{
          amount: state.toamount,
          network: state.tofrom,
          token: state.toto,
        }}
      />
      <div className={styles.header}>
        <div>
          <span
            className={styles.tab}
            onClick={() => setMethod("stable")}
            style={{
              color: method === "stable" ? "var(--text)" : "var(--subtext)",
            }}
          >
            Swap
          </span>
          <span
            className={styles.tab}
            onClick={() => setMethod("aggregator")}
            style={{
              color: method === "aggregator" ? "var(--text)" : "var(--subtext)",
              cursor: "pointer",
            }}
          >
            Aggregator
          </span>
        </div>

        <Icon
          onClick={swapSettingsModal.open}
          style={{ color: "var(--icon-dark)" }}
          hoverPadding="6px"
          size={16}
          hoverable
        >
          <SettingsIcon />
        </Icon>
      </div>
      {/* FROM */}
      <Row
        className={styles.inputLabel}
        marginTop={24}
        marginBottom={6}
        justifyContent="space-between"
      >
        <span>From</span>
        <span>BALANCE: {fromBalance?.toString()}</span>
      </Row>
      <Row>
        <Select
          disableDefaultMode
          onClick={() => {
            networkSelectorModal.open();
            onNetworkSelect.current = (item: Network | Token) => {
              if (item instanceof Token) {
                return;
              }
                if (state.fromfrom !== item) {
                    disconnect();
                }
                const toNetwork = item === state.tofrom ? networkOptions.filter(n => n !== item)[0] : state.tofrom;
                const matchingTokenFrom = item.tokenList.filter(t => t.symbol === state.fromto.symbol)[0];
                const matchingTokenTo = item === state.tofrom ? toNetwork.tokenList.filter(t => t.symbol === state.toto.symbol)[0] : state.toto;
                setState({
                  ...state,
                  fromfrom: item,
                  tofrom: toNetwork,
                    fromto: matchingTokenFrom || item.tokenList[0],
                    toto: matchingTokenTo || toNetwork.tokenList[0],
              });
            };
          }}
          containerClassName={styles.select}
          extendRight
          isFullWidth
          menuRenderer={() => (
            <TokenOrNetworkRenderer tokenOrNetwork={state.fromfrom} />
          )}
          value={state.fromfrom}
          setValue={() => undefined}
          options={networkOptions}
          hideRightBorder
        />
        <Select
          disableDefaultMode
          containerClassName={styles.select}
          extendRight
          extendLeft
          isFullWidth
          menuRenderer={() => (
            <TokenOrNetworkRenderer tokenOrNetwork={state.fromto} />
          )}
          value={state.fromto}
          setValue={() => undefined}
          options={state.fromfrom.tokenList /*tokenOptions*/}
          onClick={() => {
              tokenList.current = state.fromfrom.tokenList;
              tokenSelectorNetwork.current = state.fromfrom;
            tokenSelectorModal.open();
            onTokenSelect.current = (item: Network | Token) => {
              if (item instanceof Token) {
                setState({ ...state, fromto: item });
              }
            };
          }}
        />
        <Input
          placeholder="Enter amount"
          className={styles.input}
          extendLeft
          hideLeftBorder
          value={state.fromamount}
          onChange={e => setState({ ...state, fromamount: e.target.value, toamount: e.target.value })}
          rightEl={
            <Button width="18px" color="white" onClick={() => setState({ ...state, fromamount: fromBalance?.toString() || "", toamount: fromBalance?.toString() || "" })}>
              Max
            </Button>
          }
        />
      </Row>
      {/* FROM ENDS */}
      {/* ROTATE CIRCLE */}
      <Row marginTop={20} marginBottom={8} justifyContent="center">
        <Icon
          onClick={reverse}
          borderRadius="8px"
          size={26}
          style={{ color: "var(--icon-dark)" }}
          hoverable
        >
          <RotateIcon />
        </Icon>
      </Row>
      {/* ROTATE CIRCLE ENDS */}
      {/* TO */}
      <Row
        className={styles.inputLabel}
        marginBottom={6}
        justifyContent="space-between"
      >
        <span>To</span>
        <span>BALANCE: {toBalance?.toString()}</span>
      </Row>
      <Row marginBottom={12}>
        <Select
          disableDefaultMode
          containerClassName={styles.select}
          extendRight
          isFullWidth
          menuRenderer={() => (
            <TokenOrNetworkRenderer tokenOrNetwork={state.tofrom} />
          )}
          value={state.tofrom}
          options={networkOptions}
          hideRightBorder
          onClick={() => {
            networkSelectorModal.open();
            onNetworkSelect.current = (item: Network | Token) => {
              if (item instanceof Token) {
                return;
              }
              if (state.tofrom !== item) {
                  disconnect();
              }
                const fromNetwork = item === state.fromfrom ? networkOptions.filter(n => n !== item)[0] : state.fromfrom;
                const matchingTokenFrom = item === state.fromfrom ? fromNetwork.tokenList.filter(t => t.symbol === state.toto.symbol)[0] : state.fromto;
                const matchingTokenTo = item.tokenList.filter(t => t.symbol === state.toto.symbol)[0];
                setState({
                    ...state,
                    fromfrom: fromNetwork,
                    tofrom: item,
                    fromto: matchingTokenFrom || fromNetwork.tokenList[0],
                    toto: matchingTokenTo || item.tokenList[0],
                });
            };
          }}
        />
        <Select
          disableDefaultMode
          containerClassName={styles.select}
          extendRight
          extendLeft
          isFullWidth
          value={state.toto}
          menuRenderer={() => (
            <TokenOrNetworkRenderer tokenOrNetwork={state.toto} />
          )}
          options={state.fromfrom.tokenList /*tokenOptions*/}
          onClick={() => {
              tokenList.current = state.tofrom.tokenList;
              tokenSelectorNetwork.current = state.tofrom;
            tokenSelectorModal.open();
            onTokenSelect.current = (item: Network | Token) => {
              if (item instanceof Token) {
                setState({ ...state, toto: item });
              }
            };
          }}
        />
        <Input
          placeholder="Enter amount"
          className={styles.input}
          extendLeft
          hideLeftBorder
          value={state.toamount}
          onChange={e => setState({ ...state, fromamount: e.target.value, toamount: e.target.value })}
          rightEl={
            <Button width="18px" color="white" onClick={() => setState({ ...state, fromamount: fromBalance?.toString() || "", toamount: fromBalance?.toString() || "" })}>
              Max
            </Button>
          }
        />
      </Row>
      {/* TO ENDS */}
      {/*<SwapBoxDetails
        data={{
          fee: "24.169.287 USDT",
          minimumReceived: "15.6235 USDT",
          priceImpact: "0.05%",
          rataAfterFee: "1 UST = 1.017 USDT",
        }}
      />*/}
      <Button
        onClick={handleSwap}
        style={{ marginBottom: "1.5rem", marginTop: "2rem" }}
        height="56px"
        width="100%"
        color={theme === "dark" ? "white" : "black"}
      >
        {getSwapButtonContent()}
      </Button>
      <PathRenderer path={[state.fromfrom, state.tofrom]} />
    </div>
  );
};

const PathRenderer = ({ path }: { path: Network[] }): ReactElement => {
  return (
    <Row
      marginBottom={8}
      style={{ marginLeft: "auto", marginRight: "auto", width: "max-content" }}
      justifyContent="center"
    >
      {path.map((item, key) => (
        <Row
          style={{ marginRight: key !== path.length - 1 ? "24px" : "0px" }}
          justifyContent="center"
          key={key}
        >
          <TokenOrNetworkRenderer tokenOrNetwork={item} imgSize={20} />
          {key !== path.length - 1 && (
            <Icon style={{ color: "var(--text)", marginLeft: "16px" }}>
              <FaChevronRight />
            </Icon>
          )}
        </Row>
      ))}
    </Row>
  );
};

export { SwapBox };
