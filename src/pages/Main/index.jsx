import React, { Component } from "react";
import { Outlet, Route, Routes } from "react-router-dom";

// redux
import { connect } from "react-redux";
// import { addExercises, fetchExercises } from "../../redux/ActionCreators";

// import ExerciseListComponent from "./ExerciseListComponent";
// import Home from "./HomeComponent";
// import Editor from "./EditorComponent";
// import Post from "./PostComponent";
// import History from "./HistoryComponent";
// import Result from "./ResultComponent";

// import ScoreBoard from "./ScoreBoardComponent";
// import TestCaseFail from "./TestCaseFalseDetailComponent";

import Header from "../../components/ui/HeaderComponent";
import Footer from "../../components/ui/FooterComponent";
import Login from "../Login/index";
import Register from "../Register/index";

import Home from "../Home";
import Course from "../Course";

// const mapStateToProps = (state) => {
//   return {
//     exercises: state.exercises,
//   };
// };

// const mapDispatchToProps = (dispatch) => ({
//   addExercises: (
//     Author_id,
//     Question_id,
//     Title,
//     Topic,
//     Level,
//     Description,
//     CreateDate
//   ) =>
//     dispatch(
//       addExercises(
//         Author_id,
//         Question_id,
//         Title,
//         Topic,
//         Level,
//         Description,
//         CreateDate
//       )
//     ),
//   fetchExercises: () => dispatch(fetchExercises()),
// });

class Layout extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   data: {
    //     Author_id: Number,
    //     CreateDate: "",
    //     Description: "",
    //     Level: "",
    //     Question_id: Number,
    //     Title: "",
    //     Topic: "",
    //   },
    //   Access_token: sessionStorage.getItem("Access_token"),
    // };
  }
  // componentDidMount() {
  //   this.props.fetchExercises();
  // }
  render() {
    const HomePage = () => {
      return (
        <div>
          <Header />
          <Home />
          <Footer />
        </div>
      );
    };
    const CoursePage = () => {
      return (
        <div>
          <Header />
          <Course />
          <Footer />
        </div>
      );
    };
    // const PracticePage = () => {
    //   return (
    //     <div>
    //       <Header />
    //       <ExerciseListComponent exercises={this.props.exercises} />
    //       <Footer />
    //     </div>
    //   );
    // };
    // const PostPage = () => {
    //   return (
    //     <div>
    //       <Header />
    //       <Post />
    //       <Footer />
    //     </div>
    //   );
    // };
    // const EditorPage = () => {
    //   return <Editor exercises={this.props.exercises} />;
    // };
    // const HistoryPage = () => {
    //   return (
    //     <div>
    //       <Header />
    //       <History />
    //       <Footer />
    //     </div>
    //   );
    // };
    // const ResultPage = () => {
    //   return (
    //     <div>
    //       <Header />
    //       <Result />
    //       <Footer />
    //     </div>
    //   );
    // };
    const LoginPage = () => {
      return (
        <div>
          <Login />
        </div>
      );
    };
    const RegisterPage = () => {
      return (
        <div>
          <Register />
        </div>
      );
    };
    // const ScoreBoardPage = () => {
    //   return (
    //     <div>
    //       <Header />
    //       <ScoreBoard />
    //       <Footer />
    //     </div>
    //   );
    // };
    // const TestCaseDetailPage = () => {
    //   return (
    //     <div>
    //       <Header />
    //       <TestCaseFail />
    //       <Footer />
    //     </div>
    //   );
    // };
    return (
      <main className="App">
        <Header />
        <Outlet />
        <Footer />
      </main>
    );
  }
}
// export default connect(mapStateToProps, mapDispatchToProps)(Main);
export default Layout;
