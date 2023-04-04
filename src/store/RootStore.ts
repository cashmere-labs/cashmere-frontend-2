import ThemeStore from './ThemeStore';
import { Container } from 'inversify';
import { configure } from 'mobx';
import VeCSMStore from './VeCSMStore';
import { Api } from '../utils/api';
import PendingTxStore from './PendingTxStore';

configure({
    enforceActions: "always",
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: true,
    disableErrorBoundaries: true
});

export default class RootStore {
    public themeStore: ThemeStore;
    public veCsmStore: VeCSMStore;
    public pendingTxStore: PendingTxStore;
    public api: Api;

    public container: Container;

    constructor() {
        this.api = new Api();
        this.themeStore = new ThemeStore(this);
        this.veCsmStore = new VeCSMStore(this);
        this.pendingTxStore = new PendingTxStore(this);

        this.container = new Container();
        this.container.bind(ThemeStore).toConstantValue(this.themeStore);
        this.container.bind(VeCSMStore).toConstantValue(this.veCsmStore);
        this.container.bind(PendingTxStore).toConstantValue(this.pendingTxStore);
        this.container.bind(Api).toConstantValue(this.api);
    }
}

export const rootStore = new RootStore();
