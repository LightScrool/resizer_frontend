import React, { useState } from "react";
import { Input } from "../../shared/ui/Input/Input";
import Button from "../../shared/ui/Button/Button";
import { useResizerBackend } from "../../shared/api/hook";

import styles from './popup-content.module.scss';

type Props = {
    onClose: VoidFunction;
}

export const PopupContent: React.FC<Props> = ({ onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { createProject } = useResizerBackend();

    const [alias, setAlias] = useState<string>();
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();

    const isDisabled = !alias;

    const handleClick = () => {
        if (isDisabled) {
            return;
        }

        setIsLoading(true);

        createProject({
            alias,
            name,
            description,
        })
            .then(onClose)
            .finally(() => setIsLoading(false));
    }
    
    return (
        <>
            <div className={styles.fieldsWrapper}>
                <Input label="Алиас*" value={alias} onChange={(e) => setAlias(e.target.value)}/>
                <Input label="Проект" value={name} onChange={(e) => setName(e.target.value)}/>
                <Input label="Описание" rows={3} value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <Button isLoading={isLoading} disabled={isDisabled} onClick={handleClick}>Создать</Button>
        </>
    );
}