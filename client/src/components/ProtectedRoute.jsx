import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // Wait until we check the authentication cookie
  if (loading) {
    return <div>Loading...</div>;
  }

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Logged in
  return <Outlet />;
};

export default ProtectedRoute;