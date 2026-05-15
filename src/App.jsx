import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProblemInput from "./pages/ProblemInput";
import Recommendations from "./pages/recommendation";
import BookAppointment from "./pages/BookAppointment";
import Ratings from "./pages/Ratings";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";

export default function App() {
  return (
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
  );
}