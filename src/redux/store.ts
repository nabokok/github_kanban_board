import { configureStore } from '@reduxjs/toolkit';
import issuesSlice from './slices/issuesSlice';
import repoSlice from './slices/repoSlice';


export const store = configureStore({
    reducer: {
        issues: issuesSlice,
        repo: repoSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
