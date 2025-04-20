import { createAsyncThunk } from '@reduxjs/toolkit';
import { ResizerBackendClient } from '../../../shared/api';

type FetchProjectsListParams = {
    resizerBackend: ResizerBackendClient;
    projectAlias: string;
}

export const fetchImagesList = createAsyncThunk(
    'imagesList/fetchImagesList',
    async ({ resizerBackend, projectAlias }: FetchProjectsListParams, { rejectWithValue }) => {
        try {
            return await resizerBackend.getImagesList(projectAlias);
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);
