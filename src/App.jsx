import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RootLayout from "./pages/root/root";
import UserPage from "./pages/users/User";
import UserDetail from "./pages/users/UserDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<UserPage />}></Route>
          <Route path="/users/:id" element={<UserDetail />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;