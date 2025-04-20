import React from "react"

import { EditButton } from "../../../../shared/ui/edit-button";
import { useAppDispatch } from "../../../../entities/redux/app-typing";
import { openEditPopup } from "../../../../entities/redux/presets-list";

type Props = {
    className?: string;
    presetAlias: string;
}

export const EditPresetButton: React.FC<Props> = ({ 
    className,
    presetAlias,
 }) => {
    const dispatch = useAppDispatch();

    const handleOpenPopup = () => dispatch(openEditPopup({ presetAlias }));

    return (
        <EditButton className={className} onClick={handleOpenPopup}/>
    )
}