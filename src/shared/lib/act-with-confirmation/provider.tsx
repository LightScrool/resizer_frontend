import React, { PropsWithChildren, useContext, useState } from "react";
import { Popup } from "../../ui/Popup";
import Button from "../../ui/Button/Button";
import { actWithConfirmationContext, Confirmation } from "./context";

import styles from './styles.module.scss';


const ConfirmationPopup: React.FC<PropsWithChildren> = () => {
    const {confirmation, setConfirmation} = useContext(actWithConfirmationContext);
    
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

export const ActWithConfirmationProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

    return (
        <actWithConfirmationContext.Provider value={{confirmation, setConfirmation}}>
            <ConfirmationPopup/>
            {children}
        </actWithConfirmationContext.Provider>
    )
}