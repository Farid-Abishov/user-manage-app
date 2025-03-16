import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../baseQuery'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  endpoints: (builder) => ({
    getUsers: builder.infiniteQuery({
        infiniteQueryOptions: {
          initialPageParam: 1,
          maxPages:1,
          getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
            lastPageParam + 1,
          getPreviousPageParam: (
            firstPage,
            allPages,
            firstPageParam,
            allPageParams,
          ) => {
            return firstPageParam > 0 ? firstPageParam - 1 : undefined
          },
        },
        providesTags: ["getUsers"],
        query({ queryArg, pageParam }) {
          return `/users?page=${pageParam}&per_page=10${queryArg ? `&${new URLSearchParams(queryArg).toString()}` : ''}`    
        },
      }),
    getUser:builder.query({
      query:(id)=>({
        url:`users/${id}`
      })
    }),
    getUserPosts: builder.infiniteQuery({
      infiniteQueryOptions: {
        initialPageParam: 1,
        maxPages: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
          lastPageParam + 1,
        getPreviousPageParam: (
          firstPage,
          allPages,
          firstPageParam,
          allPageParams
        ) => {
          return firstPageParam > 0 ? firstPageParam - 1 : undefined;
        },
      },
      providesTags: ["getUserPosts"],
      query: ({ queryArg, pageParam }) =>
        `users/${queryArg.userId}/posts?page=${pageParam}&per_page=10${
          queryArg ? `&${new URLSearchParams(queryArg).toString()}` : ""
        }`,
    }),
    updateUser: builder.mutation({
        query: ({ id, ...params }) => ({
          url: `users/${id}`,
          method: 'PATCH',
          body: params,
        }),
    }),
    createUser: builder.mutation({
        query: (params) => ({
            url: `users`,
            method: 'POST',
            body: params
        })
    }),
    deleteUser:builder.mutation({
        query:(id)=>({
            url:`users/${id}`,
            method:'DELETE',
        })
    })
  }),
})

export const { useGetUsersInfiniteQuery, useUpdateUserMutation, useCreateUserMutation,useDeleteUserMutation ,useGetUserQuery,useGetUserPostsInfiniteQuery} = userApi