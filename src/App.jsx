import { Route, Routes } from "react-router-dom";
import Unauthorized from "./components/ui/Unauthorized";
import CodeEditor from "./pages/CodeEditor";
import Editor from "./pages/CodeEditor/editor";
import Course from "./pages/Course";
import CreateLesson from "./pages/Course/Chapter/Lesson/create";
import LessonManagement from "./pages/Course/Chapter/Lesson/manage";
import UpdateLesson from "./pages/Course/Chapter/Lesson/update";
import ChapterManagement from "./pages/Course/Chapter/manage";
import CreateCourse from "./pages/Course/create";
import CourseDetail from "./pages/Course/detail";
import CourseManagement from "./pages/Course/manage";
import UpdateCourse from "./pages/Course/update";
import DefaultHome from "./pages/Home";
import Home from "./pages/Home/home";
import Login from "./pages/Login";
import PersistLogin from "./pages/Login/PersistLogin";
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
        <Route element={<PersistLogin />}>
          <Route index element={<DefaultHome />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="home" element={<Home />} />
          {/* protect routes */}
          {/* allowedRoles={[ROLES.Student]}  */}

          <Route path="course">
            <Route index element={<Course />} />
            <Route element={<RequireAuth />}>
              <Route path=":id" element={<CourseDetail />} />
            </Route>
          </Route>

          <Route element={<RequireAuth />}>
            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="/coursemanagement">
              <Route index element={<CourseManagement />} />
              <Route path="create" element={<CreateCourse />} />
              <Route path="lesson">
                <Route path=":id" element={<LessonManagement />} />
                <Route path="create/:id" element={<CreateLesson />} />
                <Route path="update/:id" element={<UpdateLesson />} />
              </Route>
              <Route path="chapter/:id" element={<ChapterManagement />} />
              <Route path="update/:id" element={<UpdateCourse />} />
            </Route>
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
        <Route path="*" element={<DefaultHome />}></Route>
      </Route>
      <Route element={<PersistLogin />}>
        <Route path="codeeditor/:id" element={<CodeEditor />} />
        <Route path="editor" element={<Editor />} />
      </Route>
    </Routes>
  );
}

export default App;
