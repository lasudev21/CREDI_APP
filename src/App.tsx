import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDashboardStore } from "./store/DashboardStore";
import Login from "./containers/Login";
import { Layout } from "./containers/Layout/Layout";
import { ToastContainer } from "react-toastify";

export default function App() {
  const isAuthenticated = useDashboardStore((state) => state.isAuthenticated);
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate
                to="/"
                replace
              />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <Layout />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        stacked 
      />
      <ToastContainer />
    </Router>
  );
}
