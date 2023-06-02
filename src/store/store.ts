import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./modules/root.reducer";
import { config } from "src/config/config";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  devTools: config.nodeEnv !== "production",
  reducer: persistedReducer,
  preloadedState: {},
  middleware: [thunk],
});

export const persistor = persistStore(store);
export const wrapper = createWrapper(() => store);
