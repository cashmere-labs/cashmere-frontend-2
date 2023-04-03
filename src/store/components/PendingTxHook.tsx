import { useInjection } from 'inversify-react';
import PendingTxStore from '../PendingTxStore';
import { useAccount } from 'wagmi';
import useAsyncEffect from 'use-async-effect';

const PendingTxHook = () => {
    const pendingTxStore = useInjection(PendingTxStore);
    const account = useAccount();

    useAsyncEffect(async () => {
        await pendingTxStore.updateAccount(account?.address);
    }, [account]);

    return null;
};

export default PendingTxHook;
