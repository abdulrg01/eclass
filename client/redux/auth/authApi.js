import { apiSlice } from "../api/apiSlice";
import { logOut, setCredentials, setUser } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/users/registration",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    activation: builder.mutation({
      query: ({ token, activationCode }) => ({
        url: "/users/activate-user",
        method: "POST",
        body: {
          token,
          activationCode,
        },
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    socialAuth: builder.mutation({
      query: (credentials) => ({
        url: "/users/social-auth",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/users/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const { token, user } = data;
          dispatch(setCredentials({ token }));
          dispatch(setUser({ user }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    getUserInfo: builder.mutation({
      query: () => ({
        url: "/users/get-user-info",
        method: "GET",
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(logOut());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useSignupMutation,
  useActivationMutation,
  useLoginMutation,
  useRefreshMutation,
  useGetUserInfoMutation,
  useSocialAuthMutation,
  useSendLogoutMutation,
} = authApi;