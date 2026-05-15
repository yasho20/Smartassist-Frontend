import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n/i18n.js";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            fontWeight: "500",
            fontSize: "14px",
          },
          success: {
            style: {
              background: "#e0f7e9",
              color: "#1a7f37",
              border: "1px solid #a8e6c0",
            },
          },
          error: {
            style: {
              background: "#fdecea",
              color: "#c0392b",
              border: "1px solid #f5c6c6",
            },
          },
        }}
      />
      <App />
    </AuthProvider>
  </React.StrictMode>
);