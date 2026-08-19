import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getApplications } from "../../services/applicationService";

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getApplications().then(setApplications).catch((err) => setError(err.response?.data?.message || "Failed to load dashboard"));
  }, []);

  const total = applications.length;

  const countByStatus = (status) =>
    applications.filter(
      (application) =>
        application.status === status
    ).length;

  return (
    <div className="dashboard">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="muted">
            Overview of your internship applications
          </p>
        </div>

        <Link
          to="/applications"
          className="btn"
        >
          View Applications
        </Link>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="stats-grid">
        <div className="stat-card">
          <span>Total Applications</span>
          <strong>{total}</strong>
        </div>

        <div className="stat-card">
          <span>Applied</span>
          <strong>
            {countByStatus("Applied")}
          </strong>
        </div>

        <div className="stat-card">
          <span>Interviews</span>
          <strong>
            {countByStatus("Interview")}
          </strong>
        </div>

        <div className="stat-card">
          <span>Offers</span>
          <strong>
            {countByStatus("Offer")}
          </strong>
        </div>

        <div className="stat-card">
          <span>Rejected</span>
          <strong>
            {countByStatus("Rejected")}
          </strong>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Applications</h2>

          <Link to="/applications">
            View all
          </Link>
        </div>

        {applications
          .slice(0, 5)
          .map((application) => (
            <div
              className="recent-application"
              key={application._id}
            >
              <div>
                <strong>
                  {application.company?.name || "Unknown company"}
                </strong>

                <span>
                  {application.position}
                </span>
              </div>

              <span>
                {application.status}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
