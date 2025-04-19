import React, { createContext, PropsWithChildren, useContext, useState } from "react";
import { Popup } from "../../ui/Popup";
import Button from "../../ui/Button/Button";

import styles from './styles.module.scss';

type Action = () => (void | Promise<void>);

type Confirmation = {
    text: string;
    action: Action;
    isDanger?: boolean;
};

type ContextValue = {
    confirmation: Confirmation | null;
    setConfirmation: (value: Confirmation | null) => void;
}

const Context = createContext<ContextValue>({
    confirmation: null,
    setConfirmation: () => {},
});

const ConfirmationPopup: React.FC<PropsWithChildren> = () => {
    const {confirmation, setConfirmation} = useContext(Context);
    
    const handleClose = () => setConfirmation(null);
    
    const [isLoading, setIsLoading] = useState(false);

    const handleAction = () => {
        const result = confirmation?.action();

        if (!(result instanceof Promise)) {
            handleClose();
            return;
        }
        
        setIsLoading(true);
        result
            .then(() => handleClose())
            .finally(() => setIsLoading(false));
    }

    return (
        <Popup isOpen={Boolean(confirmation)} onClose={handleClose}>
            <h1 className={styles.text}>{confirmation?.text}</h1>
            <div className={styles.buttonsWrapper}>
                <Button preset={confirmation?.isDanger ? 'danger' : 'primary'} isLoading={isLoading} onClick={handleAction}>
                    Подтвердить
                </Button>
                <Button preset="secondary" onClick={handleClose}>
                    Отмена
                </Button>
            </div>
        </Popup>
    )
}

export const useActWithConfirmation = () => {
    const {setConfirmation} = useContext(Context);

    return (text: string, action: Action, isDanger?: boolean) => {
        setConfirmation({
            text,
            action,
            isDanger,
        })
    }
};

export const ActWithConfirmationProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

    return (
        <Context.Provider value={{confirmation, setConfirmation}}>
            <ConfirmationPopup/>
            {children}
        </Context.Provider>
    )
}