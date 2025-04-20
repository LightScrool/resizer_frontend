import React, { useState } from "react";

import styles from './popup-content.module.scss';
import { useAliasInput, useNumberInput } from "../../../../shared/lib/forms";
import { useAppDispatch, useAppSelector } from "../../../../entities/redux/app-typing";
import { useResizerBackend } from "../../../../shared/api/hook";
import { Input } from "../../../../shared/ui/Input/Input";
import Button from "../../../../shared/ui/Button/Button";
import { fetchAddPreset, selectIsAddPresetLoading } from "../../../../entities/redux/presets-list";
import { Select } from "../../../../shared/ui/Select/Select";

const SELECT_ORIENTATION_OPTIONS = {
    horizontal: 'Горизонтальная',
    vertical: 'Вертикальная',
}

type Orientation = keyof typeof SELECT_ORIENTATION_OPTIONS;

type Props = {
    projectAlias: string;
    onClose: VoidFunction;
}

export const PopupContent: React.FC<Props> = ({ projectAlias, onClose }) => {
    const [alias, setAlias] = useAliasInput();
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [size, setSize] = useNumberInput();
    const [orientation, setOrientation] = useState<Orientation>(Object.keys(SELECT_ORIENTATION_OPTIONS)[0] as Orientation);

    const isDisabled = !alias || !size || !orientation;

    const isLoading = useAppSelector(selectIsAddPresetLoading);
    const resizerBackend = useResizerBackend();
    const dispatch = useAppDispatch();

    const handleClick = () => {
        if (isDisabled) {
            return;
        }

        dispatch(fetchAddPreset({
            resizerBackend,
            projectAlias,
            preset: {
                alias,
                name,
                description,
                size,
                isHorizontal: orientation === 'horizontal',
            }
        }))
            .unwrap()
            .then(onClose)
    }
    
    return (
        <>
            <div className={styles.fieldsWrapper}>
                <Input label="Алиас*" value={alias} onChange={(e) => setAlias(e.target.value)}/>
                <Input label="Название" value={name} onChange={(e) => setName(e.target.value)}/>
                <Input label="Описание" rows={3} value={description} onChange={(e) => setDescription(e.target.value)}/>
                <Input label="Размер*" value={String(size || '')} onChange={(e) => setSize(e.target.value)}/>
                <Select 
                    label="Ориентация*"
                    options={SELECT_ORIENTATION_OPTIONS}
                    value={orientation}
                    onChange={(e) => setOrientation(e.target.value as Orientation)}
                />
            </div>
            <Button isLoading={isLoading} disabled={isDisabled} onClick={handleClick}>Добавить</Button>
        </>
    );
}
