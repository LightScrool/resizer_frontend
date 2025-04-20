import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';

import { RequestStatuses } from '../../../shared/lib/network';
import { PresetResp } from '../../../shared/api';
import { RootState } from '../store';
import { fetchPresetsList } from './thunk';

const presetsAdapter = createEntityAdapter<PresetResp, PresetResp['alias']>({selectId: (item) => item.alias});

type State = {
    fetchPresetsListStatus: RequestStatuses;
    presetsAdapter: EntityState<PresetResp, PresetResp['alias']>;
};

const initialState: State = {
    fetchPresetsListStatus: RequestStatuses.IDLE,
    presetsAdapter: presetsAdapter.getInitialState(),
};

export const presetsListSlice = createSlice({
    name: 'presetsList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPresetsList.pending, (state) => {
                state.fetchPresetsListStatus = RequestStatuses.PENDING;
            })
            .addCase(fetchPresetsList.fulfilled, (state, action) => {
                state.fetchPresetsListStatus = RequestStatuses.SUCCESS;

                presetsAdapter.setAll(state.presetsAdapter, action.payload);
            })
            .addCase(fetchPresetsList.rejected, (state) => {
                state.fetchPresetsListStatus = RequestStatuses.FAILED;
            });
    },
    selectors: {
        selectFetchPresetsListStatus: (state) => state.fetchPresetsListStatus,
    },
});

export const {
    selectFetchPresetsListStatus,
} = presetsListSlice.selectors;

export const presetsSelectors = presetsAdapter.getSelectors((state: RootState) => state[presetsListSlice.name].presetsAdapter);
