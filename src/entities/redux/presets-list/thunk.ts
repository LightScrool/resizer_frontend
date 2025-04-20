import { createAsyncThunk } from '@reduxjs/toolkit';
import { Preset, ResizerBackendClient } from '../../../shared/api';
import { presetsSelectors } from './slice';
import { createAppAsyncThunk } from '../app-typing';
import { getPresetFromEntity } from './preset-entity';

type FetchProjectsListParams = {
    resizerBackend: ResizerBackendClient;
    projectAlias: string;
}

export const fetchPresetsList = createAsyncThunk(
    'presetsList/fetchPresetsList',
    async ({ resizerBackend, projectAlias }: FetchProjectsListParams, { rejectWithValue }) => {
        try {
            return await resizerBackend.getPresetsList(projectAlias);
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);

type FetchAddPresetParams = {
    resizerBackend: ResizerBackendClient;
    projectAlias: string;
    preset: Preset;
}

export const fetchAddPreset = createAppAsyncThunk(
    'presetsList/fetchAddPreset',
    async ({ resizerBackend, projectAlias, preset }: FetchAddPresetParams, { getState, rejectWithValue }) => {
        try {
            const presets = [
                preset,
                ...presetsSelectors.selectAll((getState())).map(getPresetFromEntity),
            ];
            await resizerBackend.setPresets(projectAlias, presets);
            return preset;
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);

type FetchRemovePresetParams = {
    resizerBackend: ResizerBackendClient;
    projectAlias: string;
    presetAlias: string;
}

export const fetchRemovePreset = createAppAsyncThunk(
    'presetsList/fetchRemovePreset',
    async ({ resizerBackend, projectAlias, presetAlias }: FetchRemovePresetParams, { getState, rejectWithValue }) => {
        try {
            const presets = presetsSelectors.selectAll((getState()))
                .filter(preset => preset.alias !== presetAlias)
                .map(getPresetFromEntity);

            await resizerBackend.setPresets(projectAlias, presets);
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);
