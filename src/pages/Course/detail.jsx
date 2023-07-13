import { Avatar, Button, Spinner, Tabs } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ModalComponent from "../../components/ui/ModalComponent";
import useModal from "../../hooks/useModal";
import { selectCurrentUser } from "../../redux/authSlice";
import { exportComponentAsPNG } from "react-component-export-image";
import certificate from "../../assets/images/certificate.png";
import userAvatar from "../../assets/images/userAvatar.png";
import {
  useAddCourseCommentMutation,
  useAddCourseReplyCommentMutation,
  useCommentCourseActionMutation,
  useDeleteCourseCommentMutation,
  useDeleteCourseReplyCommentMutation,
  useGetCourseCommentsMutation,
  useGetCourseDetailQuery,
  useRegisterCourseMutation,
  useReplycommentCourseActionMutation,
} from "../../redux/courseApiSlice";

const CourseDetail = () => {
  const navigate = useNavigate();
  const tabsRef = useRef(null);
  const props = { tabsRef };
  const { id } = useParams();
  const user = useSelector(selectCurrentUser);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(null);
  const certificateWrapper = useRef(null);
  const currentDate = new Date().toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const {
    arg: arg1,
    isShowing: isShowing1,
    toggle: toggle1,
    setArg: setArg1,
  } = useModal();
  const {
    arg: arg2,
    isShowing: isShowing2,
    toggle: toggle2,
    setArg: setArg2,
  } = useModal();
  const {
    arg: arg3,
    isShowing: isShowing3,
    toggle: toggle3,
    setArg: setArg3,
  } = useModal();
  const {
    arg: arg4,
    isShowing: isShowing4,
    toggle: toggle4,
    setArg: setArg4,
  } = useModal();
  const {
    data: course,
    isLoading: isLoadingGetCourse,
    isSuccess: isSuccessGetCourse,
    isError: isErrorGetCourse,
    error: errorGetCourse,
    refetch: refetchGetCourse,
  } = useGetCourseDetailQuery(
    { userId: user.id, courseId: id },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [getCourseComments] = useGetCourseCommentsMutation();
  const [registerCourse] = useRegisterCourseMutation();
  const [addCourseComment, { isLoading: isLoadingAddCourseComment }] =
    useAddCourseCommentMutation();
  const [addCourseReplyComment, { isLoading: isLoadingAddCourseReplyComment }] =
    useAddCourseReplyCommentMutation();
  const [commentAction] = useCommentCourseActionMutation();
  const [replyCommentAction] = useReplycommentCourseActionMutation();
  const [deleteComment, { isLoading: isLoadingDeleteCourseComment }] =
    useDeleteCourseCommentMutation();
  const [deleteReplyComment, { isLoading: isLoadingDeleteCourseReplyComment }] =
    useDeleteCourseReplyCommentMutation();
  useEffect(() => {
    if (isSuccessGetCourse) {
      document.getElementById("objective").innerHTML = course.objective;
    }
  }, [isSuccessGetCourse]);
  const handleRegisterCourse = async () => {
    const response = await registerCourse({
      userId: user.id,
      courseId: id,
    })
      .unwrap()
      .then(() => {
        refetchGetCourse();
      });
    return response;
  };
  const handleComment = async () => {
    try {
      if (comment !== "") {
        const response = await addCourseComment({
          userId: user.id,
          courseId: id,
          content: comment,
        })
          .unwrap()
          .then(async () => {
            const comments = await getCourseComments({
              userId: user.id,
              courseId: id,
            });
            setComments(comments.data);
          });
      }
      setComment("");
    } catch (err) {
      console.error("Failed to delete the comment", err);
    }
  };
  const handleReplyComment = async (arg, content) => {
    try {
      if (content !== "") {
        const response = await addCourseReplyComment({
          userId: user.id,
          courseCommentId: arg,
          content: content,
        })
          .unwrap()
          .then(async () => {
            const comments = await getCourseComments({
              userId: user.id,
              courseId: id,
            });
            setComments(comments.data);
          });
      }
    } catch (err) {
      console.error("Failed to delete the comment", err);
    }
  };

  const onLikeCommentClicked = async (commentId) => {
    try {
      await commentAction({
        userId: user.id,
        commentId: commentId,
        actionId: 0,
      })
        .unwrap()
        .then(async () => {
          const comments = await getCourseComments({
            userId: user.id,
            courseId: id,
          });
          setComments(comments.data);
        });
    } catch (err) {
      console.error("Failed to like the comment", err);
    }
  };
  const onDisLikeCommentClicked = async (commentId) => {
    try {
      await commentAction({
        userId: user.id,
        commentId: commentId,
        actionId: 1,
      })
        .unwrap()
        .then(async () => {
          const comments = await getCourseComments({
            userId: user.id,
            courseId: id,
          });
          setComments(comments.data);
        });
    } catch (err) {
      console.error("Failed to dislike the comment", err);
    }
  };
  const onLikeReplyCommentClicked = async (commentId) => {
    try {
      await replyCommentAction({
        userId: user.id,
        commentId: commentId,
        actionId: 0,
      })
        .unwrap()
        .then(async () => {
          const comments = await getCourseComments({
            userId: user.id,
            courseId: id,
          });
          setComments(comments.data);
        });
    } catch (err) {
      console.error("Failed to like the reply comment", err);
    }
  };
  const onDisLikeReplyCommentClicked = async (commentId) => {
    try {
      await replyCommentAction({
        userId: user.id,
        commentId: commentId,
        actionId: 1,
      })
        .unwrap()
        .then(async () => {
          const comments = await getCourseComments({
            userId: user.id,
            courseId: id,
          });
          setComments(comments.data);
        });
    } catch (err) {
      console.error("Failed to dislike the reply comment", err);
    }
  };
  const onDeleteCommentClicked = async (commentId) => {
    try {
      await deleteComment({ userId: user.id, commentId: commentId })
        .unwrap()
        .then(async () => {
          const comments = await getCourseComments({
            userId: user.id,
            courseId: id,
          });
          setComments(comments.data);
        });
    } catch (err) {
      console.error("Failed to delete the comment", err);
    }
  };
  const onDeleteReplyCommentClicked = async (commentId) => {
    try {
      await deleteReplyComment({ userId: user.id, replyCommentId: commentId })
        .unwrap()
        .then(async () => {
          const comments = await getCourseComments({
            userId: user.id,
            courseId: id,
          });
          setComments(comments.data);
        });
    } catch (err) {
      console.error("Failed to delete the reply comment", err);
    }
  };
  return (
    <>
      {isLoadingGetCourse ? (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner" />
          <span className="ml-2">Loading...</span>
        </div>
      ) : isSuccessGetCourse ? (
        <div>
          <section
            className={`relative  `}
            style={{
              backgroundImage: `url(data:image/gif;base64,${course.courseTheme}`,
            }}
          >
            <ModalComponent
              isShowing={isShowing3}
              arg={arg3}
              hide={toggle3}
              func={onDeleteCommentClicked}
              title="Confirmation"
              content="comment"
              type="delete"
            />
            <ModalComponent
              isShowing={isShowing4}
              arg={arg4}
              hide={toggle4}
              func={onDeleteReplyCommentClicked}
              title="Confirmation"
              content="reply comment"
              type="delete"
            />
            <div className="mx-auto w-full max-w-7xl px-14 py-10">
              <h1 className="text-white font-bold  text-3xl">
                {course.courseName}
              </h1>
              <p className="text-white line-clamp-3 w-3/5">
                {course.description}
              </p>
              <div className="mt-2.5 mb-5 flex items-center">
                <svg
                  className="h-5 w-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="h-5 w-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="h-5 w-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="h-5 w-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="h-5 w-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="mr-2 rounded  px-2.5 py-0.5 text-md font-semibold text-yellow-300 dark:text-yellow-300">
                  {course.voteScore}
                </span>
                <span className="mr-2 rounded  px-2.5 py-0.5 text-md font-normal text-white dark:text-yellow-300">
                  {course.numberOfVotes} ratings
                </span>
              </div>
              <div className="flex justify-start">
                <Avatar
                  img={userAvatar}
                  rounded={true}
                  className="mt-2.5 mb-5 ml-2 "
                >
                  <div className="space-y-1 font-medium dark:text-white">
                    <div className="text-sm text-white dark:text-white">
                      {course.authorName}
                    </div>
                  </div>
                </Avatar>
              </div>
              {course.isRegistered ? (
                <>
                  <div class="flex justify-between mb-1">
                    <span class="mb-1 text-lg font-medium text-white">
                      Progress
                    </span>
                  </div>
                  <div class="w-1/2 h-6 mb-6 bg-gray-200 rounded-full dark:bg-gray-700">
                    {course.completedPercent === 0 ? (
                      <div className="text-gray-700 h-6 text-md font-medium  text-center p-0.5 leading-none rounded-full">
                        {course.completedPercent}%
                      </div>
                    ) : (
                      <div
                        className={`bg-green-500 text-white h-6 text-md font-medium  text-center p-0.5 leading-none rounded-full`}
                        style={{ width: `${course.completedPercent}%` }}
                      >
                        {course.completedPercent}%
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <button
                    class="btnRed mt-3 "
                    onClick={() => {
                      handleRegisterCourse();
                    }}
                  >
                    Enroll for Free!
                  </button>
                  <div className="mt-7 font-medium dark:text-white">
                    <div className="text-md text-white dark:text-white">
                      <span className="font-bold text-xl">
                        {" "}
                        {course.numberOfStudents}{" "}
                      </span>
                      already enrolled
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
          <div class="mx-auto w-full max-w-7xl my-5">
            <Tabs.Group
              aria-label="Tabs with underline"
              style="underline"
              ref={props.tabsRef}
              onActiveTabChange={async (tab) => {
                if (tab === 2) {
                  const comments = await getCourseComments({
                    userId: user.id,
                    courseId: id,
                  });
                  setComments(comments.data);
                }
              }}
            >
              <Tabs.Item active={true} title="Tasks">
                <div class="grid grid-cols-2 md:grid-cols-2 gap-4">
                  <ModalComponent
                    isShowing={isShowing2}
                    arg={arg2}
                    type="confirm"
                    title="Confirm"
                    content="Do you want to join this course?"
                    func={handleRegisterCourse}
                    hide={toggle2}
                  />
                  {course.chapters !== null
                    ? course.chapters.map((chapter, i) => {
                        return (
                          <div className="lesson mt-14">
                            <center>
                              <div className="title w-fit px-6 py-3 text-center rounded-full bg-indigo-500 text-white">
                                <h3>{chapter.name}</h3>
                              </div>
                              <div className="flex justify-center my-6">
                                {chapter.lessons.map((lesson, i) => {
                                  return (
                                    <button
                                      className="mx-1.5 my-3"
                                      onClick={() => {
                                        if (course.isRegistered) {
                                          navigate(`/course/detail`, {
                                            state: {
                                              useFor: "course",
                                              id: lesson.id,
                                              courseId: id,
                                            },
                                          });
                                        } else {
                                          toggle2();
                                        }
                                      }}
                                    >
                                      <div
                                        className={`rounded-full ${
                                          lesson.isLearned
                                            ? "bg-indigo-500 text-white"
                                            : "bg-white"
                                        } hover:bg-indigo-500 hover:text-white border-2 border-indigo-500 text-indigo-500 font-medium pt-1.5 w-10 h-10`}
                                      >
                                        {lesson.lessonNumber}
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </center>
                          </div>
                        );
                      })
                    : null}
                </div>
              </Tabs.Item>
              <Tabs.Item title="Objective">
                <div id="objective"></div>
              </Tabs.Item>

              <Tabs.Item title="Comments">
                <section class="bg-white dark:bg-gray-900 py-2 lg:py-4">
                  <div class="max-w-2xl px-4">
                    <div class="flex justify-between items-center mb-6"></div>
                    {isLoadingDeleteCourseComment ||
                    isLoadingAddCourseReplyComment ||
                    isLoadingAddCourseComment ? (
                      <div className="text-center">
                        <Spinner aria-label="Center-aligned spinner" />
                        <span className="ml-2">Loading...</span>
                      </div>
                    ) : null}
                    <ModalComponent
                      isShowing={isShowing1}
                      arg={arg1}
                      type="replycomment"
                      title="Reply comment"
                      func={handleReplyComment}
                      hide={toggle1}
                    />

                    <div class="mb-6">
                      <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <label for="comment" class="sr-only">
                          Your comment
                        </label>
                        <textarea
                          id="comment"
                          rows="6"
                          class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                          placeholder="Write a comment..."
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </div>
                      <button
                        class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-blue-600"
                        onClick={handleComment}
                      >
                        Post comment
                      </button>
                    </div>
                    {comments !== null
                      ? comments.courseComments.map((comment, i) => {
                          return (
                            <>
                              <article class="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
                                <footer class="flex justify-between items-center mb-2">
                                  <div class="flex items-center">
                                    <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                      <img
                                        class="mr-2 w-6 h-6 rounded-full"
                                        src={userAvatar}
                                        alt="Michael Gough"
                                      />
                                      {comment.authorName}
                                    </p>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">
                                      <time pubdate>
                                        {new Date(
                                          comment.commentDate
                                        ).toLocaleString("en-US", {
                                          month: "long",
                                          day: "numeric",
                                          year: "numeric",
                                        })}
                                      </time>
                                    </p>
                                  </div>
                                  {comment.authorId === user.id ? (
                                    <button
                                      class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                      type="button"
                                      onClick={() => {
                                        setArg3(comment.commentId);
                                        toggle3();
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
                                </footer>
                                <p class="text-gray-900 ">{comment.content}</p>
                                <div class="flex items-center mt-4 space-x-4">
                                  <button
                                    type="button"
                                    class="relative inline-flex items-center pr-5 py-2.5 text-sm font-medium text-center "
                                    onClick={() => {
                                      onLikeCommentClicked(comment.commentId);
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1}
                                      stroke="currentColor"
                                      className="w-6 h-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                                      />
                                    </svg>

                                    <div class="absolute inline-flex items-center justify-center w-6 h-6 text-md font-bold text-green-500 border-2 border-white rounded-full -right-1 ">
                                      {comment.numberOfLike}
                                    </div>
                                  </button>
                                  <button
                                    type="button"
                                    class="relative inline-flex items-center pr-5 py-2.5 text-sm font-medium text-center "
                                    onClick={() => {
                                      onDisLikeCommentClicked(
                                        comment.commentId
                                      );
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1"
                                      stroke="currentColor"
                                      class="w-6 h-6"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                                      />
                                    </svg>

                                    <div class="absolute inline-flex items-center justify-center w-6 h-6 text-md font-bold text-red-500 border-2 border-white rounded-full -right-1 ">
                                      {comment.numberOfDislike}
                                    </div>
                                  </button>
                                  <button
                                    type="button"
                                    class="flex items-center text-md text-gray-500 hover:underline dark:text-gray-400"
                                    onClick={() => {
                                      setArg1(comment.commentId);
                                      toggle1();
                                    }}
                                  >
                                    <svg
                                      aria-hidden="true"
                                      class="mr-1 w-4 h-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                      ></path>
                                    </svg>
                                    Reply
                                  </button>
                                </div>
                              </article>
                              {comment.replyComments.length !== 0
                                ? comment.replyComments.map(
                                    (replycomment, i) => {
                                      return (
                                        <article class="p-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
                                          <footer class="flex justify-between items-center mb-2">
                                            <div class="flex items-center">
                                              <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                                <img
                                                  class="mr-2 w-6 h-6 rounded-full"
                                                  src={userAvatar}
                                                  alt="Jese Leos"
                                                />
                                                {replycomment.authorName}
                                              </p>
                                              <p class="text-sm text-gray-600 dark:text-gray-400">
                                                <time pubdate>
                                                  {new Date(
                                                    replycomment.commentDate
                                                  ).toLocaleString("en-US", {
                                                    month: "long",
                                                    day: "numeric",
                                                    year: "numeric",
                                                  })}
                                                </time>
                                              </p>
                                            </div>
                                            {replycomment.authorId ===
                                            user.id ? (
                                              <button
                                                id={`dropdownComment${i}Button`}
                                                data-dropdown-toggle={`dropdownComment${i}`}
                                                class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                                type="button"
                                                onClick={() => {
                                                  setArg4(
                                                    replycomment.commentId
                                                  );
                                                  toggle4();
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
                                                <span class="sr-only">
                                                  Comment settings
                                                </span>
                                              </button>
                                            ) : null}
                                          </footer>
                                          <p class="text-gray-900">
                                            {replycomment.content}
                                          </p>
                                          <div class="flex items-center mt-4 space-x-4">
                                            <button
                                              type="button"
                                              class="relative inline-flex items-center pr-5 py-2.5 text-sm font-medium text-center "
                                              onClick={() => {
                                                onLikeReplyCommentClicked(
                                                  replycomment.commentId
                                                );
                                              }}
                                            >
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                                                />
                                              </svg>

                                              <div class="absolute inline-flex items-center justify-center w-6 h-6 text-md font-bold text-green-500 border-2 border-white rounded-full -right-1 ">
                                                {replycomment.numberOfLike}
                                              </div>
                                            </button>
                                            <button
                                              type="button"
                                              class="relative inline-flex items-center pr-5 py-2.5 text-sm font-medium text-center "
                                              onClick={() => {
                                                onDisLikeReplyCommentClicked(
                                                  replycomment.commentId
                                                );
                                              }}
                                            >
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1"
                                                stroke="currentColor"
                                                class="w-6 h-6"
                                              >
                                                <path
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                  d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                                                />
                                              </svg>

                                              <div class="absolute inline-flex items-center justify-center w-6 h-6 text-md font-bold text-red-500 border-2 border-white rounded-full -right-1 ">
                                                {replycomment.numberOfDislike}
                                              </div>
                                            </button>
                                          </div>
                                        </article>
                                      );
                                    }
                                  )
                                : null}
                            </>
                          );
                        })
                      : null}
                  </div>
                </section>
              </Tabs.Item>
              <Tabs.Item title="Certificate">
                <div
                  id="downloadWrapper"
                  className="p-5"
                  ref={certificateWrapper}
                >
                  <div
                    id="certificateWrapper "
                    className="overflow-hidden relative w-[880px] h-[620px]"
                  >
                    <h3 className="absolute left-[240px] top-[270px] text-6xl font-medium font-pinyon">
                      {user.lastName + " " + user.firstName}
                    </h3>
                    <h3 className="absolute left-[210px] top-[370px] text-4xl font-faustina">
                      {course.courseName}
                    </h3>

                    <h5 className="absolute text-gray-600  left-[220px] top-[445px] text-base font-faustina">
                      Ho Chi Minh,{" "}
                      {course.completedDate !== null
                        ? new Date(course.completedDate).toLocaleString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          )
                        : currentDate}
                    </h5>
                    <img
                      className="block w-[880px] h-[620px] "
                      src={certificate}
                      alt="Certificate"
                    />
                  </div>
                </div>

                <Button
                  className="ml-96 py-3 px-8"
                  gradientDuoTone="cyanToBlue"
                  disabled={!course.isCompleted}
                  onClick={(e) => {
                    e.preventDefault();
                    exportComponentAsPNG(certificateWrapper, {
                      html2CanvasOptions: { backgroundColor: null },
                      fileName: "certificate",
                    });
                  }}
                >
                  Download
                </Button>
              </Tabs.Item>
            </Tabs.Group>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CourseDetail;
