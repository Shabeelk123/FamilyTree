import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import MemberPage from "./pages/MemberPage";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
  useEffect(() => {
    // Check if user is authenticated on app startup
    const token = localStorage.getItem("token");
    if (!token && window.location.pathname !== "/login" && window.location.pathname !== "/signup") {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/member/:id" element={<MemberPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
