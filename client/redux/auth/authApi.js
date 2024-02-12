import { apiSlice } from "../api/apiSlice";
import { logOut, setCredentials, setUser } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/registration",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    activation: builder.mutation({
      query: ({ token, activationCode }) => ({
        url: "/activate-user",
        method: "POST",
        body: {
          token,
          activationCode,
        },
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    socialAuth: builder.mutation({
      query: (credentials) => ({
        url: "/social-auth",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/refresh",
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
        url: "/get-user-info",
        method: "GET",
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/logout",
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