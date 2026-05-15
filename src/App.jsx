import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProblemInput from "./pages/ProblemInput";
import Recommendations from "./pages/recommendation";
import BookAppointment from "./pages/BookAppointment";
import Ratings from "./pages/Ratings";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";

function AppWrapper() {
  const { darkMode } = useAuth();

  return (
    <div className={`min-h-screen ${darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="problem" element={<ProblemInput />} />
            <Route path="recommendation" element={<Recommendations />} />
            <Route path="book" element={<BookAppointment />} />
            <Route path="ratings" element={<Ratings />} />
            <Route path="admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default function App() {
  return <AppWrapper />;
}