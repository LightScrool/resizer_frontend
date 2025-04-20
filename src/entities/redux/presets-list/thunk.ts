import { createAsyncThunk } from '@reduxjs/toolkit';
import { Preset, ResizerBackendClient } from '../../../shared/api';
import { presetsSelectors } from './slice';
import { createAppAsyncThunk } from '../app-typing';

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
                ...presetsSelectors.selectAll((getState())),
            ];
            await resizerBackend.setPresets(projectAlias, presets);
            return preset;
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);