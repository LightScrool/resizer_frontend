import { createAsyncThunk } from '@reduxjs/toolkit';
import { ResizerBackendClient, UploadImageBody } from '../../../shared/api';

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

type FetchUploadImageParams = {
    resizerBackend: ResizerBackendClient;
    projectAlias: string;
    body: UploadImageBody;
}

export const fetchUploadImage = createAsyncThunk(
    'imagesList/fetchUploadImage',
    async ({ resizerBackend, projectAlias, body }: FetchUploadImageParams, { rejectWithValue }) => {
        try {
            return await resizerBackend.uploadImage(projectAlias, body);
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);
