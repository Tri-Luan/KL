import { apiSlice } from "../api/apiSlice";
import { ApiPaths } from "../shared/api-paths";
import { logOut, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: ApiPaths.auth.root,
        method: "POST",
        body: { ...credentials },
      }),
    }),
    sendLogout: builder.mutation({
      query: (body) => ({
        url: ApiPaths.auth.root + ApiPaths.auth.logout,
        method: "POST",
        body,
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
    refresh: builder.mutation({
      query: (body) => ({
        url: ApiPaths.auth.root + ApiPaths.auth.refreshToken,
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

//  const responseAuth = await axios.post(
//         ApiPaths.auth,
//         JSON.stringify({
//           userName: userName,
//           password: password,
//         }),
//         {
//           headers: { "Content-Type": "application/json" },
//           // withCredentials: true,
//         }
export const { useLoginMutation, useRefreshMutation, useSendLogoutMutation } =
  authApiSlice;
