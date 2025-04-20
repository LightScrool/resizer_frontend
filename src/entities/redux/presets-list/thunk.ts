import { createAsyncThunk } from '@reduxjs/toolkit';
import { ResizerBackendClient } from '../../../shared/api';

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
