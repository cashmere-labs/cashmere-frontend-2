import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import RootStore from './RootStore';
import { IObservableArray } from 'mobx/src/internal';
import store from 'store2';
import { getProvider, Provider } from '@wagmi/core';
import { SwapData } from '../utils/api';

const buildFakeKey = (swapData: SwapData): `0x${string}` => `${swapData.swapInitiatedTxid}-${swapData.srcChainId}`;

export default class PendingTxStore {
    @observable account?: string = undefined;
    @observable txsMap = observable.map<string, SwapData>();
    @observable pendingSwaps: IObservableArray<string> = observable.array();
    @observable swaps: IObservableArray<string> = observable.array();
    @observable completeSwaps: IObservableArray<string> = observable.array();
    lock: boolean = false;
    historyLock: boolean = false;
    @observable pendingWindowOpen = false;
    @observable selectedTxId?: string = undefined;
    @observable provider?: Provider = undefined;
    historyPage: number = 0;
    @observable moreHistory: boolean = true;

    constructor(private readonly rootStore: RootStore) {
        makeObservable(this);
        setInterval(() => this.updateTxs(), 2000);
        setInterval(() => this.checkFailedTxs(), 10000);

        let storageVersion = store.get('storageVersion', 0);
        if (storageVersion === 0) {
            store.set('fakeTxs', []);
            store.set('storageVersion', 1);
        }

        let fakeTxs: (SwapData)[] = store.get('fakeTxs', []);
        console.log('fake', fakeTxs);
        if (fakeTxs.length > 0) {
            rootStore.api.getUndetectedTxids(fakeTxs.map(tx => tx.swapInitiatedTxid)).then(undetectedTxids => {
                fakeTxs = undetectedTxids.map(txid => {
                    let tx = fakeTxs.filter(tx => tx.swapInitiatedTxid === txid)[0];
                    runInAction(() => {
                        this.txsMap.set(tx.swapId, tx);
                        this.pendingSwaps.push(tx.swapId);
                    });
                    return tx;
                });
                store.set('fakeTxs', fakeTxs, true);
            });
        }
    }

    @action async loadHistory(reset = false) {
        if (this.historyLock)
            return;
        this.historyLock = true;
        try {
            if (reset) {
                this.completeSwaps.clear();
            }
            if (!this.account)
                return;
            const items = await this.rootStore.api.transactionHistory(this.account, this.historyPage++);
            runInAction(() => {
                for (const swap of items) {
                    this.txsMap.set(swap.swapId, swap);
                    if (!this.completeSwaps.includes(swap.swapId)) {
                        this.completeSwaps.push(swap.swapId);
                    }
                }
                // if (items.length < 5) {
                //     this.moreHistory = false;
                // }
            });
        } finally {
            this.historyLock = false;
        }
    }

    @action private async updateTxs(reset = false) {
        if (this.lock)
            return;
        this.lock = true;
        try {
            if (reset) {
                this.txsMap.clear();
                this.pendingSwaps.clear();
                this.swaps.clear();
            }
            if (!this.account)
                return;
            const updatedEntries = await this.rootStore.api.pendingTransactionsList(this.account);
            runInAction(() => {
                for (const swap of this.swaps) {
                    // finished and disappeared
                    if (updatedEntries.filter(e => e.swapId === swap).length === 0) {
                        const entry: SwapData = { ...this.txsMap.get(swap)!, swapContinueConfirmed: true };
                        this.txsMap.set(entry.swapId, entry);
                        this.completeSwaps.spliceWithArray(0, 0, [swap]);
                        this.swaps.remove(swap);
                    }
                }
                for (const entry of updatedEntries) {
                    // new tx appeared
                    const fakeKey = buildFakeKey(entry);
                    if (this.pendingSwaps.includes(fakeKey)) {
                        this.pendingSwaps.remove(fakeKey);
                        if (this.pendingWindowOpen && this.selectedTxId === fakeKey)
                            this.selectedTxId = entry.swapId;
                    }
                    this.txsMap.set(entry.swapId, entry);
                    if (!this.swaps.includes(entry.swapId)) {
                        this.swaps.push(entry.swapId);
                        console.log('new real', entry, fakeKey);
                    }
                }
            });
        } finally {
            this.lock = false;
        }
    }

    @action private async checkFailedTxs() {
        let fakeTxs: SwapData[] = store.get('fakeTxs', []);
        for (const tx of fakeTxs) {
            const receipt = await getProvider({ chainId: tx.srcChainId }).getTransactionReceipt(tx.swapInitiatedTxid);
            runInAction(() => {
                if (receipt && !receipt.status) {
                    const entry = this.txsMap.get(tx.swapId);
                    if (entry) {
                        entry.failed = 0;
                        this.txsMap.set(tx.swapId, entry);
                        fakeTxs = fakeTxs.filter((t: SwapData) => t.swapId !== tx.swapId);
                    }
                }
            });
        }
        store.set('fakeTxs', fakeTxs);
    }

    @action async updateAccount(newAccount?: string) {
        const oldAccount = this.account;
        this.account = newAccount;
        if (oldAccount !== newAccount) {
            await this.updateTxs(true);
            await this.loadHistory(true);
        }
    }

    @action addFakeTx(entry: SwapData) {
        entry.swapId = buildFakeKey(entry);
        entry.fake = true;
        this.txsMap.set(entry.swapId, entry);
        this.pendingSwaps.push(entry.swapId);
        console.log('fake', entry);
        store.add('fakeTxs', [entry]);
    }

    @action setPendingWindowOpen(value: boolean) {
        this.pendingWindowOpen = value;
    }

    @action setSelectedTxId(value?: string) {
        this.selectedTxId = value;
    }

    @action setProvider(provider: Provider) {
        this.provider = provider;
    }

    @computed get txList() {
        return this.pendingSwaps.concat(this.swaps).map(id => this.txsMap.get(id)!);
    }

    @computed get completeTxList() {
        return this.pendingSwaps.concat(this.completeSwaps).map(id => this.txsMap.get(id)!);
    }

    @computed get txListPendingLength() {
        return this.pendingSwaps.length + this.swaps.length;
    }

    @computed get hasCompleteSwaps() {
        return this.completeSwaps.length;
    }
}
