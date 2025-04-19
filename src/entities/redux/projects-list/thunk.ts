import { createAsyncThunk } from '@reduxjs/toolkit';
import { ResizerBackendClient } from '../../../shared/api';

type FetchProjectsListParams = {
    resizerBackend: ResizerBackendClient;
}

export const fetchProjectsList = createAsyncThunk(
    'projectsList/fetchProjectsList',
    async ({ resizerBackend }: FetchProjectsListParams, { rejectWithValue }) => {
        try {
            return await resizerBackend.getUserProjects();
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);

type FetchCreateProjectParams = {
    resizerBackend: ResizerBackendClient;
    project: Parameters<ResizerBackendClient['createProject']>[0]
}

export const fetchCreateProject = createAsyncThunk(
    'projectsList/fetchCreateProject',
    async ({ resizerBackend, project }: FetchCreateProjectParams, { rejectWithValue }) => {
        try {
            return await resizerBackend.createProject(project);
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);
