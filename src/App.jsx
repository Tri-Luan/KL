import { Route, Routes } from "react-router-dom";
import Unauthorized from "./components/ui/Unauthorized";
import CodeEditor1 from "./pages/CodeEditor/editor1";
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
import Practice from "./pages/Practice";
import CreatePractice from "./pages/Practice/create";
import PracticeManagement from "./pages/Practice/manage";
import UpdatePractice from "./pages/Practice/update";
import Register from "./pages/Register";
import CodeEditor2 from "./pages/CodeEditor/editor2";
import Discussion from "./pages/Discussion";
import CreateDiscussion from "./pages/Discussion/create";
import DiscussionDetail from "./pages/Discussion/detail";

const ROLES = {
  Student: "Student",
};

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="course/detail" element={<CodeEditor1 />} />
      <Route path="practice/:name" element={<CodeEditor2 />} />
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route element={<PersistLogin />}>
          <Route index element={<DefaultHome />} />

          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="home" element={<Home />} />
          {/* protect routes */}
          {/* allowedRoles={[ROLES.Student]}  */}

          <Route path="course">
            <Route index element={<Course />} />
            <Route element={<RequireAuth />}>
              <Route path=":id" element={<CourseDetail />} />
              {/* <Route path="detail/:name" element={<CodeEditor />} /> */}
            </Route>
          </Route>

          <Route path="discussion">
            <Route index element={<Discussion />} />
            <Route path="create" element={<CreateDiscussion />} />
          </Route>

          <Route element={<RequireAuth />}>
            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="discussion/:id" element={<DiscussionDetail />} />
            <Route path="practice">
              <Route index element={<Practice />} />
            </Route>
            <Route path="practicemanagement">
              <Route index element={<PracticeManagement />} />
              <Route path="create" element={<CreatePractice />} />
              <Route path="update/:id" element={<UpdatePractice />} />
            </Route>
            <Route path="coursemanagement">
              <Route index element={<CourseManagement />} />
              <Route path="create" element={<CreateCourse />} />
              <Route path="update/:id" element={<UpdateCourse />} />
            </Route>
            <Route path="chaptermanagement">
              <Route path=":id" element={<ChapterManagement />} />
            </Route>
            <Route path="lessonmanagement">
              <Route path=":id" element={<LessonManagement />} />
              <Route path="create/:id" element={<CreateLesson />} />
              <Route path="update/:id" element={<UpdateLesson />} />
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
    </Routes>
  );
}

export default App;
