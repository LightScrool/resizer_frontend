import { Preset } from "../../../shared/api";
import { RequestStatuses } from "../../../shared/lib/network";

export type PresetEntity = Preset & {
    fetchEditStatus: RequestStatuses;
    fetchRemoveStatus: RequestStatuses;
}

export const createPresetEntity = (preset: Preset): PresetEntity => ({
    ...preset,
    fetchEditStatus: RequestStatuses.IDLE,
    fetchRemoveStatus: RequestStatuses.IDLE,
});

export const getPresetFromEntity = (presetEntity: PresetEntity): Preset => ({
    alias: presetEntity.alias,
    size: presetEntity.size,
    isHorizontal: presetEntity.isHorizontal,
    name: presetEntity.name,
    description: presetEntity.description,
});
