import React from "react"
import cn from "classnames"

import { useActWithConfirmation } from "../../../../shared/lib/act-with-confirmation";
import { useAppDispatch } from "../../../../entities/redux/app-typing";
import { useResizerBackend } from "../../../../shared/api/hook";
import { fetchRemovePreset } from "../../../../entities/redux/presets-list";

import icon from './assets/trash-can-regular.svg';
import styles from './styles.module.scss';

type Props = {
    className?: string;
    projectAlias: string;
    presetAlias: string;
}

export const RemoveButton: React.FC<Props> = ({ 
    className,
    projectAlias,
    presetAlias,
 }) => {
    const actWithConfirmation = useActWithConfirmation();
    const dispatch = useAppDispatch();
    const resizerBackend = useResizerBackend();

    const handleClick = () => {
        actWithConfirmation(
            'Вы уверены, что хотите удалить пресет?',
            async () => {
                await dispatch(fetchRemovePreset({ 
                    resizerBackend,
                    projectAlias,
                    presetAlias,
                 })).unwrap();
            },
            true,
        )
    }
    
    return (
        <button className={cn(className, styles.button)} onClick={handleClick}>
            <img className={styles.icon} src={icon} />
        </button>
    )
}