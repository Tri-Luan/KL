import { Badge } from "flowbite-react";
import { Link } from "react-router-dom";
import { useGetCoursesQuery } from "../../redux/courseApiSlice";

const Course = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetCoursesQuery();
  console.log(data);
  return (
    <div>
      {isLoading ? (
        <div>
          <li className="flex items-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mr-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
            Processing...
          </li>
        </div>
      ) : isSuccess ? (
        <section>
          <section className="udeCarousel">
            <div className="carousel__content">
              <h1>Luyện tập theo lịch của bạn</h1>
              <p>Luyện tập bất kỳ chủ đề, bất cứ lúc nào.</p>
              <button
                class="btnRed mt-3 ml-20"
                // onClick={() => {
                //   handleButton();
                // }}
              >
                Bắt đầu ngay!
              </button>
            </div>
          </section>

          {data.coursesLists.map((courseLists, i) => {
            return (
              <>
                {courseLists.courses.length !== 0 ? (
                  <div className="container mx-auto my-5" key={i}>
                    <h2 className="text-4xl my-5 font-semibold tracking-tight text-gray-900 dark:text-white">
                      {courseLists.courseLevelName}
                    </h2>
                    <div class="grid lg:grid-cols-4 lg:gap-3 gap-2 xl:gap-x-3">
                      {courseLists.courses.map((course, i) => {
                        return (
                          <div key={i}>
                            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                              <Link to={`/course/${course.id}`}>
                                <img
                                  class="rounded-t-lg h-52 min-w-full"
                                  src={"data:image/jpeg;base64," + course.image}
                                  alt=""
                                />
                              </Link>
                              <div class="view-content px-4 py-4">
                                <div class="view-content-header">
                                  <Badge color="info" size="sm">
                                    Online
                                  </Badge>
                                  <Link to={`/course/${course.id}`}>
                                    <h5 className="hover:text-[#2e72e7] text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                      {course.courseName}
                                    </h5>
                                  </Link>

                                  <span class="course-author">
                                    {course.authorName}
                                  </span>
                                </div>
                                <p className="course-description line-clamp-2 font-normal text-gray-700 dark:text-gray-400">
                                  {course.description}
                                </p>
                                <div class="course-footer-left">
                                  <Badge color="info" size="6xl">
                                    Free
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </>
            );
          })}
        </section>
      ) : null}
    </div>

    // <div class="popover-course arrow-left" style="left: calc(100% + 20px); right: unset;">
    // <a href="/learning/object-oriented-programming-in-cpp" title="Object Oriented-Programming in C++"> <h3 class="popover-course__title">Object Oriented-Programming in C++</h3></a>
    // <div class="popover-course__sum">
    // <div class="author">
    // <img src="/CodeCamp/CodeCamp/Upload/Avatar/a76638850ecc4722b76d255e9cdd462f.jpg" alt="TuanLQ7">
    // <a href="/profile/3488" class="user-name" title="TuanLQ7">TuanLQ7</a>
    // </div>
    // <span class="rate-wrap">
    // <span class="star-rating"><span style="width:88.0%"></span></span>
    // <span class="avg-rate">4.4</span>
    // <span class="total-rate">(219)</span>
    // </span>
    // </div>
    // <ul class="popover-course__detail-infor">
    // <li><p><i class="cl-icon-dribbble"></i> Online </p></li>
    // <li><p><i class="cl-icon-users-alt"></i> 51854 students</p></li>
    // <li><p><i class="cl-icon-star" avg-rate="4.4"></i> Great reviews from students</p></li>
    // <li><p><i class="cl-icon-clock"></i> Time to complete: <strong>40 hours</strong></p></li>
    // <li><p><i class="cl-icon-award"></i> Certificate of Course Completion</p></li>
    // </ul>
    // </div>
    // </div>
    // </article>
  );
};

export default Course;
