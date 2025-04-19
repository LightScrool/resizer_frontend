import { createSlice } from '@reduxjs/toolkit';

import { RequestStatuses } from '../../../shared/lib/network';
import { ProjectInfo } from '../../../shared/api';
import { fetchProjectInfo, fetchRemoveProject } from './thunk';

type State = {
    fetchProjectInfoStatus: RequestStatuses;
    fetchRemoveProjectStatus: RequestStatuses;
    projectInfo: ProjectInfo | null;
};

const initialState: State = {
    fetchProjectInfoStatus: RequestStatuses.IDLE,
    fetchRemoveProjectStatus: RequestStatuses.IDLE,
    projectInfo: null,
};

export const projectInfoSlice = createSlice({
    name: 'projectInfo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjectInfo.pending, (state) => {
                state.fetchProjectInfoStatus = RequestStatuses.PENDING;
            })
            .addCase(fetchProjectInfo.fulfilled, (state, action) => {
                state.fetchProjectInfoStatus = RequestStatuses.SUCCESS;

                state.projectInfo = action.payload;
            })
            .addCase(fetchProjectInfo.rejected, (state) => {
                state.fetchProjectInfoStatus = RequestStatuses.FAILED;
            });
        
        builder
            .addCase(fetchRemoveProject.pending, (state) => {
                state.fetchRemoveProjectStatus = RequestStatuses.PENDING;
            })
            .addCase(fetchRemoveProject.fulfilled, (state) => {
                state.fetchRemoveProjectStatus = RequestStatuses.SUCCESS;

                state.projectInfo = null;
            })
            .addCase(fetchRemoveProject.rejected, (state) => {
                state.fetchRemoveProjectStatus = RequestStatuses.FAILED;
            });
    },
    selectors: {
        selectFetchProjectInfoStatus: (state) => state.fetchProjectInfoStatus,
        selectIsProjectRemoving: (state) => state.fetchRemoveProjectStatus === RequestStatuses.PENDING,
        selectProjectInfo: (state) => state.projectInfo,
    },
});

export const {
    selectFetchProjectInfoStatus,
    selectProjectInfo,
} = projectInfoSlice.selectors;
