import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './feauture/LoginSlice'
import cartSlice from './feauture/CartSlice';
// import globalSlice from './feauture/GlobalSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { apiSlice } from './services/ApiSlice';

const persistCartConfig = {
  key: 'cart',
  storage,
};
const persistedCart = persistReducer(persistCartConfig,cartSlice)


export const store = configureStore({
  reducer: {
    login:loginSlice,
    cart:persistedCart,
    [apiSlice.reducerPath]:apiSlice.reducer,
    //  global:globalSlice,

  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
        serializableCheck:false,
    }).concat([apiSlice.middleware])

 })

 export type RootState = ReturnType<typeof store.getState>;
 export const persistor = persistStore(store)


