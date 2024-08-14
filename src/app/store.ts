import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './feauture/LoginSlice'


export const store = configureStore({
  reducer: {
    login:loginSlice,
 
  },
})

export type AppDispatch = typeof store.dispatch;

// export type RootState = ReturnType<typeof store.getState>;

