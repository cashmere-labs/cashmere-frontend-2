import { useInjection } from 'inversify-react';
import PendingTxStore from '../PendingTxStore';
import { useAccount } from 'wagmi';
import { useEffect } from 'react';
import { useDebounce } from '../../hooks';

const PendingTxHook = () => {
    const pendingTxStore = useInjection(PendingTxStore);
    const account = useAccount();
    const updateAccountDebounced = useDebounce(() => {
        pendingTxStore.updateAccount(account?.address);
    }, 100);

    useEffect(() => {
        updateAccountDebounced();
    }, [updateAccountDebounced]);

    return null;
};

export default PendingTxHook;
