import { Route, Routes } from "react-router-dom";
import Unauthorized from "./components/ui/Unauthorized";
import Course from "./pages/Course";
import ChapterManagement from "./pages/Course/Chapter/manage";
import CreateCourse from "./pages/Course/create";
import CourseDetail from "./pages/Course/detail";
import CourseManagement from "./pages/Course/manage";
import UpdateCourse from "./pages/Course/update";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RequireAuth from "./pages/Login/RequireAuth";
import Layout from "./pages/Main/index";
import Register from "./pages/Register";

const ROLES = {
  Student: "Student",
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* protect routes */}
        {/* allowedRoles={[ROLES.Student]}  */}

        <Route path="course">
          <Route index element={<Course />} />
          <Route element={<RequireAuth />}>
            <Route path=":id" element={<CourseDetail />} />
          </Route>
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/coursemanagement">
            <Route index element={<CourseManagement />} />
            <Route path="create" element={<CreateCourse />} />
            <Route path="chapter/:id" element={<ChapterManagement />} />
            <Route path="update/:id" element={<UpdateCourse />} />
          </Route>
        </Route>
        {/* <Route path="/practice" element={<PracticePage />}></Route>
            <Route path="/post" element={<PostPage />}></Route>
            <Route path="/history" element={<HistoryPage />}></Route>
            <Route path="/score-board" element={<ScoreBoardPage />}></Route>
            <Route path="/result" element={<ResultPage />}></Route>
            
            <Route path="/testcase-detail" element={<TestCaseDetailPage />}></Route>
            <Route path="/editor/:exerciseID" element={<EditorPage />}></Route> */}

        {/* catch all route */}
        <Route path="*" element={<Home />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
