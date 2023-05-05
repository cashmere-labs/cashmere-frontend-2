import React, { PropsWithChildren, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import {
    createAuthenticationAdapter,
    darkTheme,
    getDefaultWallets,
    lightTheme,
    RainbowKitAuthenticationProvider,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { useInjection } from 'inversify-react';
import ThemeStore from './store/ThemeStore';
import { activeChains } from './constants/chains';
import { AuthStore } from './store/AuthStore';
import { Api } from './utils/api';

const { chains, provider } = configureChains(
    activeChains,
    [
        publicProvider()
    ]
);

const { connectors } = getDefaultWallets({ appName: 'Cashmere Swap', chains });

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
});

const RainbowKit = observer(({ children }: PropsWithChildren) => {
    const themeStore = useInjection(ThemeStore);
    const authStore = useInjection(AuthStore);
    const api = useInjection(Api);

    const authenticationAdapter = useMemo(() => (
        createAuthenticationAdapter({
            createMessage: ({ nonce, address }) => {
                try {
                    return authStore.createMessage(nonce, address);
                } catch (e) {
                    console.error(e);
                    throw e;
                }
            },
            getMessageBody: ({ message }) => {
                return authStore.prepareMessage(message);
            },
            getNonce: async () => {
                return (await api.getNonce(authStore.updateNonceRequestId())).nonce;
            },
            signOut: async () => {
                return authStore.logout();
            },
            verify: async ({ message, signature }) => {
                return authStore.login(message, signature);
            },
        })
    ), [authStore, api]);

    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitAuthenticationProvider
                adapter={authenticationAdapter}
                status={authStore.status}
            >
                <RainbowKitProvider
                    theme={themeStore.theme === 'dark' ? darkTheme() : lightTheme()}
                    chains={chains}
                >
                    <>
                        {children}
                    </>
                </RainbowKitProvider>
            </RainbowKitAuthenticationProvider>
        </WagmiConfig>
    );
});

export default RainbowKit;
