import React from "react"

import { useActWithConfirmation } from "../../../../shared/lib/act-with-confirmation";
import { useAppDispatch } from "../../../../entities/redux/app-typing";
import { useResizerBackend } from "../../../../shared/api/hook";
import { fetchRemoveImage } from "../../../../entities/redux/images-list";

import { RemoveButton } from "../../../../shared/ui/remove-button";

type Props = {
    className?: string;
    projectAlias: string;
    imageId: string;
}

export const RemoveImageButton: React.FC<Props> = ({ 
    className,
    projectAlias,
    imageId,
 }) => {
    const actWithConfirmation = useActWithConfirmation();
    const dispatch = useAppDispatch();
    const resizerBackend = useResizerBackend();

    const handleClick = () => {
        actWithConfirmation(
            'Вы уверены, что хотите удалить изображение?',
            async () => {
                await dispatch(fetchRemoveImage({ 
                    resizerBackend,
                    projectAlias,
                    imageId,
                 })).unwrap();
            },
            true,
        )
    }
    
    return (
        <RemoveButton className={className} onClick={handleClick} />
    )
}