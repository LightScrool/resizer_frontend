import { createAsyncThunk } from '@reduxjs/toolkit';
import { ResizerBackendClient } from '../../../shared/api';

type FetchProjectInfoParams = {
    resizerBackend: ResizerBackendClient;
    projectAlias: string;
}

export const fetchApiKey = createAsyncThunk(
    'projectApiKey/fetchApiKey',
    async ({ resizerBackend, projectAlias }: FetchProjectInfoParams, { rejectWithValue }) => {
        try {
            return await resizerBackend.getProjectApiKey(projectAlias);
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);
