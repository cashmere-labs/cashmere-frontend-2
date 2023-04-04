import React from 'react';
import styles from './PendingWindow.module.scss';
import { chainIdToChain } from '../../constants/chains';
import Big from 'big.js';
import ZOOM_ICON from '../../assets/icons/zoom.svg';
import { observer } from 'mobx-react-lite';
import { useInjection } from 'inversify-react';
import PendingTxStore from '../../store/PendingTxStore';

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
                    const srcChain = chainIdToChain.get(tx.srcChain);
                    const dstChain = chainIdToChain.get(tx.dstChain);
                    const txId = tx.id;
                    return (
                        <div key={tx.id} className={styles.item}>
                            <div className={styles.title}>
                                {Big(tx.amount).div(`1e${tx?.srcDecimals || 18}`).toFixed(5)} {tx.srcToken} from {srcChain?.name || 'SrcChain'} to {dstChain?.name || 'DstChain'}
                            </div>
                            <div className={styles.more} onClick={() => {
                                pendingTxStore.setSelectedTxId(txId);
                                // modal.open();
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
