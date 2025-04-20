import { createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';

import { RequestStatuses } from '../../../shared/lib/network';
import { RootState } from '../store';
import { fetchPresetsList, fetchAddPreset, fetchRemovePreset, fetchEditPreset } from './thunk';
import { createPresetEntity, PresetEntity } from './preset-entity';

const presetsAdapter = createEntityAdapter<PresetEntity, PresetEntity['alias']>({selectId: (item) => item.alias});

type State = {
    fetchPresetsListStatus: RequestStatuses;
    presetsAdapter: EntityState<PresetEntity, PresetEntity['alias']>;
    fetchAddPresetStatus: RequestStatuses;
};

const initialState: State = {
    fetchPresetsListStatus: RequestStatuses.IDLE,
    presetsAdapter: presetsAdapter.getInitialState(),
    fetchAddPresetStatus: RequestStatuses.IDLE,
};

export const presetsListSlice = createSlice({
    name: 'presetsList',
    initialState,
    reducers: {
        // Пришлось вынести открытие попапа сюда, так как иначе изменение
        // fetchEditStatus триггерит ремаунт, из-за которого закрывается попап
        openEditPopup: (state, action: PayloadAction<{ presetAlias: string }>) => {
            presetsAdapter.updateOne(state.presetsAdapter, {
                id: action.payload.presetAlias,
                changes: {
                    isEditPopupOpened: true,
                }
            })
        },
        closeEditPopup: (state, action: PayloadAction<{ presetAlias: string }>) => {
            presetsAdapter.updateOne(state.presetsAdapter, {
                id: action.payload.presetAlias,
                changes: {
                    isEditPopupOpened: false,
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPresetsList.pending, (state) => {
                if (state.fetchPresetsListStatus !== RequestStatuses.SUCCESS) {
                    state.fetchPresetsListStatus = RequestStatuses.PENDING;
                }
            })
            .addCase(fetchPresetsList.fulfilled, (state, action) => {
                state.fetchPresetsListStatus = RequestStatuses.SUCCESS;

                presetsAdapter.setAll(state.presetsAdapter, action.payload.map(createPresetEntity));
            })
            .addCase(fetchPresetsList.rejected, (state) => {
                state.fetchPresetsListStatus = RequestStatuses.FAILED;
            });

        builder
            .addCase(fetchAddPreset.pending, (state) => {
                state.fetchAddPresetStatus = RequestStatuses.PENDING;
            })
            .addCase(fetchAddPreset.fulfilled, (state, action) => {
                state.fetchAddPresetStatus = RequestStatuses.SUCCESS;

                const newPreset = action.payload;

                presetsAdapter.addOne(state.presetsAdapter, createPresetEntity(newPreset));
                state.presetsAdapter.ids.unshift(state.presetsAdapter.ids.pop()!);
            })
            .addCase(fetchAddPreset.rejected, (state) => {
                state.fetchAddPresetStatus = RequestStatuses.FAILED;
            });

        builder
            .addCase(fetchRemovePreset.pending, (state, action) => {
                const presetAlias = action.meta.arg.presetAlias;
                presetsAdapter.updateOne(state.presetsAdapter, {
                    id: presetAlias,
                    changes: {
                        fetchRemoveStatus: RequestStatuses.PENDING
                    }
                })
            })
            .addCase(fetchRemovePreset.fulfilled, (state, action) => {
                const presetAlias = action.meta.arg.presetAlias;
                presetsAdapter.removeOne(state.presetsAdapter, presetAlias);
            })
            .addCase(fetchRemovePreset.rejected, (state, action) => {
                const presetAlias = action.meta.arg.presetAlias;
                presetsAdapter.updateOne(state.presetsAdapter, {
                    id: presetAlias,
                    changes: {
                        fetchRemoveStatus: RequestStatuses.FAILED
                    }
                })
            })
        
        builder
            .addCase(fetchEditPreset.pending, (state, action) => {
                const presetAlias = action.meta.arg.preset.alias;
                presetsAdapter.updateOne(state.presetsAdapter, {
                    id: presetAlias,
                    changes: {
                        fetchEditStatus: RequestStatuses.PENDING
                    }
                })
            })
            .addCase(fetchEditPreset.fulfilled, (state, action) => {
                const preset = action.meta.arg.preset;

                presetsAdapter.setOne(state.presetsAdapter, createPresetEntity(preset));
            })
            .addCase(fetchEditPreset.rejected, (state, action) => {
                const presetAlias = action.meta.arg.preset.alias;
                presetsAdapter.updateOne(state.presetsAdapter, {
                    id: presetAlias,
                    changes: {
                        fetchEditStatus: RequestStatuses.FAILED
                    }
                })
            })
    },
    selectors: {
        selectFetchPresetsListStatus: (state) => state.fetchPresetsListStatus,
        selectIsAddPresetLoading: (state) => state.fetchAddPresetStatus === RequestStatuses.PENDING,
    },
});

export const {
    selectFetchPresetsListStatus,
    selectIsAddPresetLoading,
} = presetsListSlice.selectors;

export const {
    openEditPopup,
    closeEditPopup,
} = presetsListSlice.actions;

export const presetsSelectors = presetsAdapter.getSelectors((state: RootState) => state[presetsListSlice.name].presetsAdapter);
