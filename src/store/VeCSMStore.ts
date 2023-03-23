import RootStore from './RootStore';
import { action, makeObservable, observable } from 'mobx';

export default class VeCSMStore {
    @observable isActive = false;
    @observable validatorCount = 6;

    constructor(private readonly rootStore: RootStore) {
        makeObservable(this);
    }

    @action setIsActive(value: boolean) {
        this.isActive = value;
    }

    @action setValidatorCount(value: number) {
        this.validatorCount = value;
    }
}
