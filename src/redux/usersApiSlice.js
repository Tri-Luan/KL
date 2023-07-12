import { apiSlice } from "../api/apiSlice";
import { ApiPaths } from "../shared/api-paths";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.mutation({
      query: (arg) => `${ApiPaths.user}/${arg}`,
    }),
    getUserQuery: builder.query({
      query: (arg) => `${ApiPaths.user}/${arg}`,
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: ApiPaths.user,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetUserMutation, useUpdateUserMutation } = userApiSlice;
