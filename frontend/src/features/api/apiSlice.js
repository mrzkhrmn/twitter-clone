import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants.js";

const baseQuery = fetchBaseQuery({ BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Auth", "User", "Post", "Notification"],
  endpoints: () => ({}),
});
