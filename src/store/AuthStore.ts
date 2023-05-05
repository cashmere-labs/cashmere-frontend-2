import { action, makeObservable, observable } from 'mobx';
import { AuthenticationStatus } from '@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/AuthenticationContext';
import RootStore from './RootStore';
import store from 'store2';
import { SiweMessage } from 'siwe';

export class AuthStore {
    @observable status: AuthenticationStatus = 'loading';
    refreshToken?: string = undefined;
    token?: string = undefined;
    nonceRequestId?: string;

    constructor(private readonly rootStore: RootStore) {
        makeObservable(this);

        this.refreshToken = store.get('refreshToken');
        if (this.refreshToken) {
            this.refreshAuth();
        } else {
            this.logout();
        }

        setInterval(() => this.refreshAuth(), 60000);
    }

    refreshAuth() {
        if (!this.refreshToken) return;
        this.rootStore.api.refresh(this.refreshToken)
            .then(({ accessToken, refreshToken }) => {
                this.updateRefreshToken(refreshToken);
                this.setToken(accessToken);
            })
            .catch(() => {
                this.logout();
            });
    }

    updateNonceRequestId() {
        let requestId, b;
        for(requestId = '', b = 36; requestId.length < 40;)
            requestId += (Math.random() * b | 0).toString(b);
        this.nonceRequestId = requestId;
        return requestId;
    }

    private updateRefreshToken(token?: string) {
        this.refreshToken = token;
        if (token)
            store.set('refreshToken', token);
        else
            store.remove('refreshToken');
    }

    @action setToken(token?: string) {
        if (token === 'undefined')
            token = undefined;
        this.token = token;
        this.status = token ? 'authenticated': 'unauthenticated';
    }

    @action async logout() {
        if (this.token)
            await this.rootStore.api.logout();
        this.setToken(undefined);
        this.updateRefreshToken(undefined);
    }

    createMessage(nonce: string, address: string) {
        return new SiweMessage({
            domain: window.location.host,
            address,
            statement: 'Sign in with Ethereum to the app.',
            uri: window.location.origin,
            version: '1',
            requestId: this.nonceRequestId!,
            nonce,
        });
    }

    async login(message: SiweMessage, signature: string) {
        try {
            const res = await this.rootStore.api.login(message, signature);
            this.setToken(res.accessToken);
            this.updateRefreshToken(res.refreshToken);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}
