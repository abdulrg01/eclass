import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users/get-users",
        method: "GET",
      }),
    }),
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "/users/set-user-image",
        method: "PUT",
        body: { avatar },
      }),
    }),
    edithProfile: builder.mutation({
      query: (credentials) => ({
        url: "/users/updateUser",
        method: "PATCH",
        body: { ...credentials },
      }),
    }),
    updateUserRole: builder.mutation({
      query: (credentials) => ({
        url: "/users/update-user-role",
        method: "PATCH",
        body: { ...credentials}
      })
    }),
    updatePassword: builder.mutation({
      query: (credentials) => ({
        url: "/users/update-user-Password",
        method: "PATCH",
        body: { ...credentials },
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/delete-user/${id}`,
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
