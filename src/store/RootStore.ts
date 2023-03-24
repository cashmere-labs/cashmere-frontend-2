import ThemeStore from './ThemeStore';
import { Container } from 'inversify';
import { configure } from 'mobx';
import VeCSMStore from './VeCSMStore';
import { Api } from '../utils/api';

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
    public api: Api;

    public container: Container;

    constructor() {
        this.themeStore = new ThemeStore(this);
        this.veCsmStore = new VeCSMStore(this);
        this.api = new Api();

        this.container = new Container();
        this.container.bind(ThemeStore).toConstantValue(this.themeStore);
        this.container.bind(VeCSMStore).toConstantValue(this.veCsmStore);
        this.container.bind(Api).toConstantValue(this.api);
    }
}
