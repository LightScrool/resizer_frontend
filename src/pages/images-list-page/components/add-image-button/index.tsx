import React from "react";
import Button from "../../../../shared/ui/Button/Button";

type Props = {
    projectAlias: string;
    isDisabled: boolean;
}

export const AddImageButton: React.FC<Props> = ({ isDisabled }) => {
    return (
        <>
            <Button
                subtext={isDisabled ? 'Превышено количество изображений' : undefined}
                disabled={isDisabled}
            >
                Добавить изображение
            </Button>
        </>
    )
}