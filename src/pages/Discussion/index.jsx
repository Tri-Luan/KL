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
    useGetDiscussionsQuery({ pageSize: 3, pageNumber: currentPage });
  const [deleteDiscussion, { isLoading: isLoadingDeleteCourseReplyComment }] =
    useDeleteDiscussionMutation();
  const { arg, isShowing, toggle, setArg } = useModal();
  const onDeleteDiscussionClicked = async (discussionId) => {
    try {
      await deleteDiscussion({ userId: user.id, discussionId: discussionId })
        .unwrap()
        .then(async () => {
          const res = await refetch();
        });
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
              <label for="table-search" class="sr-only">
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                />
              </div>

              <div class="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
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
              </div>
            </div>
            <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-1">
              {data.discussions.map((post, i) => (
                <article
                  key={post.discussionId}
                  className="flex gap-x-4 text-xs items-start"
                >
                  <Link
                    to={`/discussion/${post.discussionId}`}
                    // state={{ id: post.discussionId }}
                  >
                    {i % 4 === 0 ? (
                      <img
                        className="w-[320px] h-[256px] rounded-3xl"
                        src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80"
                        alt=""
                      />
                    ) : i % 4 === 1 ? (
                      <img
                        className="w-[320px] h-[256px] rounded-3xl"
                        src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80"
                        alt=""
                      />
                    ) : i % 4 === 2 ? (
                      <img
                        className="w-[320px] h-[256px] rounded-3xl"
                        src="https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80"
                        alt=""
                      />
                    ) : (
                      <img
                        className="w-[320px] h-[256px] rounded-3xl"
                        src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80"
                        alt=""
                      />
                    )}
                  </Link>
                  <div className="relative mt-5">
                    <span className="text-gray-600">Created </span>
                    <time className="text-gray-600">
                      {new Date(post.discussionDate).toLocaleString("vi-VN", {
                        month: "numeric",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </time>
                    <h5 className="hover:text-[#2e72e7] mt-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      <Link
                        to={`/discussion/${post.discussionId}`}
                        // state={{ id: post.discussionId }}
                      >
                        {post.discussionName}
                      </Link>
                    </h5>

                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                      {post.discussionDescription}
                    </p>

                    <div className="relative mt-14 flex items-center gap-x-4">
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
                  {/* <div className="flex text-right mr-2 ml-0">
                    <ChatBubbleOvalLeftEllipsisIcon
                      className="h-6 w-6   text-gray-600 "
                      aria-hidden="true"
                    />
                    <span class="text-blue-600 font-semibold leading-6">
                      {post.totalComments}
                    </span>
                  </div> */}
                </article>
              ))}
              <div className="mx-auto">
                <Pagination
                  // aria-current={currentPage}
                  currentPage={currentPage}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                  }}
                  showIcons
                  totalPages={data.totalPages}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
