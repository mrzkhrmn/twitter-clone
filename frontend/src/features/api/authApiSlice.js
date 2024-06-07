import { AUTH_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// In react query if we want to update the cached data we need to use tagTypes.
// When calling or bringing the data we need to provide a tag or tags
// But if we updating or mutating our data we need to use invalidateTags to that corresponding tag

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/signup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    getUser: builder.query({
      query: () => ({
        url: `${AUTH_URL}/`,
      }),
      providesTags: ["Auth"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserQuery,
} = authApiSlice;
