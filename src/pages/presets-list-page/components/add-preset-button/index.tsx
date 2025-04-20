import React, { useState } from "react";
import Button from "../../../../shared/ui/Button/Button";
import { Popup } from "../../../../shared/ui/Popup";
import { PopupContent } from "./popup-content";

type Props = {
    projectAlias: string;
    isDisabled: boolean;
}

export const AddPresetButton: React.FC<Props> = ({ projectAlias, isDisabled }) => {
    const [isPopupOnened, setIsPopupOnened] = useState(false);
    const handleOpenPopup = () => setIsPopupOnened(true);
    const handleClosePopup = () => setIsPopupOnened(false);

    return (
        <>
            <Popup isOpen={isPopupOnened} onClose={handleClosePopup}>
                <PopupContent projectAlias={projectAlias} onClose={handleClosePopup} />
            </Popup>
            <Button
                subtext={isDisabled ? 'Превышено количество пресетов' : undefined}
                disabled={isDisabled}
                onClick={handleOpenPopup}
            >
                Добавить пресет
            </Button>
        </>
    )
}