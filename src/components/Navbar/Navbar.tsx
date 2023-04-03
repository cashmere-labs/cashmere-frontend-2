import { Logo } from "../../components";
import { PATHS } from "../../constants/paths";
// import { useModal } from "../../hooks";
import { useMemo, useRef, useState } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Icon } from "../../ui";
import { clsnm } from "../../utils/clsnm";

import styles from "./Navbar.module.scss";
import { useInjection } from 'inversify-react';
import ThemeStore from '../../store/ThemeStore';
import { observer } from 'mobx-react-lite';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { formatValue } from '../../utils/formatValue';
import PendingWindow from './PendingWindow';
import PendingTxStore from '../../store/PendingTxStore';

const Navbar = ({ transparent = false }: { transparent?: boolean }) => {
    const { pathname } = useLocation();
    const themeStore = useInjection(ThemeStore);

    const LINKS = useMemo(() => {
        return [
            {
                name: "Swap",
                url: PATHS.home,
                soon: false,
                active: pathname.startsWith(PATHS.swap),
            },
            // {
            //     name: "Pool",
            //     url: PATHS.pool,
            //     soon: false,
            //     active: pathname.startsWith(PATHS.pool),
            // },
            // {
            //     name: "veCSM",
            //     url: PATHS.veCSM,
            //     soon: false,
            //     active:
            //         pathname.startsWith(PATHS.veCSM) || pathname.startsWith(PATHS.manage),
            // },
            {
                name: "Dashboard",
                url: PATHS.dashboard,
                soon: false,
                active: pathname.startsWith(PATHS.dashboard),
            }
        ];
    }, [pathname]);

    const [show, setShow] = useState(false);
    const smallMenuRef = useRef<HTMLDivElement>(null);
    // const modal = useModal();

    const navbarMenuHandler = () => {
        setShow(!show);
        if (!smallMenuRef.current) return;
        if (!show === true) {
            smallMenuRef.current.animate([{ opacity: 0 }, { opacity: 1 }], {
                duration: 200,
                fill: "forwards",
            });
        } else {
            smallMenuRef.current.animate([{ opacity: 1 }, { opacity: 0 }], {
                duration: 200,
                fill: "forwards",
            });
        }
    };

    const PendingTxsButton = observer(({ mobile }: { mobile: boolean }) => {
        const color = themeStore.theme === "light" ? "black" : "black";

        const pendingTxStore = useInjection(PendingTxStore);

        return (
            <div style={{ position: 'relative' }}>
                {pendingTxStore.txListPendingLength > 0 && (
                    <Button
                        height="40px"
                        onClick={() => pendingTxStore.setPendingWindowOpen(!pendingTxStore.pendingWindowOpen)}
                        color={color}
                        className={clsnm(
                            !mobile ? styles.themeChanger : styles.themeChangerMobile,
                            styles.accountButton,
                        )}
                    >
                        {pendingTxStore.txListPendingLength} pending
                    </Button>
                )}
                <PendingWindow open={pendingTxStore.pendingWindowOpen} />
            </div>
        );
    });

    const ConnectWalletButton = observer(({ mobile }: { mobile: boolean }) => {
        const color = themeStore.theme === "light" ? "black" : "black";

        return (
            <>
                <ConnectButton.Custom>
                    {({
                        account,
                        chain,
                        openAccountModal,
                        openChainModal,
                        openConnectModal,
                        authenticationStatus,
                        mounted,
                    }) => {
                        const ready = mounted && authenticationStatus !== 'loading';
                        const connected =
                            ready &&
                            account &&
                            chain &&
                            (!authenticationStatus ||
                                authenticationStatus === 'authenticated');

                        return (
                            <div
                                {...(!ready ? {
                                    'aria-hidden': true,
                                    'style': {
                                        opacity: 0,
                                        pointerEvents: 'none',
                                        userSelect: 'none',
                                    },
                                } : {
                                    style: {
                                        marginRight: '-5px',
                                    }
                                })}
                            >
                                {(() => {
                                    if (!connected) {
                                        return (
                                            <Button
                                                height="40px"
                                                onClick={openConnectModal}
                                                color={color}
                                                className={clsnm(
                                                    !mobile ? styles.themeChanger : styles.themeChangerMobile,
                                                    styles.accountButton,
                                                )}
                                            >
                                                Connect Wallet
                                            </Button>
                                        );
                                    }

                                    if (chain.unsupported) {
                                        return (
                                            <Button
                                                height="40px"
                                                onClick={openChainModal}
                                                color={color}
                                                className={clsnm(
                                                    !mobile ? styles.themeChanger : styles.themeChangerMobile,
                                                    styles.accountButton,
                                                )}
                                            >
                                                Wrong Network
                                            </Button>
                                        );
                                    }

                                    return (
                                        <div style={{ display: 'flex' }}>
                                            {account.displayBalance && (
                                                <Button
                                                    height="40px"
                                                    onClick={openChainModal}
                                                    color={color}
                                                    className={clsnm(
                                                        !mobile ? styles.themeChanger : styles.themeChangerMobile,
                                                        styles.accountButton,
                                                    )}
                                                >
                                                    {chain.hasIcon && <img src={chain.iconUrl} alt={chain.name} />}
                                                    {formatValue(account.balanceFormatted, 5, true)} {account.balanceSymbol}
                                                </Button>
                                            )}
                                            <Button
                                                height="40px"
                                                onClick={openAccountModal}
                                                color={color}
                                                className={clsnm(
                                                    !mobile ? styles.themeChanger : styles.themeChangerMobile,
                                                    styles.accountButton,
                                                )}
                                                // style={{ cursor: 'default' }}
                                            >
                                                {account.displayName}
                                            </Button>
                                        </div>
                                    );
                                })()}
                            </div>
                        );
                    }}
                </ConnectButton.Custom>
            </>
        );
    });

    const ThemeChangerButton = observer(({ mobile }: { mobile: boolean }) => {
        return (
            <Icon
                onClick={() => themeStore.toggle()}
                className={mobile ? styles.themeChangerMobile : styles.themeChanger}
                borderRadius="12px"
                hoverSize={36}
                hoverable
            >
                {themeStore.theme === "dark" ? <IoMdMoon /> : <IoMdSunny />}
            </Icon>
        );
    });

    return (
        <header
            className={clsnm(styles.navbar, transparent && styles.transparent)}
            id="CashmereHeader"
        >
            {/*<AccountModal modalContoller={modal} />*/}
            <nav style={{ height: "var(--navbar-height)", display: "flex" }}>
                <Container justifyContent="space-between" className={styles.container}>
                    <div className={styles.left}>
                        <Logo />
                    </div>

                    <div className={styles.links}>
                        {LINKS.map((item) => (
                            <div key={item.name} className={styles.linkWrapper}>
                                <Link
                                    className={clsnm(styles.link, item.active && styles.active)}
                                    to={item.soon ? "#" : item.url}
                                >
                                    {item.name}
                                </Link>
                                {item.soon && <span className={styles.soon}>SOON</span>}
                            </div>
                        ))}
                        <div className={styles.linkWrapper}>
                            <a
                                className={styles.link}
                                href='https://forms.monday.com/forms/bd6ab4b322ed2db9a4f94df7706c7683?r=euc1'
                                target='_blank' rel="noreferrer"
                            >
                                Troubleshoot
                            </a>
                        </div>
                    </div>

                    <div className={styles.buttons}>
                        <PendingTxsButton mobile={false} />
                        <ConnectWalletButton mobile={false} />
                        <ThemeChangerButton mobile={false} />
                        {!show && (
                            <button onClick={navbarMenuHandler} className={styles.bar}>
                                <Icon borderRadius="12px" hoverable hoverSize={40} size={20}>
                                    <FaBars />
                                </Icon>
                            </button>
                        )}
                    </div>
                </Container>
            </nav>
            <div
                ref={smallMenuRef}
                className={clsnm(
                    styles.smallMenu,
                    !show && styles.hide,
                    transparent && styles.transparent,
                )}
            >
                <div className={styles.smallMenuHeader}>
                    <Logo />
                    <div className={styles.buttons}>
                        <ThemeChangerButton mobile={true} />
                        <Icon
                            style={{ color: "var(--icon-dark)" }}
                            onClick={navbarMenuHandler}
                            borderRadius="12px"
                            hoverable
                            hoverSize={40}
                        >
                            <FaTimes />
                        </Icon>
                    </div>
                </div>
                <div className={styles.smallLinks}>
                    {LINKS.map((item) => (
                        <div key={item.name} className={styles.linkWrapper}>
                            <Link
                                className={clsnm(styles.link, item.active && styles.active)}
                                to={item.soon ? "#" : item.url}
                            >
                                {item.name}
                            </Link>
                            {item.soon && <span className={styles.soon}>SOON</span>}
                        </div>
                    ))}
                    <div className={styles.connectWalletMobileWrapper}>
                        <PendingTxsButton mobile={false} />
                        <ConnectWalletButton mobile={true} />
                    </div>
                </div>
            </div>
            <div
                className={clsnm(styles.layer, !show && styles.hide)}
                onClick={navbarMenuHandler}
            ></div>
        </header>
    );
};

export { Navbar };
