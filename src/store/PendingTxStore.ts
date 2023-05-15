import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import RootStore from './RootStore';
import { IObservableArray } from 'mobx/src/internal';
import store from 'store2';
import { getProvider, Provider } from '@wagmi/core';
import { SwapData } from '../utils/api';
import { io, Socket } from 'socket.io-client';
import { apiDomain } from '../constants/utils';

const buildFakeKey = (swapData: SwapData): `0x${string}` => `${swapData.swapInitiatedTxid}-${swapData.srcChainId}`;

export default class PendingTxStore {
    @observable account?: string = undefined;
    @observable txsMap = observable.map<string, SwapData>();
    @observable pendingSwaps: IObservableArray<string> = observable.array();
    @observable ongoingSwaps: IObservableArray<string> = observable.array();
    @observable completeSwaps: IObservableArray<string> = observable.array();
    lock = false;
    historyLock = false;
    @observable pendingWindowOpen = false;
    @observable selectedTxId?: string = undefined;
    @observable provider?: Provider = undefined;
    historyPage = 0;
    @observable completeSwapsCount = 0;
    @observable moreHistory = true;
    private readonly socket: Socket;

    constructor(private readonly rootStore: RootStore) {
        makeObservable(this);
        this.socket = io(`${apiDomain}/progress`, { path: '/api/ws/', transports: ['websocket'] });
        this.socket.on('connect', () => {
            this.account && this.socket.emit('setProgressAddress', { address: this.account });
        });
        this.socket.on('progressUpdate', swapData => this.handleProgressUpdate(swapData));

        setInterval(() => this.checkFailedTxs(), 10000);

        const storageVersion = store.get('storageVersion', 0);
        if (storageVersion === 0) {
            store.set('fakeTxs', []);
            store.set('storageVersion', 1);
        }

        let fakeTxs: (SwapData)[] = store.get('fakeTxs', []);
        console.log('fake', fakeTxs);
        if (fakeTxs.length > 0) {
            rootStore.api.getUndetectedTxids(fakeTxs.map(tx => tx.swapInitiatedTxid)).then(undetectedTxids => {
                fakeTxs = undetectedTxids.map(txid => {
                    const tx = fakeTxs.filter(tx => tx.swapInitiatedTxid === txid)[0];
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
                this.historyPage = 0;
                this.completeSwaps.clear();
            }
            if (!this.account)
                return;
            const res = await this.rootStore.api.transactionHistory(this.account, this.historyPage++);
            runInAction(() => {
                this.completeSwapsCount = res.count;
                for (const swap of res.items) {
                    this.txsMap.set(swap.swapId, swap);
                    if (!this.completeSwaps.includes(swap.swapId)) {
                        this.completeSwaps.push(swap.swapId);
                    }
                }
                if (res.items.length < 10) {
                    this.moreHistory = false;
                }
            });
        } finally {
            this.historyLock = false;
        }
    }

    @action private handleProgressUpdate(swapData: SwapData) {
        if (swapData.receiver !== this.account)
            return;

        // pending swap was found
        if (!this.txsMap.has(swapData.swapId)) {
            const fakeKey = buildFakeKey(swapData);
            if (this.pendingSwaps.includes(fakeKey)) {
                this.pendingSwaps.remove(fakeKey);
                if (this.pendingWindowOpen && this.selectedTxId === fakeKey)
                    this.selectedTxId = swapData.swapId;
            }
            if (!this.ongoingSwaps.includes(swapData.swapId)) {
                this.ongoingSwaps.spliceWithArray(0, 0, [swapData.swapId]);
                console.log('new real', swapData, fakeKey);
            }
        }
        // swap finished
        if (swapData.swapContinueConfirmed) {
            this.ongoingSwaps.remove(swapData.swapId);
            this.loadHistory(true);
        }
        this.txsMap.set(swapData.swapId, swapData);
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
            if (newAccount) {
                this.socket.emit('setProgressAddress', { address: newAccount });
                this.pendingSwaps.clear();
                this.ongoingSwaps.clear();
                await this.loadHistory(true);
            }
        }
    }

    @action addFakeTx(entry: SwapData) {
        entry.swapId = buildFakeKey(entry);
        entry.fake = true;
        this.txsMap.set(entry.swapId, entry);
        this.pendingSwaps.spliceWithArray(0, 0, [entry.swapId]);
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
        return this.pendingSwaps.concat(this.ongoingSwaps).map(id => this.txsMap.get(id)!);
    }

    @computed get completeTxList() {
        return this.completeSwaps.map(id => this.txsMap.get(id)!);
    }

    @computed get pendingSwapsCount() {
        return this.pendingSwaps.length + this.ongoingSwaps.length;
    }
}
