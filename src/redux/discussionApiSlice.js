import { apiSlice } from "../api/apiSlice";
import { ApiPaths } from "../shared/api-paths";

export const discussionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDiscussions: builder.query({
      query: (arg) => {
        const { pageSize, pageNumber } = arg;
        return {
          url: `${ApiPaths.discussion.root}`,
          params: { pageSize, pageNumber },
        };
      },
    }),
    getDiscussionDetails: builder.query({
      query: (arg) => {
        const { userId, discussionId } = arg;
        return {
          url: `${ApiPaths.discussion.root + ApiPaths.discussion.detail}`,
          params: { userId, discussionId },
        };
      },
    }),
    addDiscussion: builder.mutation({
      query: (body) => ({
        url: ApiPaths.discussion.root,
        method: "PUT",
        body,
      }),
    }),
    updateDiscussion: builder.mutation({
      query: (body) => ({
        url: ApiPaths.practice.root,
        method: "POST",
        body,
      }),
    }),
    deleteDiscussion: builder.mutation({
      query: (arg) => {
        const { userId, discussionId } = arg;
        return {
          url: `${ApiPaths.discussion.root}`,
          params: { userId, discussionId },
          method: "DELETE",
        };
      },
    }),
    addDiscussionComment: builder.mutation({
      query: (body) => ({
        url: `${ApiPaths.discussion.root + ApiPaths.discussion.comment}`,
        method: "PUT",
        body,
      }),
    }),
    addDiscussionReplyComment: builder.mutation({
      query: (body) => ({
        url: `${ApiPaths.discussion.root + ApiPaths.discussion.replyComment}`,
        method: "PUT",
        body,
      }),
    }),
    deleteDiscussionComment: builder.mutation({
      query: (arg) => {
        const { userId, commentId } = arg;
        return {
          url: `${ApiPaths.discussion.root + ApiPaths.discussion.comment}`,
          params: { userId, commentId },
          method: "DELETE",
        };
      },
    }),
    deleteDiscussionReplyComment: builder.mutation({
      query: (arg) => {
        const { userId, replyCommentId } = arg;
        return {
          url: `${ApiPaths.discussion.root + ApiPaths.discussion.replyComment}`,
          params: { userId, replyCommentId },
          method: "DELETE",
        };
      },
    }),
    commentDiscussionAction: builder.mutation({
      query: (body) => ({
        url: `${ApiPaths.discussion.root + ApiPaths.discussion.commentAction}`,
        method: "POST",
        body,
      }),
    }),
    replyCommentDiscussionAction: builder.mutation({
      query: (body) => ({
        url: `${
          ApiPaths.discussion.root + ApiPaths.discussion.replyCommentAction
        }`,
        method: "POST",
        body,
      }),
    }),
  }),
});
export const {
  useGetDiscussionsQuery,
  useGetDiscussionDetailsQuery,
  useAddDiscussionMutation,
  useUpdateDiscussionMutation,
  useDeleteDiscussionMutation,
  useAddDiscussionCommentMutation,
  useAddDiscussionReplyCommentMutation,
  useCommentDiscussionActionMutation,
  useReplyCommentDiscussionActionMutation,
  useDeleteDiscussionCommentMutation,
  useDeleteDiscussionReplyCommentMutation,
} = discussionApiSlice;
