import { apiSlice } from "../api/apiSlice";
import { ApiPaths } from "../shared/api-paths";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.mutation({
      query: (arg) => `${ApiPaths.user}/${arg}`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetUserMutation } = userApiSlice;
