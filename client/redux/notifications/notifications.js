import { apiSlice } from "../api/apiSlice";

const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query({
      query: () => ({
        url: "/notification/get-notification",
        method: "GET",
      }),
    }),
    updateNotificationStatus: builder.mutation({
      query: (id) => ({
        url: `/notification/update-notification/${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} = notificationApi;
