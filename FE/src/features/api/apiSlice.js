import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { query } from "firebase/database";
const token = localStorage.getItem("accessToken")
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_GATEWAY_DOMAIN,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getStories: builder.query({
      query: (queries) =>
        `/story-api/story?${Object.keys(queries)
          .map((key) => `${key}=${queries[key]}`)
          .join("&")}`,
    }),
    getChapters: builder.query({
      query: (queries) =>
        `/story-api/chapter?${Object.keys(queries)
          .map((key) => `${key}=${queries[key]}`)
          .join("&")}`,
    }),
    getStoryFollowDetail: builder.query({
      query: (queries) =>
        `/story-api/storyFollowDetail?${Object.keys(queries)
          .map((key) => `${key}=${queries[key]}`)
          .join("&")}`,
    }),
    getGenre: builder.query({
      query: () => `/story-api/genre?`,
    }),
    getHistoryDetail: builder.query({
      query: (queries) =>
        `/story-api/historyDetail?${Object.keys(queries)
          .map((key) => `${key}=${queries[key]}`)
          .join("&")}`,
    }),
    getStoryAuthorDetail: builder.query({
      query: (queries) =>
        `/story-api/storyAuthorDetail?${Object.keys(queries)
          .map((key) => `${key}=${queries[key]}`)
          .join("&")}`,
    }),
    getChapterImage: builder.query({
      query: (chapterId) => `/story-api/chapterImage?chapterId=${chapterId}`
    }),
    getstoryGenreDetail: builder.query({
      query: (queries) =>
        `/story-api/storyGenreDetail?${Object.keys(queries)
          .map((key) => `${key}=${queries[key]}`)
          .join("&")}`,
    }),

    getStoryIdRatingDetail: builder.query({
      query: (queries) =>
        `/story-api/storyRatingDetail?${Object.keys(queries)
          .map((key) => `${key}=${queries[key]}`)
          .join("&")
        }`,
    }),
    getStoryPriceHistory: builder.query({
      query: (queries) =>
        `/story-api/storyPriceHistory/storyId?${Object.keys(queries)
          .map((key) => `${key}=${queries[key]}`)
          .join("&")
        }`,
    }),
    getstoryFollowDetail: builder.query({
      query: (queries) =>
        `/story-api/storyFollowDetail?${Object.keys(queries)
          .map((key) => `${key}=${queries[key]}`)
          .join("&")
        }`,
    }),
    getviewCount: builder.query({
      query: (storyId) => `/story-api/viewDetail/story/${storyId}/viewCount`,

    }),
    getfollowCount: builder.query({
      query: (storyId) =>
        `/story-api/storyFollowDetail/story/${storyId}/followCount`,
      providesTags: (result, error, storyId) => [{ type: 'FollowCount', id: storyId }],

    }),
    getStoryRatingDetail: builder.query({
      query: (storyId) =>
        `/story-api/storyRatingDetail/story/${storyId}/rating`,

    }),
    getViewOfChapter: builder.query({
      query: ({ chaterId, toDate }) =>
        `/story-api/viewDetail/chapter/${chaterId}/viewCount?from=1899-12-30T16:53:30.000Z&to=${toDate}`,
    }),
    getComments: builder.query({
      query: (queries) =>
        `/comment-api/comment? ${Object.keys(queries)
          .filter((key) => queries[key] != undefined)
          .map((key) => `${key}=${queries[key]}`)
          .join("&")
        }`,

    }),
    getProfile: builder.query({
      query: () => "/profile",

    }),
    getWallet: builder.query({
      query: () => "/payment/getWallet",

    }),
    createStoryFollowDetail: builder.mutation({
      query: ({ storyId, userId }) => ({
        url: "/story-api/storyFollowDetail",
        method: "POST",
        body: { storyId, userId },
      }),
      onQueryStarted: async (
        { storyId, userId },
        { dispatch, queryFulfilled }
      ) => {
        const PostRs = dispatch(
          apiSlice.util.updateQueryData(
            "getfollowCount",
            undefined,
            (draft) => {
              if (draft?.data) {
                draft.data.followCount += 1;
              }
            }
          )
        );

        try {
          await queryFulfilled()
        } catch {
          PostRs.undo()
        }
      },
      invalidatesTags: (result, error, { storyId }) => [{ type: 'FollowCount', id: storyId }],
    }),
    deleteStoryFollowDetail: builder.mutation({
      query: ({ storyId, userId }) => ({
        url: "/story-api/storyFollowDetail",
        method: "DELETE",
        body: { storyId, userId },
      }),
      onQueryStarted: async (
        { storyId, userId },
        { dispatch, queryFulfilled }
      ) => {
        const PostRs = dispatch(
          apiSlice.util.updateQueryData(
            "getfollowCount",
            undefined,
            (draft) => {
              if (draft?.data) {
                draft.data.followCount -= 1;
              }
            }
          )
        );

        try {
          await queryFulfilled()
        } catch {
          PostRs.undo()
        }
      },
      invalidatesTags: (result, error, { storyId }) => [{ type: 'FollowCount', id: storyId }],
    }),

    createStoryRatingDetail: builder.mutation({
      query: ({ storyId, userId, star }) => ({
        url: "/story-api/storyFollowDetail",
        method: "POST",
        body: { storyId, userId, star },
      }),
    }),
    createViewDetail: builder.mutation({
      query: ({ storyId, clientId }) => ({
        url: "/story-api/viewDetail",
        method: "POST",
        body: { storyId, clientId },
      }),
    }),
    updateStoryRatingDetail: builder.mutation({
      query: ({ storyId, userId, star }) => ({
        url: "/story-api/storyFollowDetail",
        method: "PUT",
        body: { storyId, userId, star },
      }),
    }),
    createPayment: builder.mutation({
      query: (paymentData) => ({
        url: "/payment/create-payment",
        method: "POST",
        body: paymentData,
      }),

    }),

    getTopStoryViewDetail: builder.query({
      query: ({ from, to }) =>
        `/story-api/viewDetail/story/topViewCount?from=${from}&to=${to}&page=1&limit=10`
    }),

  }),
});

export const {
  useGetStoriesQuery,
  useGetChaptersQuery,
  useLazyGetStoryFollowDetailQuery,
  useGetHistoryDetailQuery,
  useGetGenreQuery,
  useGetstoryGenreDetailQuery,
  useGetCommentsQuery,
  useGetStoryAuthorDetailQuery,
  useGetviewCountQuery,
  useGetfollowCountQuery,
  useGetStoryRatingDetailQuery,
  useGetTopStoryViewDetailQuery,
  useGetStoryPriceHistoryQuery,
  useGetChapterImageQuery,
  useGetProfileQuery,
  useGetStoryFollowDetailQuery,
  useCreateStoryFollowDetailMutation,
  useDeleteStoryFollowDetailMutation,
  useCreateStoryRatingDetailMutation,
  useUpdateStoryRatingDetailMutation,
  useGetStoryIdRatingDetailQuery,
  useCreatePaymentMutation,
  useGetWalletQuery,
  useGetViewOfChapterQuery,
  useCreateViewDetailMutation,
} = apiSlice;
