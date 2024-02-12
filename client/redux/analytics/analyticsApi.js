import { apiSlice } from "../api/apiSlice";

const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoursesAnalytics: builder.query({
      query: () => ({
        url: "/analytics/get-courses-analytics",
        method: "GET",
      }),
    }),
    getUsersAnalytics: builder.query({
      query: () => ({
        url: "/analytics/get-user-analytics",
        method: "GET",
      }),
    }),
    getOrdersAnalytics: builder.query({
      query: () => ({
        url: "/analytics/get-orders-analytics",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetCoursesAnalyticsQuery,
  useGetUsersAnalyticsQuery,
  useGetOrdersAnalyticsQuery,
} = analyticsApi;
