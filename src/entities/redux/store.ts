import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { projectsListSlice } from './projects-list';
import { projectInfoSlice } from './project-info';
import { projectApiKeySlice } from './project-api-key';
import { presetsListSlice } from './presets-list';
import { imagesListSlice } from './images-list';

export const rootReducer = combineReducers({
    [projectsListSlice.name]: projectsListSlice.reducer,
    [projectInfoSlice.name]: projectInfoSlice.reducer,
    [projectApiKeySlice.name]: projectApiKeySlice.reducer,
    [presetsListSlice.name]: presetsListSlice.reducer,
    [imagesListSlice.name]: imagesListSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
};

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
