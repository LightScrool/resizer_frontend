import React, { ComponentProps } from "react"
import { Popup } from "../../shared/ui/Popup"
import { PopupContent } from "./popup-content"

type Props = ComponentProps<typeof PopupContent> & {
    isOpen: boolean;
}

export const UsertPresetPopup: React.FC<Props> = ({ isOpen, onClose, ...props }) => {
    return (
        <Popup isOpen={isOpen} onClose={onClose}>
            <PopupContent {...props} onClose={onClose} />
        </Popup>
    )
}