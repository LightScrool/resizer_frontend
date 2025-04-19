import { createSlice } from '@reduxjs/toolkit';

import { RequestStatuses } from '../../../shared/lib/network';
import { ProjectInfo } from '../../../shared/api';
import { fetchProjectInfo } from './thunk';

type State = {
    fetchProjectInfoStatus: RequestStatuses;
    projectInfo: ProjectInfo | null;
};

const initialState: State = {
    fetchProjectInfoStatus: RequestStatuses.IDLE,
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
    },
    selectors: {
        selectFetchProjectInfoStatus: (state) => state.fetchProjectInfoStatus,
        selectProjectInfo: (state) => state.projectInfo,
    },
});

export const {
    selectFetchProjectInfoStatus,
    selectProjectInfo,
} = projectInfoSlice.selectors;
