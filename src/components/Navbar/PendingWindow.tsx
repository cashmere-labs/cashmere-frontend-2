import React, { useEffect, useRef } from 'react';
import styles from './PendingWindow.module.scss';
import { chainIdToChain } from '../../constants/chains';
import Big from 'big.js';
import { observer } from 'mobx-react-lite';
import { useInjection } from 'inversify-react';
import PendingTxStore from '../../store/PendingTxStore';
import TimeCounter from '../TimeCounter/TimeCounter';
import { useInViewport } from 'react-in-viewport';
import { Spinner } from '../../ui';
import { MdClear, MdClearAll, MdLaunch } from 'react-icons/all';
import { SwapData } from '../../utils/api';

interface IPendingWindowProps {
    open: boolean;
}

function SwapHistoryListItem({ tx, complete }: { tx: SwapData, complete?: boolean }) {
    const pendingTxStore = useInjection(PendingTxStore);

    const srcChain = chainIdToChain.get(tx.srcChainId);
    const dstChain = chainIdToChain.get(tx.dstChainId);
    const txId = tx.swapId;

    return (
        <div key={tx.swapId} className={styles.item}>
            <div className={styles.data}>
                <div className={styles.title}>
                    {Big(tx.srcAmount || 0).div(`1e${tx?.srcDecimals || 18}`).toFixed(5)} {tx.srcTokenSymbol} on {srcChain?.name || 'SrcChain'} to {tx.dstTokenSymbol} on {dstChain?.name || 'DstChain'}
                </div>
                {complete ? (
                    <div className={styles.subtitle}>
                        Complete
                    </div>
                ) : (
                    <div className={styles.subtitle}>
                        Estimated time: <TimeCounter minutes toTimestamp={(tx.swapInitiatedTimestamp || 0) + 4*60000} />m
                    </div>
                )}
            </div>
            <div className={styles.actions}>
                <div className={styles.remove}>
                    {/*<MdClear size={20} className={styles.remove} />*/}
                </div>
                <div onClick={() => pendingTxStore.setSelectedTxId(txId)}>
                    <MdLaunch size={23} />
                </div>
            </div>
        </div>
    );
};

const PendingWindow = observer(({ open }: IPendingWindowProps) => {
    const pendingTxStore = useInjection(PendingTxStore);
    const loadingItem = useRef<HTMLDivElement>(null);
    const { inViewport } = useInViewport(loadingItem);

    useEffect(() => {
        if (inViewport) {
            console.log('in viewport');
            pendingTxStore.loadHistory();
        }
    }, [inViewport]);

    return (
        <>
            <div className={styles.wrapper} style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none' }}>
                <div className={styles.header}>
                    <span className={styles.title}>Transaction history</span>
                    {/*<MdClearAll size={20} />*/}
                </div>
                <div className={styles.list}>
                    {pendingTxStore.txList.map(tx => <SwapHistoryListItem tx={tx} key={tx.swapId} />)}
                    {pendingTxStore.completeTxList.map(tx => <SwapHistoryListItem tx={tx} key={tx.swapId} complete />)}
                    {pendingTxStore.moreHistory && (
                        <div ref={loadingItem} className={styles.item}>
                            <div className={styles.row}>
                                <Spinner className={styles.spinner} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
});

export default PendingWindow;
