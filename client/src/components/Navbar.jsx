import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <span className="brand">Internship Tracker</span>
      <NavLink to="/companies" className={({ isActive }) => (isActive ? "active" : "")}>
        Companies
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
        Profile
      </NavLink>
      <NavLink to="/settings" className={({ isActive }) => (isActive ? "active" : "")}>
        Settings
      </NavLink>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? "active" : ""
        }
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/applications"
        className={({ isActive }) =>
          isActive ? "active" : ""
        }
      >
        Applications
      </NavLink>
      <NavLink
        to="/cvs"

      <NavLink
        to="/interview"
        className={({ isActive }) =>
          isActive ? "active" : ""
        }
      >
        CVs
      </NavLink>
      <NavLink
        to="/fitscore"
        className={({ isActive }) =>
          isActive ? "active" : ""
        }
      >
        FitScore
        Interview Prep
      </NavLink>
    </nav>
  );
}

export default Navbar;
