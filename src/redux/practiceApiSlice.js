import { apiSlice } from "../api/apiSlice";
import { ApiPaths } from "../shared/api-paths";

export const practiceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPractices: builder.query({
      query: (arg) => {
        const { userId, pageSize, pageNumber, keyword, levelId, isCompleted } =
          arg;
        return {
          url: `${ApiPaths.practice.root}`,
          params: {
            userId,
            pageSize,
            pageNumber,
            keyword,
            levelId,
            isCompleted,
          },
        };
      },
    }),
    getPracticeDetails: builder.query({
      query: (arg) => {
        const { userId, practiceId } = arg;
        return {
          url: `${ApiPaths.practice.root + ApiPaths.practice.detail}`,
          params: { userId, practiceId },
        };
      },
    }),
    getPracticeManagementDetails: builder.query({
      query: (id) =>
        `${
          ApiPaths.practice.root +
          ApiPaths.practice.management.root +
          ApiPaths.practice.management.detail +
          "/" +
          id
        }`,
    }),
    getPracticesManagement: builder.query({
      query: (arg) => {
        const { userId, pageSize, pageNumber, keyword } = arg;
        return {
          url: `${ApiPaths.practice.root + ApiPaths.practice.management.root}`,
          params: { userId, pageSize, pageNumber, keyword },
        };
      },
    }),
    getPracticeLevels: builder.query({
      query: () => `${ApiPaths.practice.root + ApiPaths.practice.levels}`,
    }),
    addPractice: builder.mutation({
      query: (body) => ({
        url: ApiPaths.practice.root,
        method: "PUT",
        body,
      }),
    }),
    updatePractice: builder.mutation({
      query: (body) => ({
        url: ApiPaths.practice.root,
        method: "POST",
        body,
      }),
    }),
    deletePractice: builder.mutation({
      query: (id) => ({
        url: `${ApiPaths.practice.root + "/" + id}`,
        method: "DELETE",
      }),
    }),
    deleteTestCasePractice: builder.mutation({
      query: (id) => ({
        url: `${
          ApiPaths.practice.root + ApiPaths.practice.testcase + "/" + id
        }`,
        method: "DELETE",
      }),
    }),
    setHidePractice: builder.mutation({
      query: (id) => ({
        url: `${
          ApiPaths.practice.root +
          ApiPaths.practice.management.hidden +
          "/" +
          id
        }`,
        method: "POST",
      }),
    }),

    runCodePractice: builder.mutation({
      query: (body) => ({
        url: `${ApiPaths.practice.root + ApiPaths.practice.run}`,
        method: "POST",
        body,
      }),
    }),
    submitCodePractice: builder.mutation({
      query: (body) => ({
        url: `${ApiPaths.practice.root + ApiPaths.practice.submit}`,
        method: "PUT",
        body,
      }),
    }),
    getPracticeHistory: builder.query({
      query: (arg) => {
        const { userId, practiceId } = arg;
        return {
          url: `${ApiPaths.practice.root + ApiPaths.practice.histories}`,
          params: { userId, practiceId },
        };
      },
    }),
    getPracticeLeaderboard: builder.query({
      query: (arg) => {
        const { pageSize, practiceId, pageNumber } = arg;
        return {
          url: `${ApiPaths.practice.root + ApiPaths.practice.leaderboard}`,
          params: { pageSize, practiceId, pageNumber },
        };
      },
    }),
  }),
});
export const {
  useGetPracticesQuery,
  useGetPracticeDetailsQuery,
  useGetPracticeManagementDetailsQuery,
  useGetPracticesManagementQuery,
  useGetPracticeLevelsQuery,
  useAddPracticeMutation,
  useUpdatePracticeMutation,
  useDeletePracticeMutation,
  useDeleteTestCasePracticeMutation,
  useSetHidePracticeMutation,
  useGetPracticeHistoryQuery,
  useGetPracticeLeaderboardQuery,
  useRunCodePracticeMutation,
  useSubmitCodePracticeMutation,
} = practiceApiSlice;
