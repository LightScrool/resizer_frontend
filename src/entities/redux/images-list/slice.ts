import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';

import { RequestStatuses } from '../../../shared/lib/network';
import { RootState } from '../store';
import { fetchImagesList, fetchRemoveImage, fetchUploadImage } from './thunk';
import { createImageEntity, ImageEntity } from './image-entity';

const imagesAdapter = createEntityAdapter<ImageEntity, ImageEntity['id']>({selectId: (item) => item.id});

type State = {
    fetchImagesListStatus: RequestStatuses;
    imagesAdapter: EntityState<ImageEntity, ImageEntity['id']>;
    fetchUploadImageStatus: RequestStatuses;
};

const initialState: State = {
    fetchImagesListStatus: RequestStatuses.IDLE,
    imagesAdapter: imagesAdapter.getInitialState(),
    fetchUploadImageStatus: RequestStatuses.IDLE,
};

export const imagesListSlice = createSlice({
    name: 'imagesList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchImagesList.pending, (state) => {
                if (state.fetchImagesListStatus !== RequestStatuses.SUCCESS) {
                    state.fetchImagesListStatus = RequestStatuses.PENDING;
                }
            })
            .addCase(fetchImagesList.fulfilled, (state, action) => {
                state.fetchImagesListStatus = RequestStatuses.SUCCESS;

                imagesAdapter.setAll(state.imagesAdapter, action.payload.map(createImageEntity));
            })
            .addCase(fetchImagesList.rejected, (state) => {
                state.fetchImagesListStatus = RequestStatuses.FAILED;
            });

        builder
            .addCase(fetchRemoveImage.pending, (state, action) => {
                const imageId = action.meta.arg.imageId;
                imagesAdapter.updateOne(state.imagesAdapter, {
                    id: imageId,
                    changes: {
                        fetchRemoveStatus: RequestStatuses.PENDING
                    }
                })
            })
            .addCase(fetchRemoveImage.fulfilled, (state, action) => {
                const imageId = action.meta.arg.imageId;
                imagesAdapter.removeOne(state.imagesAdapter, imageId);
            })
            .addCase(fetchRemoveImage.rejected, (state, action) => {
                const imageId = action.meta.arg.imageId;
                imagesAdapter.updateOne(state.imagesAdapter, {
                    id: imageId,
                    changes: {
                        fetchRemoveStatus: RequestStatuses.FAILED
                    }
                })
            })

        builder
            .addCase(fetchUploadImage.pending, (state) => {
                state.fetchUploadImageStatus = RequestStatuses.PENDING;
            })
            .addCase(fetchUploadImage.fulfilled, (state, action) => {
                state.fetchUploadImageStatus = RequestStatuses.SUCCESS;

                imagesAdapter.addOne(state.imagesAdapter, createImageEntity(action.payload));
                state.imagesAdapter.ids.unshift(state.imagesAdapter.ids.pop()!);
            })
            .addCase(fetchUploadImage.rejected, (state) => {
                state.fetchUploadImageStatus = RequestStatuses.FAILED;
            });
    },
    selectors: {
        selectFetchImagesListStatus: (state) => state.fetchImagesListStatus,
        selectIsImageUploading: (state) => state.fetchUploadImageStatus === RequestStatuses.PENDING,
    },
});

export const {
    selectFetchImagesListStatus,
    selectIsImageUploading,
} = imagesListSlice.selectors;

export const imagesSelectors = imagesAdapter.getSelectors((state: RootState) => state[imagesListSlice.name].imagesAdapter);
