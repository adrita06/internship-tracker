import { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!authLoading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h1>Log In</h1>
      {error && <p className="error-message">{error}</p>}

      <label>Email</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label>Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

      <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
      <p className="muted">Don't have an account? <Link to="/signup">Sign up</Link></p>
    </form>
  );
};

export default Login;