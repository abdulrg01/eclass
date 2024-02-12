import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "/order/get-orders",
        method: "GET",
      }),
    }),
    getStripePublishableKey: builder.query({
      query: () => ({
        url: "/order/payment/stripePublishableKey",
        method: "GET",
      }),
    }),
    createPaymentIntents: builder.mutation({
      query: (amount) => ({
        url: "/order/payment",
        method: "POST",
        body: { amount },
      }),
    }),
    createOrder: builder.mutation({
      query: ({ courseId, payment_info }) => ({
        url: "/order/create-order",
        method: "POST",
        body: { courseId, payment_info },
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useCreatePaymentIntentsMutation,
  useGetStripePublishableKeyQuery,
  useCreateOrderMutation,
} = ordersApi;
