import ThemeStore from './ThemeStore';
import { Container } from 'inversify';
import { configure } from 'mobx';
import VeCSMStore from './VeCSMStore';

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

    public container: Container;

    constructor() {
        this.themeStore = new ThemeStore(this);
        this.veCsmStore = new VeCSMStore(this);

        this.container = new Container();
        this.container.bind(ThemeStore).toConstantValue(this.themeStore);
        this.container.bind(VeCSMStore).toConstantValue(this.veCsmStore);
    }
}
