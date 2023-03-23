import React, { PropsWithChildren } from 'react';
import { observer } from 'mobx-react-lite';
import {
    darkTheme,
    getDefaultWallets, lightTheme,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { useInjection } from 'inversify-react';
import ThemeStore from './store/ThemeStore';
import { activeChains } from './constants/chains';

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

interface IRainbowKitProps extends PropsWithChildren {
}

const RainbowKit = observer(({ children }: IRainbowKitProps) => {
    const themeStore = useInjection(ThemeStore);

    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider
                theme={themeStore.theme === 'dark' ? darkTheme() : lightTheme()}
                chains={chains}
            >
                <>
                    {children}
                </>
            </RainbowKitProvider>
        </WagmiConfig>
    );
});

export default RainbowKit;
