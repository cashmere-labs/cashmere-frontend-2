import { RotateIcon, SettingsIcon } from '../../assets/icons';
import { Row } from '../../components';
import { SwapConfirmation, TokenOrNetworkRenderer } from '../../components';
import { networkOptions } from '../../constants/networkOptions';
// import { ETHEREUM, POLYGON } from "constants/networks";
// import { tokenOptions } from "constants/tokenOptions";
import { useAccount, useConnection, useOnNetworkChange, useProvider } from 'ethylene/hooks';
import { useDebounce, useModal } from '../../hooks';
import { SwapState } from '../../pages/Swap/Swap';
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { Network } from '../../types/network';
import { Token } from '../../types/token';
import { Button, Icon, Input, Select } from '../../ui';

// import { SwapBoxDetails } from "components/SwapBox/SwapBoxDetails";
import { SwapNetworkSelector } from '../../components/SwapBox/SwapNetworkSelector';
import { SwapSettings } from '../../components/SwapSettings/SwapSettings';
import { SwapSettings as SwapSettingType } from '../../components/SwapSettings/useSwapSettings';

import styles from './SwapBox.module.scss';
import { ethers } from 'ethers';
import { ERC20 as ERC20_ABI } from 'ethylene/constants/abi';
import Big from 'big.js';
import { EthyleneNetwork } from 'ethylene/types/app';
import { apiAddress } from '../../constants/utils';
import { SwapBoxDetails } from './SwapBoxDetails';
import { formatValue } from '../../utils/formatValue';
import { useInjection } from 'inversify-react';
import ThemeStore from '../../store/ThemeStore';
import { observer } from 'mobx-react-lite';

const switchNetwork = function (network: EthyleneNetwork) {
    const fn = async () => {
        try {
            // @ts-ignore
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: network.chainId }],
            });
        } catch (error: any) {
            const WALLET_ERROR_CODE = 4902;

            if (error.code === WALLET_ERROR_CODE) {
                try {
                    // @ts-ignore
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
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
                    console.log('[DEBUG] Network Add error', addError);
                    return;
                }
            }
            console.log('[DEBUG] Switch Network Error');
            return;
        }
    };
    fn().then().catch();
};

