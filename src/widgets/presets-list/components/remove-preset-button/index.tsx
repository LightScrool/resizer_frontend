import React from "react"

import { useActWithConfirmation } from "../../../../shared/lib/act-with-confirmation";
import { useAppDispatch } from "../../../../entities/redux/app-typing";
import { useResizerBackend } from "../../../../shared/api/hook";
import { fetchRemovePreset } from "../../../../entities/redux/presets-list";

import { RemoveButton } from "../../../../shared/ui/remove-button";

type Props = {
    className?: string;
    projectAlias: string;
    presetAlias: string;
}

export const RemovePresetButton: React.FC<Props> = ({ 
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
        <RemoveButton className={className} onClick={handleClick} />
    )
}