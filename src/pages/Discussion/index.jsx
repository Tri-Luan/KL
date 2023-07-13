import { Button, Pagination, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  useGetDiscussionsQuery,
  useDeleteDiscussionMutation,
} from "../../redux/discussionApiSlice";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import userAvatar from "../../assets/images/userAvatar.png";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import { selectCurrentUser } from "../../redux/authSlice";
import { useSelector } from "react-redux";
import ModalComponent from "../../components/ui/ModalComponent";
import useModal from "../../hooks/useModal";
export default function Discussion() {
  const user = useSelector(selectCurrentUser);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isSuccess, isError, error, refetch } =
    useGetDiscussionsQuery(
      { pageSize: 3, pageNumber: currentPage },
      {
        refetchOnMountOrArgChange: true,
      }
    );
  const [deleteDiscussion, { isLoading: isLoadingDeleteCourseReplyComment }] =
    useDeleteDiscussionMutation();
  const { arg, isShowing, toggle, setArg } = useModal();
  const onDeleteDiscussionClicked = async (discussionId) => {
    try {
      const res = await deleteDiscussion({
        userId: user.id,
        discussionId: discussionId,
      }).unwrap();
      if (res.isSuccessful) {
        await refetch();
      }
    } catch (err) {
      console.error("Failed to delete the discussion", err);
    }
  };
  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner" />
          <span className="ml-2">Loading...</span>
        </div>
      ) : isSuccess ? (
        <div className="bg-white py-6 sm:py-6">
          <ModalComponent
            isShowing={isShowing}
            arg={arg}
            hide={toggle}
            func={onDeleteDiscussionClicked}
            title="Confirmation"
            content="discussion"
            type="delete"
          />
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <div className="ml-8 mb-3">
              <Breadcrumbs />
            </div>
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="ml-8 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Discussion
              </h2>
            </div>
            <div class="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              <div class="relative"></div>
              <div class="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                {user ? (
                  <Link to={`/discussion/create`}>
                    <Button gradientDuoTone="cyanToBlue">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                      Create new discussion
                    </Button>
                  </Link>
                ) : (
                  <span className="text-red-500">
                    Login to create new discussion
                  </span>
                )}
              </div>
            </div>
            <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-1">
              {data.discussions !== null
                ? data.discussions.map((post, i) => (
                    <article
                      key={post.discussionId}
                      className="flex gap-x-4 text-xs items-start"
                    >
                      <Link to={`/discussion/${post.discussionId}`}>
                        <img
                          className="w-[320px] h-[256px] rounded-3xl"
                          src={"data:image/jpeg;base64," + post.discussionImage}
                          alt=""
                        />
                      </Link>
                      <div className="relative mt-5">
                        <span className="text-gray-600">Created </span>
                        <time className="text-gray-600">
                          {new Date(post.discussionDate).toLocaleString(
                            "vi-VN",
                            {
                              month: "numeric",
                              day: "numeric",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            }
                          )}
                        </time>
                        <h5 className="hover:text-[#2e72e7]  text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                          <Link to={`/discussion/${post.discussionId}`}>
                            {post.discussionName}
                          </Link>
                        </h5>
                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                          {post.discussionDescription}
                        </p>
                        <div className="flex mt-12 mr-2">
                          <ChatBubbleOvalLeftEllipsisIcon
                            className="h-6 w-6text-gray-600 "
                            aria-hidden="true"
                          />
                          <span class="text-blue-600  text-base ml-1 font-semibold leading-6">
                            {post.totalComments}
                          </span>
                        </div>

                        <div className="relative mt-2 flex items-center gap-x-4">
                          <img
                            src={userAvatar}
                            alt=""
                            className="h-10 w-10 rounded-full bg-gray-50"
                          />
                          <div className="text-sm leading-6">
                            <span class="text-blue-600 font-semibold">
                              {post.authorName}
                            </span>
                          </div>
                        </div>
                        {user !== null && post.authorId === user.id ? (
                          <button
                            class="mt-2 inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            type="button"
                            onClick={() => {
                              setArg(post.discussionId);
                              toggle();
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5 text-red-700"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        ) : null}
                      </div>
                    </article>
                  ))
                : null}
              {data.totalPages > 1 ? (
                <div className="mx-auto">
                  <Pagination
                    currentPage={currentPage}
                    onPageChange={(page) => {
                      setCurrentPage(page);
                    }}
                    showIcons
                    totalPages={data.totalPages}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
