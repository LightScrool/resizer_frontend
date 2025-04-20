import React, { useState } from "react";
import Button from "../../../../shared/ui/Button/Button";
import { PopupContent } from "./popup-content";
import { Popup } from "../../../../shared/ui/Popup";

type Props = {
    projectAlias: string;
    isDisabled: boolean;
}

export const AddImageButton: React.FC<Props> = ({ projectAlias, isDisabled }) => {
    const [isPopupOnened, setIsPopupOnened] = useState(false);
        
    const handleOpenPopup = () => setIsPopupOnened(true);
    const handleClosePopup = () => setIsPopupOnened(false);

    return (
        <>
            <Popup isOpen={isPopupOnened} onClose={handleClosePopup}>
                <PopupContent projectAlias={projectAlias} onClose={handleClosePopup}/>
            </Popup>
            <Button
                subtext={isDisabled ? 'Превышено количество изображений' : undefined}
                disabled={isDisabled}
                onClick={handleOpenPopup}
            >
                Загрузить изображение
            </Button>
        </>
    )
}