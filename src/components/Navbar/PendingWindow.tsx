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
import { Api, SwapData } from '../../utils/api';

interface IPendingWindowProps {
    open: boolean;
}

const SwapHistoryListItem = observer(({ tx, complete }: { tx: SwapData, complete?: boolean }) => {
    const pendingTxStore = useInjection(PendingTxStore);
    const api = useInjection(Api);

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
                        Completed
                    </div>
                ) : (
                    <div className={styles.subtitle}>
                        Estimated time: <TimeCounter minutes toTimestamp={(tx.swapInitiatedTimestamp || 0) + 4*60000} />m
                    </div>
                )}
            </div>
            <div className={styles.actions}>
                <div className={styles.remove} >
                    <div className={styles.action} onClick={async () => {
                        await api.hideCompletedSwap(tx.swapId);
                        await pendingTxStore.loadHistory(true);
                    }}>
                        <MdClear size={20} className={styles.remove} />
                    </div>
                </div>
                <div className={styles.action} onClick={() => pendingTxStore.setSelectedTxId(txId)}>
                    <MdLaunch size={23} />
                </div>
            </div>
        </div>
    );
});

const PendingWindow = observer(({ open }: IPendingWindowProps) => {
    const pendingTxStore = useInjection(PendingTxStore);
    const api = useInjection(Api);
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
                    <div className={styles.action} onClick={async () => {
                        await api.hideCompletedSwaps();
                        await pendingTxStore.loadHistory(true);
                    }}>
                        <MdClearAll size={20} />
                    </div>
                </div>
                <div className={styles.list}>
                    {pendingTxStore.txList.map(tx => tx && <SwapHistoryListItem tx={tx} key={tx.swapId} />)}
                    {pendingTxStore.completeTxList.map(tx => tx && <SwapHistoryListItem tx={tx} key={tx.swapId} complete />)}
                    {pendingTxStore.txList.length + pendingTxStore.completeTxList.length === 0 && (
                        <div className={styles.item}>
                            <div className={styles.data}>
                                <div className={styles.title}>
                                    No transaction history
                                </div>
                            </div>
                        </div>
                    )}
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
