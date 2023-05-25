import { apiSlice } from "../api/apiSlice"; 
import { ApiPaths } from "../shared/api-paths";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: ApiPaths.auth,
        method: "POST",
        body: { ...credentials },
      }),
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
export const { useLoginMutation } = authApiSlice;
