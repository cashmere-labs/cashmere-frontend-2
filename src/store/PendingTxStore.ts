import { action, computed, makeObservable, observable } from 'mobx';
import { SwapProgressEntry } from '../utils/api';
import RootStore from './RootStore';
import { IObservableArray } from 'mobx/src/internal';

const buildFakeKey = (entry: SwapProgressEntry) => `${entry.amount}${entry.srcTokenAddress}${entry.dstTokenAddress}${entry.srcChain}${entry.dstChain}`;

export default class PendingTxStore {
    @observable account?: string;
    @observable txsMap = observable.map<string, SwapProgressEntry>();
    @observable pendingEntries: IObservableArray<string> = observable.array();
    @observable entries: IObservableArray<string> = observable.array();
    @observable completeEntries: IObservableArray<string> = observable.array();
    lock: boolean = false;
    @observable pendingWindowOpen = false;

    constructor(private readonly rootStore: RootStore) {
        makeObservable(this);
        setInterval(() => this.updateTxs(false), 10000);
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
        } finally {
            this.lock = false;
        }
    }

    @action async updateAccount(newAccount?: string) {
        const oldAccount = this.account;
        this.account = newAccount;
        if (oldAccount !== newAccount) {
            await this.updateTxs(true);
        }
    }

    @action addFakeTx(entry: SwapProgressEntry) {
        this.txsMap.set(entry.id, entry);
        this.pendingEntries.push(entry.id);
        console.log('fake', entry);
    }

    @action setPendingWindowOpen(value: boolean) {
        this.pendingWindowOpen = value;
    }

    @computed get txList() {
        return this.pendingEntries.concat(this.entries).map(id => this.txsMap.get(id)!);
    }

    @computed get txListPendingLength() {
        return this.pendingEntries.length + this.entries.length;
    }
}
