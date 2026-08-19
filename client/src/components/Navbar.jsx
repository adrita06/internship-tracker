import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const links = [
  ["/dashboard", "Dashboard"],
  ["/applications", "Applications"],
  ["/companies", "Companies"],
  ["/cvs", "CVs"],
  ["/fitscore", "FitScore"],
  ["/interview", "Interview Prep"],
  ["/profile", "Profile"],
  ["/settings", "Settings"],
];

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <span className="brand">Internship Tracker</span>

      {isAuthenticated && (
        <>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} className={({ isActive }) => (isActive ? "active" : "")}>
              {label}
            </NavLink>
          ))}

          {user && <span className="muted">{user.name}</span>}

          <button type="button" className="secondary" onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;