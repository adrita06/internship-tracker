import { NavLink } from "react-router-dom";

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
  return <nav className="navbar">
    <span className="brand">Internship Tracker</span>
    {links.map(([to, label]) => <NavLink key={to} to={to} className={({ isActive }) => isActive ? "active" : ""}>{label}</NavLink>)}
  </nav>;
}

export default Navbar;
