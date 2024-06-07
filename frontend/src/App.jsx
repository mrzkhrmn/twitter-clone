import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { Sidebar } from "./components/common/Sidebar";
import { RightSidebar } from "./components/common/RightSidebar";
import { NotificationsPage } from "./pages/NotificationsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";
import { LoadingSpinner } from "./components/common/LoadingSpinner";
import { useSelector } from "react-redux";

function App() {
  const { currentUser, loading } = useSelector((state) => state.user);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  return (
    <div className="flex max-w-6xl mx-auto">
      <Router>
        {currentUser && <Sidebar />}
        <Routes>
          <Route
            path="/"
            element={currentUser ? <HomePage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/signup"
            element={currentUser ? <Navigate to={"/"} /> : <SignupPage />}
          />
          <Route
            path="/login"
            element={currentUser ? <Navigate to={"/"} /> : <LoginPage />}
          />
          <Route
            path="/notifications"
            element={
              currentUser ? <NotificationsPage /> : <Navigate to={"/login"} />
            }
          />
          <Route
            path="/profile/:username"
            element={currentUser ? <ProfilePage /> : <Navigate to={"/login"} />}
          />
        </Routes>
        {currentUser && <RightSidebar />}
        <Toaster />
      </Router>
    </div>
  );
}

export default App;
