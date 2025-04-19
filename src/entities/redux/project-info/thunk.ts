import { createAsyncThunk } from '@reduxjs/toolkit';
import { ResizerBackendClient } from '../../../shared/api';

type FetchProjectInfoParams = {
    resizerBackend: ResizerBackendClient;
    projectAlias: string;
}

export const fetchProjectInfo = createAsyncThunk(
    'projectInfo/fetchProjectInfo',
    async ({ resizerBackend, projectAlias }: FetchProjectInfoParams, { rejectWithValue }) => {
        try {
            return await resizerBackend.getProjectInfo(projectAlias);
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);

export const fetchRemoveProject = createAsyncThunk(
    'projectInfo/fetchRemoveProject',
    async ({ resizerBackend, projectAlias }: FetchProjectInfoParams, { rejectWithValue }) => {
        try {
            return await resizerBackend.removeProject(projectAlias);
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);
