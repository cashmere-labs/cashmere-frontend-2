import React from 'react';
import { ModalController } from '../../../hooks/useModal';
import { Button, Modal } from '../../../ui';
import styles from './QuestsModal.module.scss';
import { ButtonProps } from '../../../ui/Button/Button';
import { observer } from 'mobx-react-lite';
import { useInjection } from 'inversify-react';
import ThemeStore from '../../../store/ThemeStore';

interface IQuestsModalProps {
    modal: ModalController;
}

const QuestsModal = observer(({ modal }: IQuestsModalProps) => {
    const themeStore = useInjection(ThemeStore);

    const color = themeStore.theme === 'dark' ? 'white' : 'black';

    const QuestsButton = ({ href, ...props }: ButtonProps & { href: string }) => (
        <a href={href} target='_blank' rel='noreferrer'>
            <Button
                {...props}
                style={{ marginTop: '1rem' }}
                height="56px"
                width="100%"
                color={color}
            />
        </a>
    );

    return (
        <Modal
            close={modal.close}
            isOpen={modal.isOpen}
            width="660px"
            paddingTop='0'
        >
            <div className={styles.header}>
                <h2 className={styles.title}>Testnet Quests</h2>
            </div>
            <div className={styles.body}>
                <QuestsButton href='https://google.com'>Galxe Quests</QuestsButton>
                <QuestsButton href='https://google.com'>Testnet Early Adopter NFT</QuestsButton>
                <QuestsButton href='https://google.com'>Layer3 Quests</QuestsButton>
                <QuestsButton href='https://google.com'>Crew3 Quests</QuestsButton>
                <QuestsButton href='https://google.com'>Guild.xyz</QuestsButton>
            </div>
        </Modal>
    );
});

export { QuestsModal };
