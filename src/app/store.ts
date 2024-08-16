import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './feauture/LoginSlice'
import cartSlice from './feauture/CartSlice';



export const store = configureStore({
  reducer: {
    login:loginSlice,
    cart:cartSlice

  },

 })

 export type RootState = ReturnType<typeof store.getState>;


