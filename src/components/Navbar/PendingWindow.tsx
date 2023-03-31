import React, { useEffect, useRef, useState } from 'react';
import { SwapProgressEntry } from '../../utils/api';
import styles from './PendingWindow.module.scss';
import { chainIdToChain } from '../../constants/chains';
import Big from 'big.js';
import ZOOM_ICON from '../../assets/icons/zoom.svg';
import { TxProgressModal } from '../Modals/TxProgressModal/TxProgressModal';
import { useModal } from '../../hooks';
import { TransactionStep } from '../../types/app';
import CASHMERE_GRAY_ICON from '../../assets/images/cashmereGray.png';
import CASHMERE_WHITE_ICON from '../../assets/images/cashmereWhite.png';
import UNISWAP_ICON from '../../assets/images/uniswap.svg';
import { observer } from 'mobx-react-lite';
import { useInjection } from 'inversify-react';
import ThemeStore from '../../store/ThemeStore';
import useStateRef from 'react-usestateref';

interface IPendingWindowProps {
    open: boolean;
    txs: SwapProgressEntry[];
}

const PendingWindow = observer(({ open, txs }: IPendingWindowProps) => {
    const theme = useInjection(ThemeStore);
    const modal = useModal();
    const [ modalTx, setModalTx, modalTxRef ] = useStateRef<SwapProgressEntry>();

    const getProgress = (step: number) => {
        if ((modalTx?.step || 0) < step) return 'not_started';
        else if ((modalTx?.step || 0) === step) return 'in_progress';
        else /*(tx.step > step)*/ return 'done';
    };
    const modalSteps: TransactionStep[] = [
        {
            title: `Swapping ${Big(modalTx?.amount || 0).div(`1e${modalTx?.srcDecimals || 18}`).toFixed(5)} ${modalTx?.srcToken} to ${modalTx?.lwsToken}`,
            image: UNISWAP_ICON,
            poweredBy: 'Uniswap',
            // url: UNISWAP_ICON,
            progress: getProgress(1),
        },
        {
            title: `Swapping ${modalTx?.lwsToken} on source chain to ${modalTx?.hgsToken} on destination chain`,
            image: theme.theme === 'dark' ? CASHMERE_WHITE_ICON : CASHMERE_GRAY_ICON,
            poweredBy: 'Cashmere',
            // url: '',
            progress: getProgress(2),
        },
        {
            title: `Swapping ${modalTx?.hgsToken} to ${modalTx?.dstToken}`,
            image: UNISWAP_ICON,
            poweredBy: 'Uniswap',
            // url: UNISWAP_ICON,
            progress: getProgress(2.5),
        },
    ];

    useEffect(() => {
        if (!modalTxRef.current) return;
        let txFound = false;
        for (const tx of txs) {
            if (tx.id === modalTxRef.current.id) {
                txFound = true;
                setModalTx(tx);
                return;
            }
        }
        if (!txFound) {
            setModalTx({
                ...modalTxRef.current,
                step: 3,
            });
        }
    }, [txs]);

    return (
        <>
            <TxProgressModal modalController={modal} steps={modalSteps} />
            <div className={styles.wrapper} style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none' }}>
                {txs.map(tx => {
                    const srcChain = chainIdToChain.get(tx.srcChain);
                    const dstChain = chainIdToChain.get(tx.dstChain);
                    return (
                        <div key={tx.id} className={styles.item}>
                            <div className={styles.title}>
                                {Big(tx.amount).div(`1e${tx?.srcDecimals || 18}`).toFixed(5)} {tx.srcToken} from {srcChain?.name || 'SrcChain'} to {dstChain?.name || 'DstChain'}
                            </div>
                            <div className={styles.more} onClick={() => {
                                setModalTx(tx);
                                modal.open();
                            }}>
                                <img src={ZOOM_ICON} alt='More' />
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
});

export default PendingWindow;
