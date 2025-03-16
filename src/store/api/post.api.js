import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery,
  endpoints: (builder) => ({
    getPosts: builder.infiniteQuery({
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
      providesTags: ["getPosts"],
      query: ({ queryArg, pageParam }) =>
        `/posts?page=${pageParam}&per_page=10${
          queryArg ? `&${new URLSearchParams(queryArg).toString()}` : ""
        }`,
    }),
    updatePost: builder.mutation({
      query: ({ id, ...params }) => ({
        url: `posts/${id}`,
        method: "PATCH",
        body: params,
      }),
    }),
    createPost: builder.mutation({
      query: (params) => ({
        url: "posts",
        method: "POST",
        body: params,
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPostsInfiniteQuery,
  useUpdatePostMutation,
  useCreatePostMutation,
  useDeletePostMutation,
} = postApi;
