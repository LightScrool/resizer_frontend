import React from "react"

import { UsertPresetPopup } from "../../../upsert-preset-popup";
import { useResizerBackend } from "../../../../shared/api/hook";
import { useAppDispatch, useAppSelector } from "../../../../entities/redux/app-typing";
import { Preset } from "../../../../shared/api";
import { closeEditPopup, fetchEditPreset, presetsSelectors } from "../../../../entities/redux/presets-list";
import { RequestStatuses } from "../../../../shared/lib/network";

type Props = {
    projectAlias: string;
    presetAlias: string;
}

export const EditPresetPopupSlot: React.FC<Props> = ({ 
    projectAlias,
    presetAlias,
 }) => {
    const preset = useAppSelector((state) => presetsSelectors.selectById(state, presetAlias));

    const isLoading = preset.fetchEditStatus === RequestStatuses.PENDING;
    const isPopupOnened = preset.isEditPopupOpened;

    const dispatch = useAppDispatch();

    const handleClosePopup = () => dispatch(closeEditPopup({ presetAlias }));

    const resizerBackend = useResizerBackend();

    const handleSubmit = async (preset: Preset) => {
        await dispatch(fetchEditPreset({
            resizerBackend,
            projectAlias,
            preset
        })).unwrap()
    }

    return (
        <UsertPresetPopup
            isOpen={isPopupOnened}
            onClose={handleClosePopup}
            isLoading={isLoading}
            defaultValue={preset}
            isAbleToEditAlias={false}
            submitText="Сохранить"
            onSubmit={handleSubmit}
        />
    )
}