import { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { signup, isAuthenticated, loading: authLoading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [university, setUniversity] = useState("");
  const [department, setDepartment] = useState("");
  const [skills, setSkills] = useState("");
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
      await signup({
        name, email, password, university, department,
        skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h1>Create Account</h1>
      {error && <p className="error-message">{error}</p>}

      <label>Name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

      <label>Email</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label>Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} required />

      <label>University</label>
      <input type="text" value={university} onChange={(e) => setUniversity(e.target.value)} />

      <label>Department</label>
      <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />

      <label>Skills (comma separated)</label>
      <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} />

      <button type="submit" disabled={loading}>{loading ? "Creating account..." : "Sign Up"}</button>
      <p className="muted">Already have an account? <Link to="/login">Log in</Link></p>
    </form>
  );
};

export default Signup;