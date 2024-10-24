import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import * as slices from "@/store/slices";

const persistConfig = { key: "root", storage };

const persistedReducer = persistReducer(persistConfig, slices.appSlice);

export const store = configureStore({
  reducer: {
    ...slices,
    appSlice: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
