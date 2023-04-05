import { RotateIcon, SettingsIcon } from '../../assets/icons';
import { Row } from '../../components';
import { SwapConfirmation, TokenOrNetworkRenderer } from '../../components';
// import { ETHEREUM, POLYGON } from "constants/networks";
// import { tokenOptions } from "constants/tokenOptions";
import { useDebounce, useModal } from '../../hooks';
import { SwapState } from '../../pages/Swap/Swap';
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { Token } from '../../types/token';
import { Button, Icon, Input, Select } from '../../ui';

// import { SwapBoxDetails } from "components/SwapBox/SwapBoxDetails";
import { SwapNetworkSelector } from '../../components/SwapBox/SwapNetworkSelector';
import { SwapSettings } from '../../components/SwapSettings/SwapSettings';
import { SwapSettings as SwapSettingType } from '../../components/SwapSettings/useSwapSettings';

import styles from './SwapBox.module.scss';
import { constants, ethers } from 'ethers';
import Big from 'big.js';
import { apiAddress } from '../../constants/utils';
import { SwapBoxDetails } from './SwapBoxDetails';
import { formatValue } from '../../utils/formatValue';
import { useInjection } from 'inversify-react';
import ThemeStore from '../../store/ThemeStore';
import { observer } from 'mobx-react-lite';
import { erc20ABI, useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { activeChains, Chain } from '../../constants/chains';
import { QuestsModal } from '../Modals/QuestsModal/QuestsModal';

const SwapBox = observer(({
                              state,
                              swapSettings,
                              setState,
                          }: {
    state: SwapState;
    setState: (to: SwapState) => void;
    swapSettings: SwapSettingType;
}) => {
    const { chain } = useNetwork();
    const { switchNetworkAsync } = useSwitchNetwork();
    const account = useAccount();
    const { openConnectModal } = useConnectModal();

    const [method, setMethod] = useState<'stable' | 'aggregator'>('stable');
    const [toAmount, setToAmount] = useState('');
    const [minReceiveAmount, setMinReceiveAmount] = useState('');
    const [fee, setFee] = useState('');
    const [priceImpact, setPriceImpact] = useState('');
    const [estimateError, setEstimateError] = useState<string>();

    const swapSettingsModal = useModal();
    const swapConfirmationModal = useModal();
    const themeStore = useInjection(ThemeStore);
    const questModal = useModal();

    const rightNetwork = useMemo(() => chain?.id === state.fromChain.id, [chain?.id, state.fromChain]);

    const [fromBalance, setFromBalance] = useState<Big>();
    const [toBalance, setToBalance] = useState<Big>();
    useEffect(() => void (async () => {
        if (!account.address) {
            setFromBalance(undefined);
            setToBalance(undefined);
            return;
        }
        const fromProvider = new ethers.providers.JsonRpcProvider(state.fromChain.rpcUrls.default.http[0]);
        const toProvider = new ethers.providers.JsonRpcProvider(state.toChain.rpcUrls.default.http[0]);
        if (state.fromToken.address.toLowerCase() !== '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'.toLowerCase()) {
            const fromContract = new ethers.Contract(state.fromToken.address, erc20ABI, fromProvider);
            setFromBalance(new Big((await fromContract.balanceOf(account.address)).toString()).div(new Big(10).pow(state.fromToken.decimals)));
        } else {
            setFromBalance(new Big((await fromProvider.getBalance(account.address)).toString()).div(new Big(10).pow(state.fromToken.decimals)));
        }
        if (state.toToken.address.toLowerCase() !== '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'.toLowerCase()) {
            const toContract = new ethers.Contract(state.toToken.address, erc20ABI, toProvider);
            setToBalance(new Big((await toContract.balanceOf(account.address)).toString()).div(new Big(10).pow(state.toToken.decimals)));
        } else {
            setToBalance(new Big((await toProvider.getBalance(account.address)).toString()).div(new Big(10).pow(state.toToken.decimals)));
        }
        // setNativeBalance(new Big((await fromProvider.getBalance(account.address)).toString()).div(Big(10).pow(18)));
    })(), [account.address, state.fromChain, state.fromToken, state.toChain, state.toToken]);

    const onNetworkSelect = useRef<(item: Chain | Token) => void>(
        () => undefined,
    );
    const onTokenSelect = useRef<(item: Chain | Token) => void>(
        () => undefined,
    );
    const networkSelectorModal = useModal();
    const tokenSelectorModal = useModal();
    const tokenList = useRef<Token[]>([]);
    const tokenSelectorNetwork = useRef<Chain>();

    /**
     * @dev Reverse the from and to positions
     */
    const reverse = () => {
        const _state = { ...state };
        _state.fromChain = state.toChain;
        _state.fromToken = state.toToken;
        _state.toChain = state.fromChain;
        _state.toToken = state.fromToken;

        setState(_state);
    };

    /**
     * @dev Handles swap action
     */
    const handleSwap = async () => {
        if (!account.isConnected) {
            openConnectModal?.();
            return;
        }
        if (!rightNetwork) {
            switchNetworkAsync?.(state.fromChain.id);
            return;
        }
        swapConfirmationModal.open();
    };

    /**
     * @dev Formats the swap button content
     */
    const getSwapButtonContent = () => {
        if (!account.isConnected) return 'Connect Wallet';
        if (!rightNetwork) return 'Switch network';
        if (insufficientBalance) return `Insufficient ${fromToken.symbol} balance`;
        // if (notEnoughGas) return `Not enough gas (${nativeFee}`
        if (estimateError) return estimateError;
        return 'Swap';
    };

    const estimateAmount = useMemo(() => async () => {
        if (!parseFloat(state.fromAmount))
            return;
        setEstimateError('Estimating...');
        const r = await fetch(apiAddress + '/swapEstimateL0?' + new URLSearchParams({
            fromAmount: Big(state.fromAmount).mul(Big(10).pow(state.fromToken.decimals)).toFixed(0),
            fromChain: state.fromChain.id.toString(),
            fromToken: state.fromToken.address,
            toChain: state.toChain.id.toString(),
            toToken: state.toToken.address,
            receiver: constants.AddressZero,
        }));
        const resp = await r.json();
        if (!resp.error) {
            setToAmount(Big(resp.dstAmount).div(Big(10).pow(state.toToken.decimals)).toString());
            setMinReceiveAmount(Big(resp.minReceivedDst).div(Big(10).pow(state.toToken.decimals)).toString());
            setFee(resp.fee);
            setPriceImpact(resp.priceImpact);
            // setNativeFee(Big(resp.nativeFee));
            setEstimateError(undefined);
        } else if (resp.cause?.code === 'CALL_EXCEPTION' && resp.cause.reason) {
            setEstimateError(resp.cause.reason);
        }
    }, [state]);
    const estimateAmountDebounced = useDebounce(estimateAmount);

    const { fromAmount, fromToken, fromChain, toToken, toChain } = state;
    useEffect(() => {
        setToAmount('...');
        setMinReceiveAmount('...');
        estimateAmountDebounced();
    }, [fromAmount, fromToken, fromChain, toToken, toChain, estimateAmountDebounced]);

    const insufficientBalance = useMemo(() => Number.isFinite(parseFloat(fromAmount)) && fromBalance?.lt(fromAmount), [fromAmount, fromBalance]);

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
                        data: activeChains,
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
                    amount: state.fromAmount,
                    network: state.fromChain,
                    token: state.fromToken,
                }}
                to={{
                    amount: toAmount,
                    network: state.toChain,
                    token: state.toToken,
                }}
            />
            <div className={styles.header}>
                <div>
                    <span
                        className={styles.tab}
                        // onClick={() => setMethod('stable')}
                        style={{
                            // color: method === 'stable' ? 'var(--text)' : 'var(--subtext)',
                            color: 'var(--text)',
                            cursor: 'default',
                        }}
                    >
                        Swap
                    </span>
                    <span
                        className={styles.tab}
                        // onClick={() => setMethod('aggregator')}
                        onClick={() => questModal.open()}
                        style={{
                            // color: method === 'aggregator' ? 'var(--text)' : 'var(--subtext)',
                            color: 'var(--subtext)',
                            cursor: 'pointer',
                        }}
                    >
                        Show Quests
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
                        onNetworkSelect.current = (item: Chain | Token) => {
                            if (item instanceof Token) {
                                return;
                            }
                            // if (state.fromfrom !== item) {
                            //     disconnect();
                            // }
                            const toNetwork = item === state.toChain ? activeChains.filter(n => n !== item)[0] : state.toChain;
                            const matchingTokenFrom = item.tokenList.filter(t => t.symbol === state.fromToken.symbol)[0];
                            const matchingTokenTo = item === state.toChain ? toNetwork.tokenList.filter(t => t.symbol === state.toToken.symbol)[0] : state.toToken;
                            setState({
                                ...state,
                                fromChain: item,
                                toChain: toNetwork,
                                fromToken: matchingTokenFrom || item.tokenList[0],
                                toToken: matchingTokenTo || toNetwork.tokenList[0],
                            });
                        };
                    }}
                    containerClassName={styles.select}
                    extendRight
                    isFullWidth
                    menuRenderer={() => (
                        <TokenOrNetworkRenderer tokenOrNetwork={state.fromChain}/>
                    )}
                    value={state.fromChain}
                    setValue={() => undefined}
                    options={activeChains}
                    hideRightBorder
                />
                <Select
                    disableDefaultMode
                    containerClassName={styles.select}
                    extendRight
                    extendLeft
                    isFullWidth
                    menuRenderer={() => (
                        <TokenOrNetworkRenderer tokenOrNetwork={state.fromToken}/>
                    )}
                    value={state.fromToken}
                    setValue={() => undefined}
                    options={state.fromChain.tokenList /*tokenOptions*/}
                    onClick={() => {
                        tokenList.current = state.fromChain.tokenList;
                        tokenSelectorNetwork.current = state.fromChain;
                        tokenSelectorModal.open();
                        onTokenSelect.current = (item: Chain | Token) => {
                            if (item instanceof Token) {
                                setState({ ...state, fromToken: item });
                            }
                        };
                    }}
                />
                <Input
                    placeholder="Enter amount"
                    className={styles.input}
                    extendLeft
                    hideLeftBorder
                    value={state.fromAmount}
                    onChange={e => setState({ ...state, fromAmount: e.target.value })}
                    rightEl={
                        <Button width="18px" color="white"
                                onClick={() => setState({ ...state, fromAmount: fromBalance?.toString() || '' })}>
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
                        <TokenOrNetworkRenderer tokenOrNetwork={state.toChain}/>
                    )}
                    value={state.toChain}
                    options={activeChains}
                    hideRightBorder
                    onClick={() => {
                        networkSelectorModal.open();
                        onNetworkSelect.current = (item: Chain | Token) => {
                            if (item instanceof Token) {
                                return;
                            }
                            // if (state.tofrom !== item) {
                            //     disconnect();
                            // }
                            const fromNetwork = item === state.fromChain ? activeChains.filter(n => n !== item)[0] : state.fromChain;
                            const matchingTokenFrom = item === state.fromChain ? fromNetwork.tokenList.filter(t => t.symbol === state.toToken.symbol)[0] : state.fromToken;
                            const matchingTokenTo = item.tokenList.filter(t => t.symbol === state.toToken.symbol)[0];
                            setState({
                                ...state,
                                fromChain: fromNetwork,
                                toChain: item,
                                fromToken: matchingTokenFrom || fromNetwork.tokenList[0],
                                toToken: matchingTokenTo || item.tokenList[0],
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
                    value={state.toToken}
                    menuRenderer={() => (
                        <TokenOrNetworkRenderer tokenOrNetwork={state.toToken}/>
                    )}
                    options={state.fromChain.tokenList /*tokenOptions*/}
                    onClick={() => {
                        tokenList.current = state.toChain.tokenList;
                        tokenSelectorNetwork.current = state.toChain;
                        tokenSelectorModal.open();
                        onTokenSelect.current = (item: Chain | Token) => {
                            if (item instanceof Token) {
                                setState({ ...state, toToken: item });
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
                    minimumReceived: `${formatValue(minReceiveAmount, 4)} ${state.toToken.symbol}`,
                    priceImpact: `${formatValue(priceImpact, 4)}%`,
                    rateAfterFee: `1 ${state.fromToken.symbol} = ${parseFloat(toAmount) && parseFloat(state.fromAmount) && formatValue(new Big(toAmount).div(state.fromAmount).toString(), 4)} ${state.toToken.symbol}`,
                }}
            />
            <Button
                onClick={handleSwap}
                style={{ marginBottom: '1.5rem', marginTop: '2rem' }}
                height="56px"
                width="100%"
                color={themeStore.theme === 'dark' ? 'white' : 'black'}
                disabled={account.isConnected && rightNetwork && (!!estimateError || insufficientBalance)}
            >
                {getSwapButtonContent()}
            </Button>
            <PathRenderer path={[state.fromChain, state.toChain]}/>
            <QuestsModal modal={questModal} />
        </div>
    );
});

const PathRenderer = ({ path }: { path: Chain[] }): ReactElement => {
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
