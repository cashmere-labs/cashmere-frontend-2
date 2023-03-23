import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as InversifyProvider } from 'inversify-react';
import './styles/index.scss';
import '@rainbow-me/rainbowkit/styles.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import RootStore from './store/RootStore';
import RainbowKit from './RainbowKit';

export const rootStore = new RootStore();
const container = rootStore.container;

ReactDOM.render(
    <React.StrictMode>
        <InversifyProvider container={container}>
            <RainbowKit>
                <App/>
            </RainbowKit>
        </InversifyProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

reportWebVitals();

if (import.meta.hot) {
    import.meta.hot.accept();
}
