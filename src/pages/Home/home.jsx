import { Badge, Card, Tabs } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { useGetCoursesQuery } from "../../redux/courseApiSlice";

const Home = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetCoursesQuery();
  return (
    <div>
      <section className="udeCarousel">
        <div className="carousel__content">
          <h1>Learning according to your schedule</h1>
          <p>Practice any subject, any time</p>
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
      <section className="container mx-auto">
        <h3>Courses</h3>
        <Tabs.Group aria-label="Tabs with icons" style="underline">
          <Tabs.Item active title="Profile">
            {/* {data.coursesLists.map((courseLists, i) => {
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
                                    src={
                                      "data:image/jpeg;base64," + course.image
                                    }
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
            })} */}
          </Tabs.Item>
          <Tabs.Item title="Dashboard">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <p>
                This is some placeholder content the
                <span className="font-medium text-gray-800 dark:text-white">
                  Dashboard tab's associated content
                </span>
                . Clicking another tab will toggle the visibility of this one
                for the next. The tab JavaScript swaps classes to control the
                content visibility and styling.
              </p>
            </p>
          </Tabs.Item>
          <Tabs.Item title="Settings">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <p>
                This is some placeholder content the
                <span className="font-medium text-gray-800 dark:text-white">
                  Settings tab's associated content
                </span>
                . Clicking another tab will toggle the visibility of this one
                for the next. The tab JavaScript swaps classes to control the
                content visibility and styling.
              </p>
            </p>
          </Tabs.Item>
          <Tabs.Item title="Contacts">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <p>
                This is some placeholder content the
                <span className="font-medium text-gray-800 dark:text-white">
                  Contacts tab's associated content
                </span>
                . Clicking another tab will toggle the visibility of this one
                for the next. The tab JavaScript swaps classes to control the
                content visibility and styling.
              </p>
            </p>
          </Tabs.Item>
          <Tabs.Item disabled title="Disabled">
            <p>Disabled content</p>
          </Tabs.Item>
        </Tabs.Group>
      </section>
    </div>
  );
};

export default Home;
