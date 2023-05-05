import ThemeStore from './ThemeStore';
import { Container } from 'inversify';
import { configure } from 'mobx';
import VeCSMStore from './VeCSMStore';
import { Api } from '../utils/api';
import PendingTxStore from './PendingTxStore';
import { AuthStore } from './AuthStore';

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
    public authStore: AuthStore;
    public api: Api;

    public container: Container;

    constructor() {
        this.api = new Api(this);
        this.themeStore = new ThemeStore(this);
        this.veCsmStore = new VeCSMStore(this);
        this.pendingTxStore = new PendingTxStore(this);
        this.authStore = new AuthStore(this);

        this.container = new Container();
        this.container.bind(ThemeStore).toConstantValue(this.themeStore);
        this.container.bind(VeCSMStore).toConstantValue(this.veCsmStore);
        this.container.bind(PendingTxStore).toConstantValue(this.pendingTxStore);
        this.container.bind(AuthStore).toConstantValue(this.authStore);
        this.container.bind(Api).toConstantValue(this.api);
    }
}

export const rootStore = new RootStore();
