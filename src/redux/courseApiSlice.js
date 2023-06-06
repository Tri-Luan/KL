import { apiSlice } from "../api/apiSlice";
import { ApiPaths } from "../shared/api-paths";

export const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => `${ApiPaths.course.root}`,
      keepUnusedDataFor: 5,
    }),
    getCourseDetail: builder.query({
      query: (arg) => {
        const { userId, courseId } = arg;
        return {
          url: `${ApiPaths.course.root + ApiPaths.course.detail}`,
          params: { userId, courseId },
        };
      },
      keepUnusedDataFor: 5,
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
      keepUnusedDataFor: 5,
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
      keepUnusedDataFor: 5,
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
      keepUnusedDataFor: 5,
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
  useGetChaptersByCourseIdQuery,
  useAddChapterMutation,
  useUpdateChapterMutation,
  useDeleteChapterMutation,
  useSetHideChapterMutation,
  useGetLessonsByChapterIdQuery,
  useGetLessonDetailsQuery,
  useGetLessonDetailsUpdateQuery,
  useAddLessonMutation,
  useRunCodeLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
  useSetHideLessonMutation,
  useGetCodeLanguagesQuery,
} = courseApiSlice;
