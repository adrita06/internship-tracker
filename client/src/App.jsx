import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import CompanyList from "./pages/company/CompanyList";
import CompanyDetails from "./pages/company/CompanyDetails";
import HRContacts from "./pages/company/HRContacts";
import UserProfile from "./pages/profile/UserProfile";
import Settings from "./pages/profile/Settings";
import Dashboard from "./pages/application/Dashboard";
import ApplicationList from "./pages/application/ApplicationList";
import ApplicationDetails from "./pages/application/ApplicationDetails";
import CVList from "./pages/cv/CVList";
import FitScore from "./pages/fitscore/FitScore";
import InterviewQuestions from "./pages/interview/InterviewQuestions";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import ProtectedRoute from "./components/ProtectedRoute";
import "./simple.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/companies" element={<CompanyList />} />
            <Route path="/companies/:id" element={<CompanyDetails />} />
            <Route path="/hr-contacts" element={<HRContacts />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/settings" element={<Settings />} />
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/applications"
              element={<ApplicationList />}
            />

            <Route
              path="/applications/:id"
              element={<ApplicationDetails />}
            />
            <Route path="/cvs" element={<CVList />} />
            <Route path="/fitscore" element={<FitScore />} />
            <Route path="/interview" element={<InterviewQuestions />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
