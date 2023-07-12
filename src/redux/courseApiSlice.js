import { apiSlice } from "../api/apiSlice";
import { ApiPaths } from "../shared/api-paths";

export const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: (arg) => {
        const { keyword } = arg;
        return {
          url: `${ApiPaths.course.root}`,
          params: {
            keyword,
          },
        };
      },
    }),
    getCourseDetail: builder.query({
      query: (arg) => {
        const { userId, courseId } = arg;
        return {
          url: `${ApiPaths.course.root + ApiPaths.course.detail}`,
          params: { userId, courseId },
        };
      },
    }),
    getCourseDetailUpdate: builder.query({
      query: (arg) =>
        `${
          ApiPaths.course.root +
          ApiPaths.course.management.root +
          ApiPaths.course.management.detail
        }/${arg}`,
    }),
    getCoursesByUserId: builder.query({
      query: (arg) => {
        const { userId } = arg;
        return {
          url: `${ApiPaths.course.root + ApiPaths.course.management.root}`,
          params: { userId },
        };
      },
    }),
    addCourse: builder.mutation({
      query: (body) => ({
        url: ApiPaths.course.root,
        method: "PUT",
        body,
      }),
    }),
    updateCourse: builder.mutation({
      query: (body) => ({
        url: ApiPaths.course.root,
        method: "POST",
        body,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `${ApiPaths.course.root + "/" + id}`,
        method: "DELETE",
      }),
    }),
    setHideCourse: builder.mutation({
      query: (id) => ({
        url: `${
          ApiPaths.course.root +
          ApiPaths.course.management.root +
          ApiPaths.course.management.hidden +
          "/" +
          id
        }`,
        method: "POST",
      }),
    }),
    addCourseComment: builder.mutation({
      query: (body) => ({
        url: ApiPaths.course.root + ApiPaths.course.comment,
        method: "PUT",
        body,
      }),
    }),
    addCourseReplyComment: builder.mutation({
      query: (body) => ({
        url: ApiPaths.course.root + ApiPaths.course.replyComment,
        method: "PUT",
        body,
      }),
    }),
    getCourseComments: builder.mutation({
      query: (arg) => {
        const { userId, courseId } = arg;
        return {
          url: `${ApiPaths.course.root + ApiPaths.course.comments}`,
          params: { userId, courseId },
        };
      },
    }),
    deleteCourseComment: builder.mutation({
      query: (arg) => {
        const { userId, commentId } = arg;
        return {
          url: `${ApiPaths.course.root + ApiPaths.course.comment}`,
          method: "DELETE",
          params: { userId, commentId },
        };
      },
    }),
    deleteCourseReplyComment: builder.mutation({
      query: (arg) => {
        const { userId, replyCommentId } = arg;
        return {
          url: `${ApiPaths.course.root + ApiPaths.course.replyComment}`,
          method: "DELETE",
          params: { userId, replyCommentId },
        };
      },
    }),
    commentCourseAction: builder.mutation({
      query: (body) => ({
        url: ApiPaths.course.root + ApiPaths.course.commentAction,
        method: "POST",
        body,
      }),
    }),
    replycommentCourseAction: builder.mutation({
      query: (body) => ({
        url: ApiPaths.course.root + ApiPaths.course.replyCommentAction,
        method: "POST",
        body,
      }),
    }),
    registerCourse: builder.mutation({
      query: (body) => ({
        url: ApiPaths.course.root + ApiPaths.course.register,
        method: "PUT",
        body,
      }),
    }),

    //Chapter
    getChaptersByCourseId: builder.query({
      query: (arg) => {
        const { courseId } = arg;
        return {
          url: `${
            ApiPaths.course.root +
            ApiPaths.course.chapter.root +
            ApiPaths.course.chapter.management
          }`,
          params: { courseId },
        };
      },
    }),
    addChapter: builder.mutation({
      query: (body) => ({
        url: ApiPaths.course.root + ApiPaths.course.chapter.root,
        method: "PUT",
        body,
      }),
    }),
    updateChapter: builder.mutation({
      query: (body) => ({
        url: ApiPaths.course.root + ApiPaths.course.chapter.root,
        method: "POST",
        body,
      }),
    }),
    deleteChapter: builder.mutation({
      query: (id) => ({
        url: `${
          ApiPaths.course.root + ApiPaths.course.chapter.root + "/" + id
        }`,
        method: "DELETE",
      }),
    }),
    setHideChapter: builder.mutation({
      query: (id) => ({
        url: `${
          ApiPaths.course.root +
          ApiPaths.course.chapter.root +
          ApiPaths.course.chapter.hidden +
          "/" +
          id
        }`,
        method: "POST",
      }),
    }),

    //Lesson
    getLessonsByChapterId: builder.query({
      query: (arg) => {
        const { chapterId } = arg;
        return {
          url: `${
            ApiPaths.course.root +
            ApiPaths.course.lesson.root +
            ApiPaths.course.lesson.management
          }`,
          params: { chapterId },
        };
      },
    }),
    getLessonDetails: builder.query({
      query: (arg) => {
        const { userId, lessonId } = arg;
        return {
          url: `${
            ApiPaths.course.root +
            ApiPaths.course.lesson.root +
            ApiPaths.course.lesson.detail
          }`,
          params: { userId, lessonId },
        };
      },
    }),
    getLessonDetailsUpdate: builder.query({
      query: (arg) =>
        `${
          ApiPaths.course.root +
          ApiPaths.course.lesson.root +
          ApiPaths.course.lesson.management +
          ApiPaths.course.lesson.detail
        }/${arg}`,
    }),
    addLesson: builder.mutation({
      query: (body) => ({
        url: ApiPaths.course.root + ApiPaths.course.lesson.root,
        method: "PUT",
        body,
      }),
    }),
    updateLesson: builder.mutation({
      query: (body) => ({
        url: ApiPaths.course.root + ApiPaths.course.lesson.root,
        method: "POST",
        body,
      }),
    }),
    deleteLesson: builder.mutation({
      query: (id) => ({
        url: `${ApiPaths.course.root + ApiPaths.course.lesson.root + "/" + id}`,
        method: "DELETE",
      }),
    }),
    deleteTestCaseLesson: builder.mutation({
      query: (id) => ({
        url: `${
          ApiPaths.course.root +
          ApiPaths.course.lesson.root +
          ApiPaths.course.lesson.testcase +
          "/" +
          id
        }`,
        method: "DELETE",
      }),
    }),
    setHideLesson: builder.mutation({
      query: (id) => ({
        url: `${
          ApiPaths.course.root +
          ApiPaths.course.lesson.root +
          ApiPaths.course.lesson.hidden +
          "/" +
          id
        }`,
        method: "POST",
      }),
    }),
    runCodeLesson: builder.mutation({
      query: (body) => ({
        url: `${
          ApiPaths.course.root +
          ApiPaths.course.lesson.root +
          ApiPaths.course.lesson.run
        }`,
        method: "POST",
        body,
      }),
    }),
    submitCodeLesson: builder.mutation({
      query: (body) => ({
        url: `${
          ApiPaths.course.root +
          ApiPaths.course.lesson.root +
          ApiPaths.course.lesson.submit
        }`,
        method: "PUT",
        body,
      }),
    }),
    getLessonHistory: builder.query({
      query: (arg) => {
        const { userId, lessonId } = arg;
        return {
          url: `${
            ApiPaths.course.root +
            ApiPaths.course.lesson.root +
            ApiPaths.course.lesson.histories
          }`,
          params: { userId, lessonId },
        };
      },
    }),
    addLessonComment: builder.mutation({
      query: (body) => ({
        url:
          ApiPaths.course.root +
          ApiPaths.course.lesson.root +
          ApiPaths.course.lesson.comment,
        method: "PUT",
        body,
      }),
    }),
    addLessonReplyComment: builder.mutation({
      query: (body) => ({
        url:
          ApiPaths.course.root +
          ApiPaths.course.lesson.root +
          ApiPaths.course.lesson.replyComment,
        method: "PUT",
        body,
      }),
    }),
    getLessonComments: builder.mutation({
      query: (arg) => {
        const { userId, lessonId } = arg;
        return {
          url: `${
            ApiPaths.course.root +
            ApiPaths.course.lesson.root +
            ApiPaths.course.lesson.comments
          }`,
          params: { userId, lessonId },
        };
      },
    }),
    deleteLessonComment: builder.mutation({
      query: (arg) => {
        const { userId, commentId } = arg;
        return {
          url: `${
            ApiPaths.course.root +
            ApiPaths.course.lesson.root +
            ApiPaths.course.lesson.comment
          }`,
          method: "DELETE",
          params: { userId, commentId },
        };
      },
    }),
    deleteLessonReplyComment: builder.mutation({
      query: (arg) => {
        const { userId, replyCommentId } = arg;
        return {
          url: `${
            ApiPaths.course.root +
            ApiPaths.course.lesson.root +
            ApiPaths.course.lesson.replyComment
          }`,
          method: "DELETE",
          params: { userId, replyCommentId },
        };
      },
    }),
    commentLessonAction: builder.mutation({
      query: (body) => ({
        url:
          ApiPaths.course.root +
          ApiPaths.course.lesson.root +
          ApiPaths.course.lesson.commentAction,
        method: "POST",
        body,
      }),
    }),
    replycommentLessonAction: builder.mutation({
      query: (body) => ({
        url:
          ApiPaths.course.root +
          ApiPaths.course.lesson.root +
          ApiPaths.course.lesson.replyCommentAction,
        method: "POST",
        body,
      }),
    }),
    getLessonLeaderboard: builder.query({
      query: (arg) => {
        const { pageSize, lessonId, pageNumber } = arg;
        return {
          url: `${
            ApiPaths.course.root +
            ApiPaths.course.lesson.root +
            ApiPaths.course.lesson.leaderboard
          }`,
          params: { pageSize, lessonId, pageNumber },
        };
      },
    }),
    getThemes: builder.query({
      query: () => `${ApiPaths.course.root + ApiPaths.course.themes}`,
      keepUnusedDataFor: 5,
    }),
    getCodeLanguages: builder.query({
      query: () => `${ApiPaths.course.root + ApiPaths.course.codeLanguages}`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useAddCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useSetHideCourseMutation,
  useGetCoursesQuery,
  useGetCoursesByUserIdQuery,
  useGetCourseDetailQuery,
  useGetCourseDetailUpdateQuery,
  useAddCourseCommentMutation,
  useAddCourseReplyCommentMutation,
  useGetCourseCommentsMutation,
  useCommentCourseActionMutation,
  useReplycommentCourseActionMutation,
  useRegisterCourseMutation,
  useDeleteCourseCommentMutation,
  useDeleteCourseReplyCommentMutation,

  useGetChaptersByCourseIdQuery,
  useAddChapterMutation,
  useUpdateChapterMutation,
  useDeleteChapterMutation,
  useSetHideChapterMutation,

  useGetLessonsByChapterIdQuery,
  useGetLessonDetailsQuery,
  useGetLessonDetailsUpdateQuery,
  useAddLessonMutation,
  useAddLessonCommentMutation,
  useAddLessonReplyCommentMutation,
  useGetLessonCommentsMutation,
  useDeleteLessonCommentMutation,
  useDeleteLessonReplyCommentMutation,
  useCommentLessonActionMutation,
  useReplycommentLessonActionMutation,
  useRunCodeLessonMutation,
  useSubmitCodeLessonMutation,
  useGetLessonHistoryQuery,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
  useDeleteTestCaseLessonMutation,
  useSetHideLessonMutation,
  useGetLessonLeaderboardQuery,

  useGetThemesQuery,
  useGetCodeLanguagesQuery,
} = courseApiSlice;
