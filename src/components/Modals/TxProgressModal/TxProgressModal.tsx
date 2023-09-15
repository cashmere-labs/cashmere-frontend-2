import { Row } from '../../../components';
import { ModalController } from '../../../hooks/useModal';
import { ReactNode } from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import { TransactionStep } from '../../../types/app';
import { Icon, Modal, Spinner } from '../../../ui';
import { clsnm } from '../../../utils/clsnm';
import OkIcon from '../../../assets/icons/ok.svg';
import OkIconDark from '../../../assets/icons/ok-dark.svg';
import FailIcon from '../../../assets/icons/fail.svg';
import FailIconDark from '../../../assets/icons/fail-dark.svg';

import styles from './TxProgressModal.module.scss';
import { observer } from 'mobx-react-lite';
import { useInjection } from 'inversify-react';
import ThemeStore from '../../../store/ThemeStore';
import { chainIdToChain } from '../../../constants/chains';
import Big from 'big.js';
import UNISWAP_ICON from '../../../assets/images/uniswap.svg';
import CASHMERE_WHITE_ICON from '../../../assets/images/cashmereWhite.png';
import CASHMERE_GRAY_ICON from '../../../assets/images/cashmereGray.png';
import { SwapData } from '../../../utils/api';

type TxProgressModalProps = {
    modalController: ModalController;
    selectedTx?: SwapData;
};

const TxProgressModal = observer(({ modalController, selectedTx }: TxProgressModalProps) => {
    const themeStore = useInjection(ThemeStore);

    // @ts-ignore
    const srcChain = chainIdToChain.get(selectedTx?.srcChainId);
    // @ts-ignore
    const dstChain = chainIdToChain.get(selectedTx?.dstChainId);
    const steps: TransactionStep[] = [
        {
            title: `Swapping ${Big(selectedTx?.srcAmount || 0).div(`1e${selectedTx?.srcDecimals || 18}`).toFixed(5)} ${selectedTx?.srcTokenSymbol} to ${selectedTx?.lwsTokenSymbol}`,
            image: UNISWAP_ICON,
            poweredBy: 'Uniswap',
            url: `${srcChain?.blockExplorers?.default.url}/tx/${selectedTx?.swapInitiatedTxid}`,
            // url: UNISWAP_ICON,
            progress: (() => {
                if (typeof selectedTx?.failed !== 'undefined') return 'failed';
                return selectedTx?.fake ? 'in_progress' : 'done';
            })(),
        },
        {
            title: `Swapping ${selectedTx?.lwsTokenSymbol} on ${srcChain?.name} to ${selectedTx?.hgsTokenSymbol} on ${dstChain?.name}`,
            image: themeStore.theme === 'dark' ? CASHMERE_WHITE_ICON : CASHMERE_GRAY_ICON,
            poweredBy: 'Cashmere',
            url: selectedTx?.l0Link && `https://testnet.axelarscan.io/${selectedTx.l0Link}`,
            progress: (() => {
                if (!selectedTx?.fake) return 'done';
                // if (!selectedTx?.fake) return 'in_progress';
                return 'not_started';
            })(),
        },
        {
            title: `Swapping ${selectedTx?.hgsTokenSymbol} to ${selectedTx?.dstTokenSymbol}`,
            image: UNISWAP_ICON,
            poweredBy: 'Uniswap',
            url: selectedTx?.swapContinueTxid && `${dstChain?.blockExplorers?.default.url}/tx/${selectedTx.swapContinueTxid}`,
            progress: (() => {
                if (!selectedTx?.fake) {
                    if (selectedTx?.swapContinueConfirmed) return 'done';
                    return 'in_progress';
                }
                return 'not_started';
            })(),
        },
    ];

    return (
        <Modal
            className={styles.modal}
            width="512px"
            paddingTop="2.5rem"
            isOpen={modalController.isOpen}
            close={modalController.close}
        >
            <div className={styles.header}>
                <span>{selectedTx?.swapContinueConfirmed ? 'Transaction complete' : 'Transaction in Progress'}</span>
            </div>
            <div className={styles.body}>
                {steps.map((item, key) => (
                    <div key={key} className={styles.step}>
                        <div className={styles.progress}>
                            <RenderProgress progress={item.progress}/>
                        </div>
                        <div className={styles.content}>
                              <span className={styles.titleWrapper}>
                                <Row>
                                    <span className={styles.title}>{item.title}</span>
                                    {item.url && (
                                        <a href={item.url} target='_blank' rel='noreferrer'>
                                            <Icon className={styles.link} size={20}>
                                                <BiLinkExternal/>
                                            </Icon>
                                        </a>
                                    )}
                                </Row>
                            </span>
                            <div className={styles.label}>
                                <img src={item.image}/>
                                <span>Powered by {item.poweredBy}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.footer}>
                {!selectedTx?.swapContinueConfirmed && (
                    <div>
                        This usually takes ~4 minutes<br/> but sometimes the wait is longer.
                    </div>
                )}
                <div className={styles.swapidfooter}>
                    Swap ID: {selectedTx?.swapId}
                </div>
            </div>
        </Modal>
    );
});

const RenderProgress = observer(({
                                     progress,
                                 }: {
    progress: TransactionStep['progress'];
}) => {
    const theme = useInjection(ThemeStore);

    const Wrapper = ({ children }: { children: ReactNode }) => {
        return (
            <div className={clsnm(styles['line-wrapper'], progress)}>
                <div className={styles.circle}>
                    {children}
                </div>
            </div>
        );
    };


    if (progress === 'done') {
        return (
            <Wrapper>
                <img src={theme.theme === 'dark' ? OkIconDark : OkIcon} width={52} style={{ margin: -10 }}/>
            </Wrapper>
        );
    } else if (progress === 'in_progress') {
        return (
            <Wrapper>
                <Spinner className={styles.spinner} size={20}/>
            </Wrapper>
        );
    } else if (progress === 'failed') {
        return (
            <Wrapper>
                <img src={theme.theme === 'dark' ? FailIconDark : FailIcon} width={52} style={{ margin: -10 }}/>
            </Wrapper>
        );
    } else {
        return <Wrapper>{null}</Wrapper>;
    }
});

export { TxProgressModal };
