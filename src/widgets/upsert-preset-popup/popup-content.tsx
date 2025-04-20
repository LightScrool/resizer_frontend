import React, { useState } from "react";

import { useAliasInput, useNumberInput } from "../../shared/lib/forms";
import { Input } from "../../shared/ui/Input/Input";
import { Select } from "../../shared/ui/Select/Select";
import Button from "../../shared/ui/Button/Button";

import styles from './popup-content.module.scss';
import { Preset } from "../../shared/api";

const SELECT_ORIENTATION_OPTIONS = {
    horizontal: 'Горизонтальная',
    vertical: 'Вертикальная',
}

type Orientation = keyof typeof SELECT_ORIENTATION_OPTIONS;

type Props = {
    submitText: string;
    isLoading: boolean;
    isAbleToEditAlias?: boolean;
    defaultValue?: Preset;
    onClose: VoidFunction;
    onSubmit: (preset: Preset) => Promise<void>
}

export const PopupContent: React.FC<Props> = ({
        submitText,
        isLoading,
        isAbleToEditAlias=true,
        defaultValue,
        onClose,
        onSubmit
    }) => {

    const [alias, setAlias] = useAliasInput(defaultValue?.alias);
    const [name, setName] = useState<string>(defaultValue?.name || '');
    const [description, setDescription] = useState<string>(defaultValue?.description || '');
    const [size, setSize] = useNumberInput(defaultValue?.size);

    const getOrientationDefaultValue = (): Orientation => {
        if (typeof defaultValue?.isHorizontal === 'boolean') {
            if (defaultValue.isHorizontal) {
                return 'horizontal';
            }
            return 'vertical';
        }

        return Object.keys(SELECT_ORIENTATION_OPTIONS)[0] as Orientation;
    }
    const [orientation, setOrientation] = useState<Orientation>(() => getOrientationDefaultValue());

    const isDisabled = !alias || !size || !orientation;

    const handleClick = () => {
        if (isDisabled) {
            return;
        }
        
        onSubmit({
            alias,
            name,
            description,
            size,
            isHorizontal: orientation === 'horizontal',
        })
            .then(onClose)
    }
    
    return (
        <>
            <div className={styles.fieldsWrapper}>
                <Input label="Алиас*" disabled={!isAbleToEditAlias} value={alias} onChange={(e) => setAlias(e.target.value)}/>
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
            <Button
                isLoading={isLoading}
                disabled={isDisabled}
                onClick={handleClick}
            >
                {submitText}
            </Button>
        </>
    );
}
