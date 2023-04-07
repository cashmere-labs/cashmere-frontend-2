import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { ComponentPropsWithoutRef, ReactNode, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Icon } from '../../ui';
import { NetworkBadge } from '../../ui';
import { clsnm } from '../../utils/clsnm';

import styles from './Modal.module.scss';
import { Chain } from '../../constants/chains';

type ModalProps = {
    children: ReactNode;
    isOpen: boolean;
    close?: () => void;
    closeOnClickOutside?: boolean;
    className?: string;
    bodyProps?: ComponentPropsWithoutRef<'div'>;
    width?: string;
    network?: Chain;
    paddingTop?: string;
};

const Modal = ({
                   children,
                   isOpen,
                   close,
                   closeOnClickOutside = true,
                   className,
                   bodyProps = {},
                   width,
                   network,
                   paddingTop = '3.5rem',
               }: ModalProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }
    }, [isOpen]);

    const outsideRef = useOnClickOutside<HTMLDivElement>(() => {
        if (closeOnClickOutside) {
            close?.();
        }
    });

    return isOpen ? (
        <div
            style={{ animationTimingFunction: 'linear' }}
            className={styles.layout}
        >
            <div
                {...bodyProps}
                ref={outsideRef}
                className={clsnm(styles.body, className)}
                style={{
                    width,
                    paddingTop,
                    ...(bodyProps.style || {}),
                }}
            >
                {network != null && (
                    <NetworkBadge className={styles.network} chain={network}/>
                )}
                {close && <Icon
                    hoverable
                    onClick={close}
                    className={styles.close}
                    borderRadius="50%"
                >
                    <IoMdClose/>
                </Icon>}

                {children}
            </div>
        </div>
    ) : null;
};

export { Modal };
