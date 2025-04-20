import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';

import { RequestStatuses } from '../../../shared/lib/network';
import { RootState } from '../store';
import { fetchImagesList } from './thunk';
import { createImageEntity, ImageEntity } from './image-entity';

const imagesAdapter = createEntityAdapter<ImageEntity, ImageEntity['id']>({selectId: (item) => item.id});

type State = {
    fetchImagesListStatus: RequestStatuses;
    imagesAdapter: EntityState<ImageEntity, ImageEntity['id']>;
};

const initialState: State = {
    fetchImagesListStatus: RequestStatuses.IDLE,
    imagesAdapter: imagesAdapter.getInitialState(),
};

export const imagesListSlice = createSlice({
    name: 'imagesList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchImagesList.pending, (state) => {
                state.fetchImagesListStatus = RequestStatuses.PENDING;
            })
            .addCase(fetchImagesList.fulfilled, (state, action) => {
                state.fetchImagesListStatus = RequestStatuses.SUCCESS;

                imagesAdapter.setAll(state.imagesAdapter, action.payload.map(createImageEntity));
            })
            .addCase(fetchImagesList.rejected, (state) => {
                state.fetchImagesListStatus = RequestStatuses.FAILED;
            });
    },
    selectors: {
        selectFetchImagesListStatus: (state) => state.fetchImagesListStatus,
    },
});

export const {
    selectFetchImagesListStatus,
} = imagesListSlice.selectors;

export const imagesSelectors = imagesAdapter.getSelectors((state: RootState) => state[imagesListSlice.name].imagesAdapter);
