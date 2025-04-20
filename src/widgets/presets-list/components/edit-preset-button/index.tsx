import React from "react"

import { EditButton } from "../../../../shared/ui/edit-button";

type Props = {
    className?: string;
    projectAlias: string;
    presetAlias: string;
}

export const EditPresetButton: React.FC<Props> = ({ 
    className,
 }) => {
    
    return (
        <EditButton className={className} onClick={() => {}}/>
    )
}