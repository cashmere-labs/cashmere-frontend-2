import { EthyleneProvider } from 'ethylene/utils';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as InversifyProvider } from 'inversify-react';
import { store } from './store';
import './styles/index.scss';

import App from './App';
import reportWebVitals from './reportWebVitals';
import RootStore from './store/RootStore';

export const rootStore = new RootStore();
const container = rootStore.container;

ReactDOM.render(
    <React.StrictMode>
        <ReduxProvider store={store}>
            <InversifyProvider container={container}>
                <EthyleneProvider>
                    <App/>
                </EthyleneProvider>
            </InversifyProvider>
        </ReduxProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

reportWebVitals();

if (import.meta.hot) {
    import.meta.hot.accept();
}
