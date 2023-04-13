import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { SwapProgressEntry } from '../utils/api';
import RootStore from './RootStore';
import { IObservableArray } from 'mobx/src/internal';
import store from 'store2';
import { getProvider, Provider } from '@wagmi/core';

const buildFakeKey = (entry: SwapProgressEntry) => `${entry.amount}-${entry.srcTokenAddress}-${entry.dstTokenAddress}-${entry.srcChain}-${entry.dstChain}-${entry.startTxId}`;

export default class PendingTxStore {
    @observable account?: string = undefined;
    @observable txsMap = observable.map<string, SwapProgressEntry>();
    @observable pendingEntries: IObservableArray<string> = observable.array();
    @observable entries: IObservableArray<string> = observable.array();
    @observable completeEntries: IObservableArray<string> = observable.array();
    lock: boolean = false;
    @observable pendingWindowOpen = false;
    @observable selectedTxId?: string = undefined;
    @observable provider?: Provider = undefined;

    constructor(private readonly rootStore: RootStore) {
        makeObservable(this);
        setInterval(() => this.updateTxs(false), 2000);
        setInterval(() => this.checkFailedTxs(), 10000);

        let fakeTxs: (SwapProgressEntry)[] = store.get('fakeTxs', []);
        console.log('fake', fakeTxs);
        if (fakeTxs.length > 0) {
            rootStore.api.getTxsProcessed(fakeTxs.map(tx => tx.startTxId)).then(processedTxs => {
                processedTxs.forEach(txid => {
                    fakeTxs = fakeTxs.filter(fakeTx => fakeTx.startTxId !== txid);
                });
                console.log(fakeTxs);
                fakeTxs.forEach(tx => {
                    runInAction(() => {
                        this.txsMap.set(tx.id, tx);
                        this.pendingEntries.push(tx.id);
                    });
                });
                store.set('fakeTxs', fakeTxs, true);
            });
        }
    }

    @action private async updateTxs(reset: boolean) {
        if (this.lock)
            return;
        this.lock = true;
        try {
            if (reset) {
                this.txsMap.clear();
                this.pendingEntries.clear();
                this.entries.clear();
            }
            if (!this.account)
                return;
            const updatedEntries = await this.rootStore.api.pendingTxs(this.account);
            runInAction(() => {
                for (const entryId of this.entries) {
                    // finished and disappeared
                    if (updatedEntries.filter(e => e.id === entryId).length === 0) {
                        const entry = { ...this.txsMap.get(entryId)! };
                        const fakeKey = buildFakeKey(entry);
                        entry.step = 3;
                        this.txsMap.set(fakeKey, entry);
                        this.txsMap.set(entry.id, entry);
                        this.completeEntries.push(entryId);
                        this.entries.remove(entryId);
                    }
                }
                for (const entry of updatedEntries) {
                    // new tx appeared
                    const fakeKey = buildFakeKey(entry);
                    if (this.pendingEntries.includes(fakeKey))
                        this.pendingEntries.remove(fakeKey);
                    this.txsMap.set(fakeKey, entry);
                    this.txsMap.set(entry.id, entry);
                    if (!this.entries.includes(entry.id)) {
                        this.entries.push(entry.id);
                        console.log('new real', entry, fakeKey);
                    }
                }
            });
        } finally {
            this.lock = false;
        }

        console.log(await getProvider().getTransactionReceipt('0x359c2bda2e18d7756dd8240b5017c8e86f014b2d81a4b7f6f8a04594c5bfaa9a'))
    }

    @action private async checkFailedTxs() {
        let fakeTxs = store.get('fakeTxs', []);
        for (const tx of fakeTxs) {
            const receipt = await getProvider({ chainId: tx.srcChain }).getTransactionReceipt(tx.startTxId);
            runInAction(() => {
                if (receipt && !receipt.status) {
                    const entry = this.txsMap.get(tx.id);
                    if (entry) {
                        entry.failed = 0;
                        this.txsMap.set(tx.id, entry);
                        fakeTxs = fakeTxs.filter((t: SwapProgressEntry) => t.id !== tx.id);
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
        }
    }

    @action addFakeTx(entry: SwapProgressEntry) {
        entry.id = buildFakeKey(entry);
        this.txsMap.set(entry.id, entry);
        this.pendingEntries.push(entry.id);
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
        return this.pendingEntries.concat(this.entries).map(id => this.txsMap.get(id)!);
    }

    @computed get txListPendingLength() {
        return this.pendingEntries.length + this.entries.length;
    }
}
