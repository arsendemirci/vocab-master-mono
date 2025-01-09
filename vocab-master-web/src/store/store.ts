import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";

import * as slices from "@/store/slices";

const encryptor = encryptTransform({
  secretKey: process.env.NEXTAUTH_SECRET as string,
  onError: function (error) {
    // Handle the error.
  },
});

const persistConfig = {
  key: "root",
  storage,
  transforms: [encryptor],
};

const persistedReducer = persistReducer(persistConfig, slices.persistSlice);

export const store = configureStore({
  reducer: {
    ...slices,
    persistSlice: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
