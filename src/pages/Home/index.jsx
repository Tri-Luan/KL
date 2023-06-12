const DefaultHome = () => {
  return (
    <div>
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
      {/* Intro start */}
      {/* <section className="intro">
        <div className="intro__content ">
          <div className="row">
            <div className="col-md-4">
              <div className="intro__item d-flex">
                <div className="item__icon">
                  <i className="fa fa-bullseye" />
                </div>
                <div className="item__text">
                  <h3>Đa dạng bài tập</h3>
                  <p>Luyện tập nhiều dạng bài tập</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="intro__item d-flex">
                <div className="item__icon">
                  <i className="fa fa-check-circle" />
                </div>
                <div className="item__text">
                  <h3>Giúp bạn nhanh tiến bộ</h3>
                  <p>Kiên trì luyện tập hàng ngày</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="intro__item d-flex">
                <div className="item__icon">
                  <i className="fa fa-clock" />
                </div>
                <div className="item__text">
                  <h3>Luyện tập không giới hạn</h3>
                  <p>Luyện tập bất cứ khi nào bạn muốn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* Intro end */}
      {/* <!-- SERVICE START --> */}
      <section id="services">
        <h1>Lộ trình trở thành lập trình viên</h1>
        <div className="services__content">
          <div className="services__item">
            <i className="fa fa-adjust" />
            <h3>Học lập trình</h3>
            <p>Học lập trình cơ bản đến nâng cao thông qua các khóa học.</p>
          </div>
          <div className="services__item">
            <i className="fa fa-snowflake" />
            <h3>Luyện lập trình</h3>
            <p>Luyện lập trình hằng ngày với hàng nghìn bài tập lớn nhỏ.</p>
          </div>
          <div className="services__item">
            <i className="fa fa-chart-pie" />
            <h3>Thi lập trình</h3>
            <p>
              Tham gia các cuộc thi và cải thiện kỹ năng lập trình liên tục.
            </p>
          </div>
          <div className="services__item">
            <i className="fab fa-slideshare" />
            <h3>Tìm hiểu lập trình</h3>
            <p>
              Tìm hiểu kiến thức lập trình thông qua chia sẻ từ các chuyên gia.
            </p>
          </div>
        </div>
      </section>

      {/* <!-- EDN SERVICE --> */}

      {/* Banner start */}
      {/* <section class="banner">
        <div class="line"></div>
        <div class="banner__content  grid lg:grid-cols-4">
          <div class="row">
            <div class="auto-cols-auto banner__item">
              <i class="fa fa-bowling-ball"></i>
            </div>
            <div class="auto-cols-auto banner__item">
              <i class="fa fa-box"></i>
            </div>
            <div class="col-sm-auto banner__item">
              <i class="fa fa-bus"></i>
            </div>
            <div class="col-sm-auto banner__item">
              <i class="fa fa-candy-cane"></i>
            </div>
            <div class="col-sm-auto banner__item">
              <i class="fa fa-camera-retro"></i>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-auto banner__item">
              <i class="fab fa-canadian-maple-leaf"></i>
            </div>
            <div class="banner_title ">
              <h3>Nâng cao kỹ năng lập trình của bạn</h3>
              <p>Đăng ký tài khoản và bắt đầu ngay hôm nay!</p>
              <button
                class="btnRed"
                // onClick={() => {
                //   handleButton();
                // }}
              >
                Bắt đầu ngay!
              </button>
            </div>
            <div class="col-sm-auto banner__item">
              <i class="fa fa-cat"></i>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-auto banner__item">
              <i class="fa fa-chess-king"></i>
            </div>
            <div class="col-sm-auto banner__item">
              <i class="fab fa-chrome"></i>
            </div>
            <div class="col-sm-auto banner__item">
              <i class="fab fa-codepen"></i>
            </div>
            <div class="col-sm-auto banner__item">
              <i class="fa fa-democrat"></i>
            </div>
            <div class="col-sm-auto banner__item">
              <i class="fa fa-dice-d20"></i>
            </div>
          </div>
        </div>
      </section> */}

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
