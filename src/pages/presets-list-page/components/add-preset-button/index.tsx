import React, { useState } from "react";
import Button from "../../../../shared/ui/Button/Button";
import { UsertPresetPopup } from "../../../../widgets/upsert-preset-popup";
import { Preset } from "../../../../shared/api";
import { fetchAddPreset, selectIsAddPresetLoading } from "../../../../entities/redux/presets-list";
import { useResizerBackend } from "../../../../shared/api/hook";
import { useAppDispatch, useAppSelector } from "../../../../entities/redux/app-typing";

type Props = {
    projectAlias: string;
    isDisabled: boolean;
}

export const AddPresetButton: React.FC<Props> = ({ projectAlias, isDisabled }) => {
    const [isPopupOnened, setIsPopupOnened] = useState(false);
    
    const handleOpenPopup = () => setIsPopupOnened(true);
    const handleClosePopup = () => setIsPopupOnened(false);

    const resizerBackend = useResizerBackend();
    const dispatch = useAppDispatch();

    const handleSubmit = async (preset: Preset) => {
        await dispatch(fetchAddPreset({
            resizerBackend,
            projectAlias,
            preset
        })).unwrap()
    }
    
    const isLoading = useAppSelector(selectIsAddPresetLoading);

    return (
        <>
            <UsertPresetPopup
                isOpen={isPopupOnened}
                onClose={handleClosePopup}
                isLoading={isLoading}
                submitText="Добавить"
                onSubmit={handleSubmit}
            />
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