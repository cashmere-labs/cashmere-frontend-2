import React from 'react';
import styles from './PendingWindow.module.scss';
import { chainIdToChain } from '../../constants/chains';
import Big from 'big.js';
import ZOOM_ICON from '../../assets/icons/zoom.svg';
import { observer } from 'mobx-react-lite';
import { useInjection } from 'inversify-react';
import PendingTxStore from '../../store/PendingTxStore';
import TimeCounter from '../TimeCounter/TimeCounter';

interface IPendingWindowProps {
    open: boolean;
}

const PendingWindow = observer(({ open }: IPendingWindowProps) => {
    const pendingTxStore = useInjection(PendingTxStore);

    // useEffect(() => {
    //     if (!modal.isOpen)
    //         pendingTxStore.setSelectedTxId(undefined);
    // }, [modal.isOpen, pendingTxStore]);

    return (
        <>
            <div className={styles.wrapper} style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none' }}>
                {pendingTxStore.txList.map(tx => {
                    const srcChain = chainIdToChain.get(tx.srcChainId);
                    const dstChain = chainIdToChain.get(tx.dstChainId);
                    const txId = tx.swapId;
                    return (
                        <div key={tx.swapId} className={styles.item}>
                            <div className={styles.row}>
                                <div className={styles.title}>
                                    {Big(tx.srcAmount || 0).div(`1e${tx?.srcDecimals || 18}`).toFixed(5)} {tx.srcTokenSymbol} on {srcChain?.name || 'SrcChain'} to {tx.dstTokenSymbol} on {dstChain?.name || 'DstChain'}
                                </div>
                                <div className={styles.more} onClick={() => {
                                    pendingTxStore.setSelectedTxId(txId);
                                    // modal.open();
                                }}>
                                    <img src={ZOOM_ICON} alt='More' />
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.title}>
                                    Estimated time: <TimeCounter minutes toTimestamp={(tx.swapInitiatedTimestamp || 0) + 4*60000} />m
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
});

export default PendingWindow;
