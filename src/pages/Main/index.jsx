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
