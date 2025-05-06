import { configureStore, combineReducers } from '@reduxjs/toolkit';
import graphEditorReducer from '@/features/graphPanel/slice';

const rootReducer = combineReducers({
  graphEditor: graphEditorReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
