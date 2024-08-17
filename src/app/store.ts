import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './feauture/LoginSlice'
import cartSlice from './feauture/CartSlice';
// import globalSlice from './feauture/GlobalSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistCartConfig = {
  key: 'cart',
  storage,
};
const persistedCart = persistReducer(persistCartConfig,cartSlice)


export const store = configureStore({
  reducer: {
    login:loginSlice,
    cart:persistedCart,
    //  global:globalSlice,

  },

 })

 export type RootState = ReturnType<typeof store.getState>;
 export const persistor = persistStore(store)


