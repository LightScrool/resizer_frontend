import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { projectsListSlice } from './projects-list';

export const rootReducer = combineReducers({
    [projectsListSlice.name]: projectsListSlice.reducer,
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
