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
        console.log("arg: ", userId);
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
        console.log("arg: ", userId);
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
        // headers: {
        //   'content-type': credentials.courseImage.type,
        //   // 'content-length': `${credentials.size}`, // 👈 Headers need to be a string
        // },
        body,
        // formData: true,
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
  }),
});

export const {
  useAddCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useGetCoursesQuery,
  useGetCoursesByUserIdQuery,
  useGetCourseDetailQuery,
  useGetCourseDetailUpdateQuery,
} = courseApiSlice;
