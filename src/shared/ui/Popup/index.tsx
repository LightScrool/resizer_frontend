import React, { PropsWithChildren, useEffect } from "react"
import { createPortal } from "react-dom"
import { useStableFn } from "../../lib/use-stable-fn";

import styles from './styles.module.scss';

const STOP_PROPAGATION = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
};

type Props = {
    isOpen: boolean;
    onClose: VoidFunction;
}

export const Popup: React.FC<PropsWithChildren<Props>> = ({ isOpen, onClose, children }) => {
    const portalTarget = document.getElementById('popupPortal');

    const stableOnClose = useStableFn(onClose);

    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.code !== 'Escape') {
                return;
            }
            stableOnClose();
        }
        
        window.addEventListener('keydown', listener)

        return () => window.removeEventListener('keydown', listener);
    }, [stableOnClose])

    if (!portalTarget || !isOpen) {
        return null;
    }

    const element = (
        <div className={styles.background} onClick={onClose}>
            <div className={styles.popup} onClick={STOP_PROPAGATION}>
                <button className={styles.closeButton} onClick={onClose}/>
                <div className={styles.popupInner}>
                    {children}
                </div>
            </div>
        </div>
    )

    return createPortal(element, portalTarget);
}