const SwapBox = observer(({
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
    const [method, setMethod] = useState<'stable' | 'aggregator'>('stable');
    const [toAmount, setToAmount] = useState('');
    const [minReceiveAmount, setMinReceiveAmount] = useState('');
    const [fee, setFee] = useState('');
    const [priceImpact, setPriceImpact] = useState('');
    const [estimateError, setEstimateError] = useState<string>();
    // const [nativeFee, setNativeFee] = useState<Big>();
    // const [nativeBalance, setNativeBalance] = useState<Big>();

    const [networkId, setNetworkId] = useState<number | undefined>();

    useEffect(() => {
        setNetworkId(provider?.network.chainId);
    }, [provider]);

    useOnNetworkChange(() => {
        setNetworkId(provider?.network.chainId);
    });

    const swapSettingsModal = useModal();
    const swapConfirmationModal = useModal();
    const themeStore = useInjection(ThemeStore);

    const rightNetwork = useMemo(() => networkId === parseInt(state.fromfrom.chainId, 16), [networkId, state]);

    const [fromBalance, setFromBalance] = useState<Big>();
    const [toBalance, setToBalance] = useState<Big>();
    useEffect(() => void (async () => {
        if (!accountAddress) {
            setFromBalance(undefined);
            setToBalance(undefined);
            return;
        }
        const fromProvider = new ethers.providers.JsonRpcProvider(state.fromfrom.rpcUrls[0]);
        const toProvider = new ethers.providers.JsonRpcProvider(state.tofrom.rpcUrls[0]);
        if (state.fromto.address.toLowerCase() !== '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'.toLowerCase()) {
            const fromContract = new ethers.Contract(state.fromto.address, ERC20_ABI, fromProvider);
            setFromBalance(new Big((await fromContract.balanceOf(accountAddress)).toString()).div(new Big(10).pow(state.fromto.decimals)));
        } else {
            setFromBalance(new Big((await fromProvider.getBalance(accountAddress)).toString()).div(new Big(10).pow(state.fromto.decimals)));
        }
        if (state.toto.address.toLowerCase() !== '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'.toLowerCase()) {
            const toContract = new ethers.Contract(state.toto.address, ERC20_ABI, toProvider);
            setToBalance(new Big((await toContract.balanceOf(accountAddress)).toString()).div(new Big(10).pow(state.toto.decimals)));
        } else {
            setToBalance(new Big((await toProvider.getBalance(accountAddress)).toString()).div(new Big(10).pow(state.toto.decimals)));
        }
        // setNativeBalance(new Big((await fromProvider.getBalance(accountAddress)).toString()).div(Big(10).pow(18)));
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
        if (!auth) return 'Connect Wallet';
        if (!rightNetwork) return 'Switch network';
        if (insufficientBalance) return `Insufficient ${fromto.symbol} balance`;
        // if (notEnoughGas) return `Not enough gas (${nativeFee}`
        if (estimateError) return estimateError;
        return 'Swap';
    };

    const estimateAmount = useMemo(() => async () => {
        if (!parseFloat(state.fromamount))
            return;
        setEstimateError('Estimating...');
        const r = await fetch(apiAddress + '/swapEstimateL0?' + new URLSearchParams({
            fromAmount: Big(state.fromamount).mul(Big(10).pow(state.fromto.decimals)).toFixed(0),
            fromChain: parseInt(state.fromfrom.chainId, 16).toString(),
            fromToken: state.fromto.address,
            toChain: parseInt(state.tofrom.chainId, 16).toString(),
            toToken: state.toto.address,
        }));
        const resp = await r.json();
        if (!resp.error) {
            setToAmount(Big(resp.dstAmount).div(Big(10).pow(state.toto.decimals)).toString());
            setMinReceiveAmount(Big(resp.minReceivedDst).div(Big(10).pow(state.toto.decimals)).toString());
            setFee(resp.fee);
            setPriceImpact(resp.priceImpact);
            // setNativeFee(Big(resp.nativeFee));
            setEstimateError(undefined);
        } else if (resp.cause?.code === 'CALL_EXCEPTION' && resp.cause.reason) {
            setEstimateError(resp.cause.reason);
        }
    }, [state]);
    const estimateAmountDebounced = useDebounce(estimateAmount);

    const { fromamount, fromto, fromfrom, toto, tofrom } = state;
    useEffect(() => {
        setToAmount('...');
        setMinReceiveAmount('...');
        estimateAmountDebounced();
    }, [fromamount, fromto, fromfrom, toto, tofrom, estimateAmountDebounced]);

    const insufficientBalance = useMemo(() => Number.isFinite(parseFloat(fromamount)) && fromBalance?.lt(fromamount), [fromamount, fromBalance]);
    // const notEnoughGas = useMemo(() => {
    //     if (!fromBalance || !nativeFee || !nativeBalance)
    //         return false;
    //     let fee = nativeFee;
    //     if (fromto.address === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') {
    //         fee = fee.add(fromamount);
    //     }
    //     return nativeBalance.lt(fee);
    // }, [fromBalance, nativeFee, nativeBalance, fromto.address, fromamount]);

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
            wrapperRef.current.style.boxShadow = 'var(--shadow1)';
        } else {
            wrapperRef.current.style.boxShadow = 'none';
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
                        type: 'network',
                    }}
                />
            )}
            {tokenSelectorModal.isOpen && (
                <SwapNetworkSelector
                    onSelect={onTokenSelect.current}
                    modalController={tokenSelectorModal}
                    options={{
                        data: tokenList.current /*tokenOptions*/,
                        type: 'token',
                        network: tokenSelectorNetwork.current!,
                    }}
                />
            )}
            <SwapSettings modal={swapSettingsModal} swapSettings={swapSettings}/>
            <SwapConfirmation
                data={{
                    fee: '24.169.287 USDT',
                    minimumReceived: '15.6235 USDT',
                    priceImpact: '0.05%',
                    rateAfterFee: '1 UST = 1.017 USDT',
                }}
                modalController={swapConfirmationModal}
                swapSettings={swapSettings}
                from={{
                    amount: state.fromamount,
                    network: state.fromfrom,
                    token: state.fromto,
                }}
                to={{
                    amount: toAmount,
                    network: state.tofrom,
                    token: state.toto,
                }}
            />
            <div className={styles.header}>
                <div>
          <span
              className={styles.tab}
              onClick={() => setMethod('stable')}
              style={{
                  color: method === 'stable' ? 'var(--text)' : 'var(--subtext)',
              }}
          >
            Swap
          </span>
                    <span
                        className={styles.tab}
                        onClick={() => setMethod('aggregator')}
                        style={{
                            color: method === 'aggregator' ? 'var(--text)' : 'var(--subtext)',
                            cursor: 'pointer',
                        }}
                    >
            Aggregator
          </span>
                </div>

                <Icon
                    onClick={swapSettingsModal.open}
                    style={{ color: 'var(--icon-dark)' }}
                    hoverPadding="6px"
                    size={16}
                    hoverable
                >
                    <SettingsIcon/>
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
                <span>BALANCE: {formatValue(fromBalance?.toString(), 4)}</span>
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
                        <TokenOrNetworkRenderer tokenOrNetwork={state.fromfrom}/>
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
                        <TokenOrNetworkRenderer tokenOrNetwork={state.fromto}/>
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
                    onChange={e => setState({ ...state, fromamount: e.target.value })}
                    rightEl={
                        <Button width="18px" color="white"
                                onClick={() => setState({ ...state, fromamount: fromBalance?.toString() || '' })}>
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
                    style={{ color: 'var(--icon-dark)' }}
                    hoverable
                >
                    <RotateIcon/>
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
                <span>BALANCE: {formatValue(toBalance?.toString(), 4)}</span>
            </Row>
            <Row marginBottom={12}>
                <Select
                    disableDefaultMode
                    containerClassName={styles.select}
                    extendRight
                    isFullWidth
                    menuRenderer={() => (
                        <TokenOrNetworkRenderer tokenOrNetwork={state.tofrom}/>
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
                        <TokenOrNetworkRenderer tokenOrNetwork={state.toto}/>
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
                    // placeholder="Enter amount"
                    className={styles.input}
                    extendLeft
                    hideLeftBorder
                    // value={state.toamount}
                    value={formatValue(toAmount, 4)}
                    disabled
                    // onChange={e => setState({ ...state, fromamount: e.target.value, toamount: e.target.value })}
                    // rightEl={
                    //   <Button width="18px" color="white" onClick={() => setState({ ...state, fromamount: fromBalance?.toString() || "", toamount: fromBalance?.toString() || "" })}>
                    //     Max
                    //   </Button>
                    // }
                />
            </Row>
            {/* TO ENDS */}
            <SwapBoxDetails
                data={{
                    fee,
                    minimumReceived: `${formatValue(minReceiveAmount, 4)} ${state.toto.symbol}`,
                    priceImpact: `${formatValue(priceImpact, 4)}%`,
                    rateAfterFee: `1 ${state.fromto.symbol} = ${parseFloat(toAmount) && parseFloat(state.fromamount) && formatValue(new Big(toAmount).div(state.fromamount).toString(), 4)} ${state.toto.symbol}`,
                }}
            />
            <Button
                onClick={handleSwap}
                style={{ marginBottom: '1.5rem', marginTop: '2rem' }}
                height="56px"
                width="100%"
                color={themeStore.theme === 'dark' ? 'white' : 'black'}
                disabled={auth && rightNetwork && (!!estimateError || insufficientBalance)}
            >
                {getSwapButtonContent()}
            </Button>
            <PathRenderer path={[state.fromfrom, state.tofrom]}/>
        </div>
    );
});

const PathRenderer = ({ path }: { path: Network[] }): ReactElement => {
    return (
        <Row
            marginBottom={8}
            style={{ marginLeft: 'auto', marginRight: 'auto', width: 'max-content' }}
            justifyContent="center"
        >
            {path.map((item, key) => (
                <Row
                    style={{ marginRight: key !== path.length - 1 ? '24px' : '0px' }}
                    justifyContent="center"
                    key={key}
                >
                    <TokenOrNetworkRenderer tokenOrNetwork={item} imgSize={20}/>
                    {key !== path.length - 1 && (
                        <Icon style={{ color: 'var(--text)', marginLeft: '16px' }}>
                            <FaChevronRight/>
                        </Icon>
                    )}
                </Row>
            ))}
        </Row>
    );
};

export { SwapBox };
