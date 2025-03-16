import { configureStore } from '@reduxjs/toolkit/react'
import { userApi } from './api/user.api'
import { postApi } from './api/post.api'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware,postApi.middleware),
})      