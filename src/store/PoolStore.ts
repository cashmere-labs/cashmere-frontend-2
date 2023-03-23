import RootStore from './RootStore';
import { action, makeObservable, observable } from 'mobx';

export default class PoolStore {
    @observable whichPool = false;
    @observable poolCount = 6;
    @observable whichGlobalModal = -1;
    @observable whichPersonalModal = -1;
    @observable functionName = '';
    @observable value = '';

    constructor(private readonly rootStore: RootStore) {
        makeObservable(this);
    }

    @action setWhichPool(value: boolean) {
        this.whichPool = value;
    }

    @action setPoolCount(value: number) {
        this.poolCount = value;
    }

    @action setWhichGlobalModal(value: number) {
        this.whichGlobalModal = value;
    }

    @action setWhichPersonalModal(value: number) {
        this.whichPersonalModal = value;
    }

    @action setFunctionName(value: string) {
        this.functionName = value;
    }

    @action setValue(value: string) {
        this.value = value;
    }
}
