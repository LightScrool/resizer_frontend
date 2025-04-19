import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';

import { RequestStatuses } from '../../../shared/lib/network';
import { ProjectListItem } from '../../../shared/api';
import { RootState } from '../store';
import { fetchProjectsList, fetchCreateProject } from './thunk';

const projectsAdapter = createEntityAdapter<ProjectListItem, ProjectListItem['alias']>({selectId: (item) => item.alias});

type State = {
    fetchProjectsListStatus: RequestStatuses;
    fetchCreateProjectStatus: RequestStatuses;
    projectsLimit: number | null;
    projectsAdapter: EntityState<ProjectListItem, ProjectListItem['alias']>;
};

const initialState: State = {
    fetchProjectsListStatus: RequestStatuses.IDLE,
    fetchCreateProjectStatus: RequestStatuses.IDLE,
    projectsLimit: null,
    projectsAdapter: projectsAdapter.getInitialState(),
};

export const projectsListSlice = createSlice({
    name: 'slots',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjectsList.pending, (state) => {
                state.fetchProjectsListStatus = RequestStatuses.PENDING;
            })
            .addCase(fetchProjectsList.fulfilled, (state, action) => {
                state.fetchProjectsListStatus = RequestStatuses.SUCCESS;

                state.projectsLimit = action.payload.projectsLimit;
                projectsAdapter.setAll(state.projectsAdapter, action.payload.projects);
            })
            .addCase(fetchProjectsList.rejected, (state) => {
                state.fetchProjectsListStatus = RequestStatuses.FAILED;
            });
        
        builder
            .addCase(fetchCreateProject.pending, (state) => {
                state.fetchCreateProjectStatus = RequestStatuses.PENDING;
            })
            .addCase(fetchCreateProject.fulfilled, (state, action) => {
                state.fetchCreateProjectStatus = RequestStatuses.SUCCESS;

                projectsAdapter.setOne(state.projectsAdapter, action.payload);
            })
            .addCase(fetchCreateProject.rejected, (state) => {
                state.fetchCreateProjectStatus = RequestStatuses.FAILED;
            });
    },
    selectors: {
        selectFetchProjectsListStatus: (state) => state.fetchProjectsListStatus,
        selectIsCreateProjectLoading: (state) => state.fetchCreateProjectStatus === RequestStatuses.PENDING,
        selectProjectsLimit: (state) => state.projectsLimit,
    },
});

export const {
    selectFetchProjectsListStatus,
    selectIsCreateProjectLoading,
    selectProjectsLimit,
} = projectsListSlice.selectors;

export const projectsSelectors = projectsAdapter.getSelectors((state: RootState) => state[projectsListSlice.name].projectsAdapter);
