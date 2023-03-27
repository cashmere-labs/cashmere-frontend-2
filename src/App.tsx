import { PATHS } from './constants/paths';
import { DAO, ManagePage, Swap } from './pages';
import { NotFound } from './pages/NotFound/NotFound';
import { useEffect } from 'react';
import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
    useLocation,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { observer } from 'mobx-react-lite';
import { useInjection } from 'inversify-react';
import ThemeStore from './store/ThemeStore';
import { useAccount, useDisconnect } from 'wagmi';
import { watchAccount } from '@wagmi/core';

const App = observer(() => {
    const themeStore = useInjection(ThemeStore);
    const { disconnect } = useDisconnect();
    const { address } = useAccount();

    useEffect(() => {
        const unwatch = watchAccount((newAccount) => {
            if (address && address !== newAccount.address)
                disconnect();
        });
        return unwatch;
    }, [address, disconnect]);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={PATHS.home} element={<Navigate to={PATHS.swap}/>}/>
                    <Route path={PATHS.swap} element={<Swap/>}/>
                    {/*<Route path={PATHS.pool} element={<Pool/>}/>*/}
                    {/*<Route path={PATHS.veCSM} element={<VeCSM/>}/>*/}
                    <Route path={PATHS.dao} element={<DAO/>}/>
                    <Route path={`${PATHS.manage}/:id`} element={<ManagePage/>}/>
                    {/* <Route path={"/test"} element={<Test />} />
                        <Route path={"/test2"} element={<Test2 />} /> */}
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
                <NavigationAnimator/>
                <ToastContainer pauseOnHover={false} theme={themeStore.theme}/>
            </BrowserRouter>
        </>
    );
});

const NavigationAnimator = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        document.body.animate([{ opacity: 0.8 }, { opacity: 1 }], {
            duration: 200,
            fill: 'forwards',
        });
        window.scrollTo({ top: 0 });
    }, [pathname]);

    return null;
};

export default App;
