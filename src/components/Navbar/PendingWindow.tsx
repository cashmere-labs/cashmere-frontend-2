import React, { useState } from 'react';
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
import PendingTxStore from '../../store/PendingTxStore';

interface IPendingWindowProps {
    open: boolean;
}

const PendingWindow = observer(({ open }: IPendingWindowProps) => {
    const theme = useInjection(ThemeStore);
    const pendingTxStore = useInjection(PendingTxStore);
    const modal = useModal();

    const [ selectedTxId, setSelectedTxId ] = useState<string>();
    const selectedTx = selectedTxId ? pendingTxStore.txsMap.get(selectedTxId) : undefined;

    const getProgress = (step: number) => {
        if ((selectedTx?.step || 0) < step) return 'not_started';
        else if ((selectedTx?.step || 0) === step) return 'in_progress';
        else /*(tx.step > step)*/ return 'done';
    };
    // @ts-ignore
    const srcChain = chainIdToChain.get(selectedTx?.srcChain);
    // @ts-ignore
    const dstChain = chainIdToChain.get(selectedTx?.dstChain);
    const modalSteps: TransactionStep[] = [
        {
            title: `Swapping ${Big(selectedTx?.amount || 0).div(`1e${selectedTx?.srcDecimals || 18}`).toFixed(5)} ${selectedTx?.srcToken} to ${selectedTx?.lwsToken}`,
            image: UNISWAP_ICON,
            poweredBy: 'Uniswap',
            // url: UNISWAP_ICON,
            progress: getProgress(0),
        },
        {
            title: `Swapping ${selectedTx?.lwsToken} on ${srcChain?.name} to ${selectedTx?.hgsToken} on ${dstChain?.name}`,
            image: theme.theme === 'dark' ? CASHMERE_WHITE_ICON : CASHMERE_GRAY_ICON,
            poweredBy: 'Cashmere',
            // url: '',
            progress: getProgress(1),
        },
        {
            title: `Swapping ${selectedTx?.hgsToken} to ${selectedTx?.dstToken}`,
            image: UNISWAP_ICON,
            poweredBy: 'Uniswap',
            // url: UNISWAP_ICON,
            progress: getProgress(2),
        },
    ];

    return (
        <>
            <TxProgressModal modalController={modal} steps={modalSteps} />
            <div className={styles.wrapper} style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none' }}>
                {pendingTxStore.txList.map(tx => {
                    const srcChain = chainIdToChain.get(tx.srcChain);
                    const dstChain = chainIdToChain.get(tx.dstChain);
                    return (
                        <div key={tx.id} className={styles.item}>
                            <div className={styles.title}>
                                {Big(tx.amount).div(`1e${tx?.srcDecimals || 18}`).toFixed(5)} {tx.srcToken} from {srcChain?.name || 'SrcChain'} to {dstChain?.name || 'DstChain'}
                            </div>
                            <div className={styles.more} onClick={() => {
                                setSelectedTxId(tx.id);
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
