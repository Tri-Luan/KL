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
    register: builder.mutation({
      query: (body) => ({
        url: ApiPaths.auth.root,
        method: "PUT",
        body,
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
export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshMutation,
  useSendLogoutMutation,
} = authApiSlice;
