import { apiSlice } from "../api/apiSlice.js";

const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/course/create-course",
        method: "POST",
        body: data,
      }),
    }),
    getCourses: builder.query({
      query: () => ({
        url: "/course/get-admin-courses",
        method: "GET",
      }),
    }),
    getUsersCourse: builder.query({
      query: () => ({
        url: "/course/get-courses",
        method: "GET",
      }),
    }),
    getCourseDetails: builder.query({
      query: (id) => ({
        url: `/course/get-course/${id}`,
        method: "GET",
      }),
    }),
    getCourseContent: builder.query({
      query: (id) => ({
        url: `/course/get-course-content/${id}`,
        method: "GET",
      }),
    }),
    editCourse: builder.mutation({
      query: (id, data) => ({
        url: `/course/edit-course/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    addNewQuestion: builder.mutation({
      query: ({ question, id, contentId }) => ({
        url: "/course/add-question",
        method: "PATCH",
        body: { question, id, contentId },
      }),
    }),
    addAnswer: builder.mutation({
      query: ({ answer, id, contentId, questionId }) => ({
        url: "/course/add-answer",
        method: "PATCH",
        body: { answer, id, contentId, questionId },
      }),
    }),
    addReview: builder.mutation({
      query: ({ id, ratings, reviews }) => ({
        url: `/course/add-review/${id}`,
        method: "PATCH",
        body: { ratings, reviews },
      }),
    }),
    addReplay: builder.mutation({
      query: ({ comment, id, reviewId }) => ({
        url: "/course/add-replay",
        method: "PATCH",
        body: { comment, id, reviewId },
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/course/delete-course/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCoursesQuery,
  useGetUsersCourseQuery,
  useGetCourseDetailsQuery,
  useGetCourseContentQuery,
  useDeleteCourseMutation,
  useEditCourseMutation,
  useAddNewQuestionMutation,
  useAddAnswerMutation,
  useAddReviewMutation,
  useAddReplayMutation,
} = courseApi;
