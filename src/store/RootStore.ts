import ThemeStore from './ThemeStore';
import { Container } from 'inversify';
import { configure } from 'mobx';

configure({
    enforceActions: "always",
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: true,
    disableErrorBoundaries: true
});

export default class RootStore {
    public themeStore: ThemeStore;

    public container: Container;

    constructor() {
        this.themeStore = new ThemeStore(this);

        this.container = new Container();
        this.container.bind(ThemeStore).toConstantValue(this.themeStore);
    }
}
