
import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './feauture/LoginSlice';
import cartSlice, { CartState } from './feauture/CartSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { apiSlice } from './services/ApiSlice';

const persistCartConfig = {
  key: 'cart',
  storage,
};

const persistedCart = persistReducer<CartState>(persistCartConfig, cartSlice);

export const store = configureStore({
  reducer: {
    login: loginSlice,
    cart: persistedCart,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([apiSlice.middleware]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);


