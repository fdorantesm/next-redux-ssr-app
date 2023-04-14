import thunk from 'redux-thunk';
import { createWrapper } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { rootReducer } from './modules/root.reducer';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  devTools: true,
  reducer: persistedReducer,
  preloadedState: {},
  middleware: [thunk]
});

// assigning store to next wrapper
export const persistor = persistStore(store);
export const wrapper = createWrapper(() => store);
