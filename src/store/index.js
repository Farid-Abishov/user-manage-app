import { configureStore } from '@reduxjs/toolkit/react'
import { userApi } from './api/user.api'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware,),
})      