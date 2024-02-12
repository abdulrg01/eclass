import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "/set-user-image",
        method: "PUT",
        body: { avatar },
      }),
    }),
    edithProfile: builder.mutation({
      query: (credentials) => ({
        url: "/updateUser",
        method: "PATCH",
        body: { ...credentials },
      }),
    }),
    updateUserRole: builder.mutation({
      query: (credentials) => ({
        url: "/update-user-role",
        method: "PATCH",
        body: { ...credentials}
      })
    }),
    updatePassword: builder.mutation({
      query: (credentials) => ({
        url: "/update-user-Password",
        method: "PATCH",
        body: { ...credentials },
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/delete-user/${id}`,
        method: "DELETE"
      }),
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useEdithProfileMutation,
  useUpdateUserRoleMutation,
  useUpdatePasswordMutation,
  useGetUsersQuery,
  useDeleteUserMutation
} = userApi;
