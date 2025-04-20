import React, { useState } from "react";
import { Input } from "../../shared/ui/Input/Input";
import Button from "../../shared/ui/Button/Button";
import { useResizerBackend } from "../../shared/api/hook";

import styles from './popup-content.module.scss';
import { useAppDispatch, useAppSelector } from "../../entities/redux/app-typing";
import { fetchCreateProject, selectIsCreateProjectLoading } from "../../entities/redux/projects-list";
import { useAliasInput } from "../../shared/lib/forms";

type Props = {
    onClose: VoidFunction;
}

export const PopupContent: React.FC<Props> = ({ onClose }) => {
    const [alias, setAlias] = useAliasInput();
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();

    const isDisabled = !alias;

    const isLoading = useAppSelector(selectIsCreateProjectLoading);
    const resizerBackend = useResizerBackend();
    const dispatch = useAppDispatch();

    const handleClick = () => {
        if (isDisabled) {
            return;
        }

        dispatch(fetchCreateProject({
            resizerBackend,
            project: {
                alias,
                name,
                description,
            }
        }))
            .unwrap()
            .then(onClose)
    }
    
    return (
        <>
            <div className={styles.fieldsWrapper}>
                <Input label="Алиас*" value={alias || ''} onChange={(e) => setAlias(e.target.value)}/>
                <Input label="Название" value={name} onChange={(e) => setName(e.target.value)}/>
                <Input label="Описание" rows={3} value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <Button isLoading={isLoading} disabled={isDisabled} onClick={handleClick}>Создать</Button>
        </>
    );
}