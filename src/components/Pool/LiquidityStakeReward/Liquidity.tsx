import { useMemo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Button, Input, Modal, Spinner } from '../../../ui';
import AssetABI from "../../../abi/Asset.json";

import styles from './Liquidity.module.scss';
import { useInjection } from 'inversify-react';
import ThemeStore from '../../../store/ThemeStore';
import { observer } from 'mobx-react-lite';
import PoolStore, { pools } from '../../../store/PoolStore';
import { BigNumber, constants } from 'ethers';
import {
    Address,
    erc20ABI,
    useAccount,
    useBalance, useContract,
    useNetwork,
    useSigner,
    useSwitchNetwork,
    useToken
} from 'wagmi';
import { formatBalance } from '../../../utils/formatBalance';
import toBN from '../../../utils/toBN';
import Big from 'big.js';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import toBig from '../../../utils/toBig';
import { AuthStore } from '../../../store/AuthStore';

const depositFunctionAbi = {
    "inputs": [
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint16",
            "name": "poolId",
            "type": "uint16"
        },
        {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
} as const;

const Liquidity = observer(({ onSuccess }: { onSuccess: () => void }) => {
    const themeStore = useInjection(ThemeStore);
    const poolStore = useInjection(PoolStore);
    const authStore = useInjection(AuthStore);

    const [isPlus, setIsPlus] = useState(true);
    const account = useAccount();
    const { data: signer } = useSigner();
    const { chain } = useNetwork();
    const connectModal = useConnectModal();
    const { switchNetworkAsync } = useSwitchNetwork();
    const [ waitingConfirmation, setWaitingConfirmation ] = useState(false);

    const pool = pools[poolStore.whichGlobalModal];
    const { data: balance, isLoading: balanceLoading } = useBalance({
        address: account?.address,
        token: pool?.tokenAddress,
        chainId: pool?.network
    });
    const { data: token } = useToken({
        address: pool?.tokenAddress,
        chainId: pool?.network
    });
    const routerContract = useContract({
        address: pool?.crossRouterAddress,
        abi: [depositFunctionAbi],
        signerOrProvider: signer,
    });
    const tokenContract = useContract({
        address: pool?.tokenAddress,
        abi: erc20ABI,
        signerOrProvider: signer,
    });

    const isPhoneOrPC = useMediaQuery({
        query: '(max-width: 600px)',
    });

    const rightNetwork = useMemo(() => pool?.network === chain?.id, [chain?.id, pool?.network]);

    const insufficientFunds = useMemo(() => {
        return (balance?.value || toBN(0)).lt(toBN(toBig(poolStore.value).mul(new Big(10).pow(token?.decimals || 0)).toFixed(0)));
    }, [balance?.value, poolStore.value, token?.decimals]);

    const buttonLabel = useMemo(() => {
        if (authStore.status !== 'authenticated')
            return 'Connect wallet';
        if (insufficientFunds)
            return 'Insufficient funds';
        if (!rightNetwork)
            return 'Switch network';
        return 'Add liquidity';
    }, [insufficientFunds, authStore.status, rightNetwork]);

    const buttonAction = async () => {
        if (authStore.status !== 'authenticated') {
            connectModal?.openConnectModal?.();
            return;
        }
        if (!rightNetwork) {
            await switchNetworkAsync?.(pool?.network);
            return;
        }
        setWaitingConfirmation(true);
        try {
            const amount = toBig(poolStore.value).mul(new Big(10).pow(token?.decimals || 0)).toFixed(0);
            if ((await tokenContract?.allowance(account!.address!, pool!.crossRouterAddress))?.lt(amount)) {
                const tx = await tokenContract?.approve(pool!.crossRouterAddress, constants.MaxUint256);
                await tx?.wait();
            }
            console.log([account?.address as Address, 1, amount]);
            const tx = await routerContract?.deposit(account?.address as Address, 1, amount as any);
        } finally {
            setWaitingConfirmation(false);
        }
        onSuccess();
    };

    return (
        <div className={styles.wrapper}>
            {/*<div className={styles.title}>*/}
            {/*    <div>{`${isPlus ? 'Add' : 'Remove'}`} Liquidity</div>*/}
            {/*    <div className={isPlus ? styles.bgPlus : styles.bgMinus}>*/}
            {/*        <div className={styles.dot} onClick={() => setIsPlus(!isPlus)}>*/}
            {/*            {isPlus ? (*/}
            {/*                themeStore.theme === 'light' ? (*/}
            {/*                    <img src={WHITEPLUS}></img>*/}
            {/*                ) : (*/}
            {/*                    <img src={GRAYPLUS}></img>*/}
            {/*                )*/}
            {/*            ) : (*/}
            {/*                <img src={MINUS}></img>*/}
            {/*            )}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className={styles.balance}>
                <div>
                    <Button
                        width={isPhoneOrPC ? '46px' : '65px'}
                        height="34px"
                        color={themeStore.theme === 'light' ? 'transparentWhite' : 'transparentBlack'}
                        disabled={(balance?.value || BigNumber.from(0)).lt(0)}
                        onClick={() => poolStore.setValue(formatBalance((balance!.value!.div(4)).toString(), 4, token?.decimals))}
                    >
                        25%
                    </Button>{' '}
                    <Button
                        width={isPhoneOrPC ? '46px' : '65px'}
                        height="34px"
                        color={themeStore.theme === 'light' ? 'transparentWhite' : 'transparentBlack'}
                        disabled={(balance?.value || BigNumber.from(0)).lt(0)}
                        onClick={() => poolStore.setValue(formatBalance((balance!.value!.div(2)).toString(), 4, token?.decimals))}
                    >
                        50%
                    </Button>{' '}
                    <Button
                        width={isPhoneOrPC ? '46px' : '65px'}
                        height="34px"
                        color={themeStore.theme === 'light' ? 'transparentWhite' : 'transparentBlack'}
                        disabled={(balance?.value || BigNumber.from(0)).lt(0)}
                        onClick={() => poolStore.setValue(formatBalance((balance!.value!.mul(3).div(4)).toString(), 4, token?.decimals))}
                    >
                        75%
                    </Button>
                    <Button
                        width={isPhoneOrPC ? '46px' : '65px'}
                        height="34px"
                        color={themeStore.theme === 'light' ? 'transparentWhite' : 'transparentBlack'}
                        disabled={(balance?.value || BigNumber.from(0)).lt(0)}
                        onClick={() => poolStore.setValue(formatBalance((balance!.value!).toString(), token?.decimals))}
                    >
                        MAX
                    </Button>
                </div>
                <div className={styles['balanceLabel']}>BALANCE: {balance?.formatted || 0}</div>
            </div>
            <div className={styles.inputBox}>
                <div className={styles.pattern}>
                    <img
                        className={styles.image}
                        // src={themeStore.theme === 'light' ? LOGOBLACK : LOGOWHITE}
                        src='https://assets-cdn.trustwallet.com/blockchains/polygon/assets/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174/logo.png'
                    ></img>
                    <div className={styles.text}>USDC</div>
                </div>
                <Input
                    extendLeft
                    placeholder="Amount"
                    height={isPhoneOrPC ? '59px' : '71px'}
                    value={poolStore.value}
                    onChange={(e) => poolStore.setValue(e.target.value.toString())}
                />
            </div>
            {/*<div className={styles.depositingAmount}>*/}
            {/*    <div>*/}
            {/*        <div>Amount Depositing (After Fee)</div>*/}
            {/*        <Tooltip placement="top" content="Content coming here">*/}
            {/*            <Icon size={16}>*/}
            {/*                <InfoIcon/>*/}
            {/*            </Icon>*/}
            {/*        </Tooltip>*/}
            {/*    </div>*/}
            {/*    <div>24680 DAI</div>*/}
            {/*</div>*/}
            {/*<div className={styles.line}></div>*/}
            {/*<div className={styles.fee}>*/}
            {/*    <div>*/}
            {/*        <div>Fee</div>*/}
            {/*        <Tooltip placement="top" content="Content coming here">*/}
            {/*            <Icon size={16}>*/}
            {/*                <InfoIcon/>*/}
            {/*            </Icon>*/}
            {/*        </Tooltip>*/}
            {/*    </div>*/}
            {/*    <div>15.6235 DAI</div>*/}
            {/*</div>*/}
            {/*<div className={styles.line}></div>*/}
            {/*<div className={styles.totalDeposit}>*/}
            {/*    <div>*/}
            {/*        <div>My Total Deposits</div>*/}
            {/*        <Tooltip placement="top" content="Content coming here">*/}
            {/*            <Icon size={16}>*/}
            {/*                <InfoIcon/>*/}
            {/*            </Icon>*/}
            {/*        </Tooltip>*/}
            {/*    </div>*/}
            {/*    <div>34580.21 DAI</div>*/}
            {/*</div>*/}
            {/*<div className={styles.line}></div>*/}
            {/*<div className={styles.poolShare}>*/}
            {/*    <div>*/}
            {/*        <div>Pool Share</div>*/}
            {/*        <Tooltip placement="top" content="Content coming here">*/}
            {/*            <Icon size={16}>*/}
            {/*                <InfoIcon/>*/}
            {/*            </Icon>*/}
            {/*        </Tooltip>*/}
            {/*    </div>*/}
            {/*    <div>0.54%</div>*/}
            {/*</div>*/}
            <div className={styles.liquidityButton}>
                <Button
                    width="100%"
                    height={isPhoneOrPC ? '34px' : '56px'}
                    fontWeight="fw600"
                    color={themeStore.theme === 'light' ? 'black' : 'white'}
                    disabled={insufficientFunds || rightNetwork && toBN(poolStore.value).isZero()}
                    onClick={buttonAction}
                >
                    {buttonLabel}
                </Button>
            </div>
            <Modal
                isOpen={waitingConfirmation}
                bodyProps={{
                    style: {
                        padding: 62,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    },
                }}
                width="660px"
            >
                <h2 style={{ margin: 0 }}>Confirm swap</h2>
                <div style={{ margin: '80px 0' }}><Spinner className={styles.spinner} size={120} /></div>
                <div>Please, sign order using your wallet</div>
            </Modal>
        </div>
    );
});

export { Liquidity };
