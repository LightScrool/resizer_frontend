import { createSlice } from '@reduxjs/toolkit';

import { RequestStatuses } from '../../../shared/lib/network';
import { fetchApiKey } from './thunk';

type State = {
    fetchApiKeyStatus: RequestStatuses;
    apiKey: string | null;
};

const initialState: State = {
    fetchApiKeyStatus: RequestStatuses.IDLE,
    apiKey: null,
};

export const projectApiKeySlice = createSlice({
    name: 'projectApiKey',
    initialState,
    reducers: {
        clearApiKey: (state) => {
            state.apiKey = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApiKey.pending, (state) => {
                state.fetchApiKeyStatus = RequestStatuses.PENDING;
            })
            .addCase(fetchApiKey.fulfilled, (state, action) => {
                state.fetchApiKeyStatus = RequestStatuses.SUCCESS;

                state.apiKey = action.payload;
            })
            .addCase(fetchApiKey.rejected, (state) => {
                state.fetchApiKeyStatus = RequestStatuses.FAILED;
            });
    },
    selectors: {
        selectIsApiKeyLoading: (state) => state.fetchApiKeyStatus === RequestStatuses.PENDING,
        selectApiKey: (state) => state.apiKey,
    },
});

export const {
    selectIsApiKeyLoading,
    selectApiKey,
} = projectApiKeySlice.selectors;

export const {
    clearApiKey
} = projectApiKeySlice.actions;
