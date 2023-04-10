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

type TxProgressModalProps = {
    modalController: ModalController;
    steps: TransactionStep[];
};

const TxProgressModal = ({ modalController, steps }: TxProgressModalProps) => {
    return (
        <Modal
            className={styles.modal}
            width="512px"
            paddingTop="2.5rem"
            isOpen={modalController.isOpen}
            close={modalController.close}
        >
            <div className={styles.header}>
                <span>Transaction in Progress</span>
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
                This usually takes ~4 minutes
                <br/> but sometimes the wait is longer.
            </div>
        </Modal>
    );
};

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
