import { apiSlice } from "../api/apiSlice";

const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeroData: builder.query({
      query: (type) => ({
        url: `/layout/get-layout/${type}`,
        method: "GET",
      }),
    }),
    editLayout: builder.mutation({
      query: ({ type, image, title, subTitle, faq, categories }) => ({
        url: `/layout/edith-layout`,
        method: "PATCH",
        body: { type, image, title, subTitle, faq, categories },
      }),
    }),
  }),
});

export const { useGetHeroDataQuery, useEditLayoutMutation } = layoutApi;
