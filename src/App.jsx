import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RootLayout from "./pages/root/root";
import UserPage from "./pages/users/User";
import UserPostPage from "./pages/userposts/UserPostPage";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <LoginPage />, // Əsas səhifə açıldıqda LoginPage görünsün
//   },
//   {
//     path: "",
//     element: <RootLayout />,
//     children: [
//       { path: "questions", element: <QuestionPage /> },
//       { path: "questionscategory", element: <QuestionCategoryPage /> },
//       { path: "users", element: <UserPage /> },
//       { path: "userscategory", element: <UserCategoryPage /> },
//       { path: "quiz", element: <QuizPage /> },
//       { path: "tag", element: <TagPage /> },
//     ],
//   },
//   { path: "/frquestions", element: <FrQuestionsPage /> },
// ]);
function App() {
  return (
      <Router>
        <Routes>
        
          <Route element={<RootLayout />}>
          
            <Route
              path="/"
              element={
                  <UserPage />
              }
            ></Route>

            <Route path="/posts"
              element={
                  <UserPostPage />
              }></Route>

          </Route>
        </Routes>
      </Router>
  );
}

export default App;