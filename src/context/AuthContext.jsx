import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [problems, setProblems] = useState([]);

  const login = (username, role) => {
    setUser({ username, role });
  };

  const logout = () => {
    setUser(null);
    setBookings([]);
    setProblems([]);
  };

  const addBooking = (booking) => {
    setBookings((prev) => [...prev, booking]);
  };

  const addProblem = (problem) => {
    setProblems((prev) => [...prev, problem]);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, bookings, addBooking, problems, addProblem }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}