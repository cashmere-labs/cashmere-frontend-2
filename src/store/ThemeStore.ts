import { Theme } from '../types/theme';
import { action, makeObservable, observable, runInAction } from 'mobx';
import store from 'store2';
import RootStore from './RootStore';

export default class ThemeStore {
    @observable public theme: Theme = store.get('theme', 'dark');

    constructor(private rootStore: RootStore) {
        makeObservable(this);
        this.save();
    }

    @action toggle() {
        runInAction(() => this.theme = this.theme == 'dark' ? 'light' : 'dark');
        this.save();
    }

    @action setTheme(value: Theme) {
        runInAction(() => this.theme = value);
        this.save();
    }

    @action private save() {
        store.set('theme', this.theme);
        document.body.classList.remove('dark', 'light');
        document.body.classList.add(this.theme);
    }
}
