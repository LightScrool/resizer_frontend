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

type FetchRemoveImageParams = {
    resizerBackend: ResizerBackendClient;
    projectAlias: string;
    imageId: string;
}

export const fetchRemoveImage = createAsyncThunk(
    'imagesList/fetchRemoveImage',
    async ({ resizerBackend, projectAlias, imageId }: FetchRemoveImageParams, { rejectWithValue }) => {
        try {
            return await resizerBackend.removeImage(projectAlias, imageId);
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);
