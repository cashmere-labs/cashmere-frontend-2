import RootStore, { rootStore } from './RootStore';
import { action, observable, ObservableMap, runInAction } from 'mobx';
import store from 'store2';
import { useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { observer } from 'mobx-react-lite';
import { useInjection } from 'inversify-react';

export class CacheStore {
    @observable loadedCache: ObservableMap<string, any> = observable.map();

    constructor(private readonly rootStore: RootStore) {}

    @action async load<T>(key: string, getter: () => Promise<T>): Promise<T> {
        if (this.loadedCache.has(key))
            return this.loadedCache.get(key);
        const storageCached = store.get(`cache-${key}`);
        if (storageCached) {
            this.loadedCache.set(key, storageCached);
            return storageCached;
        }
        const value = await getter();
        runInAction(() => {
            this.loadedCache.set(key, value);
        })
        store.set(`cache-${key}`, value);
        return value;
    }
}

export function useCache<T>(key: string, getter: () => Promise<T>, disabled = false) {
    const cache = useInjection(CacheStore);
    const [ value, setValue ] = useState<T>();

    useAsyncEffect(async () => {
        if (disabled)
            return;
        setValue(await cache.load(key, getter));
    }, [key, getter, disabled]);

    return value;
}
