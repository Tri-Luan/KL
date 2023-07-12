import { useNavigate } from "react-router-dom";

const DefaultHome = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <section className="udeCarousel ">
        <div className="carousel__content p-10 mx-auto w-full max-w-7xl ">
          <h1>Learning according to your schedule</h1>
          <p>Practice any subject, any time</p>
          <button
            class="btnRed mt-3 ml-20"
            onClick={() => {
              navigate(`/course`);
            }}
          >
            Leet's get started!
          </button>
        </div>
      </section>
      {/* Intro start */}
      <section className="intro">
        <div className="intro__content">
          <div className="flex flex-row pl-8 py-1 mx-auto w-full max-w-7xl justify-between">
            <div className="">
              <div className="intro__item flex flex-row">
                <div className="item__icon">
                  <i className="fa fa-bullseye" />
                </div>
                <div className="ml-4 item__text">
                  <h3>Easily achieve the goal</h3>
                  <p>Persevere to learning every day</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="intro__item flex flex-row">
                <div className="item__icon">
                  <i className="fa fa-check-circle" />
                </div>
                <div className="ml-4 item__text">
                  <h3>Help you to progress quickly</h3>
                  <p>Keep practicing every day</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="intro__item flex flex-row">
                <div className="item__icon">
                  <i className="fa fa-clock" />
                </div>
                <div className="ml-4 item__text">
                  <h3>Unlimited practice</h3>
                  <p>Practice whenever you want</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Intro end */}
      {/* <!-- SERVICE START --> */}
      <section id="services">
        <h1>Roadmap to become a programmer</h1>
        <div className="services__content  mx-auto w-full max-w-7xl">
          <div className="services__item ">
            <i className="fa fa-adjust" />
            <h3>Learn to code</h3>
            <p>
              Start learning with a wide range of basic to advanced courses
              created by top experts.
            </p>
          </div>
          <div className="services__item">
            <i className="fa fa-snowflake" />
            <h3>Practice coding</h3>
            <p>
              Level up your programming skills every day with our library of
              many challenges.
            </p>
          </div>
          <div className="services__item">
            <i className="fa fa-chart-pie" />
            <h3>Join coding contest</h3>
            <p>
              Participate in contests to test the geek in you and improve your
              coding skills.
            </p>
          </div>
          <div className="services__item">
            <i className="fab fa-slideshare" />
            <h3>Discussion together</h3>
            <p>Sharing and discussing together helps you gain knowledge.</p>
          </div>
        </div>
      </section>

      {/* <!-- EDN SERVICE --> */}

      {/* Banner start */}
      <section class="banner">
        <div class="line"></div>
        <div class="banner__content">
          <div class="row">
            <div class="banner_title ">
              <h3>AROUSE YOUR PROGRAMMING PASSION!</h3>
              <p>Register and join the best developer community!</p>
              <button
                class="btnRed"
                onClick={() => {
                  navigate(`/register`);
                }}
              >
                Start now!
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Banner end */}
      {/* <button
        className=""
        onClick={() => {
          navigate(`/editor/${exerciseID}`, {
            state: {
              exerciseName,
            },
          });
        }}
      >
        Editor
      </button> */}
    </div>
  );
};

export default DefaultHome;
