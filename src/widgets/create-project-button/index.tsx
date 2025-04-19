import React, { useState } from "react";
import Button from "../../shared/ui/Button/Button";
import { Popup } from "../../shared/ui/Popup";
import { PopupContent } from "./popup-content";

type Props = {
    isDisabled: boolean;
}

export const CreateProjectButton: React.FC<Props> = ({ isDisabled }) => {
    const [isPopupOnened, setIsPopupOnened] = useState(false);
    const handleOpenPopup = () => setIsPopupOnened(true);
    const handleClosePopup = () => setIsPopupOnened(false);

    return (
        <>
            <Popup isOpen={isPopupOnened} onClose={handleClosePopup}>
                <PopupContent onClose={handleClosePopup} />
            </Popup>
            <Button
                subtext={isDisabled ? 'Превышено количество проектов' : undefined}
                disabled={isDisabled}
                onClick={handleOpenPopup}
            >
                Создать проект
            </Button>
        </>
    )
}