import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  mockApplications,
} from "./mockApplications";
import ApplicationModal from "../../components/ApplicationModal";

function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [applications, setApplications] =
    useState(mockApplications);

  const [modalOpen, setModalOpen] = useState(false);

  const application = applications.find(
    (item) => item.id === id
  );

  if (!application) {
    return (
      <div>
        <h1>Application not found</h1>
        <button onClick={() => navigate("/applications")}>
          Back to Applications
        </button>
      </div>
    );
  }

  const handleSave = (updatedApplication) => {
    setApplications((prev) =>
      prev.map((item) =>
        item.id === updatedApplication.id
          ? updatedApplication
          : item
      )
    );

    setModalOpen(false);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) return;

    setApplications((prev) =>
      prev.filter((item) => item.id !== id)
    );

    navigate("/applications");
  };

  return (
    <div className="application-details">
      <button
        className="secondary"
        onClick={() => navigate("/applications")}
      >
        ← Back to Applications
      </button>

      <div className="details-header">
        <div>
          <h1>{application.position}</h1>
          <h2>{application.company}</h2>
        </div>

        <span className="status-badge">
          {application.status}
        </span>
      </div>

      <div className="details-grid">
        <div className="details-card">
          <h3>Application Date</h3>
          <p>{application.applicationDate}</p>
        </div>

        <div className="details-card">
          <h3>FitScore</h3>
          <p className="large-score">
            {application.fitScore}%
          </p>
        </div>
      </div>

      <div className="details-section">
        <h2>Job Description</h2>
        <p>
          {application.jobDescription ||
            "No job description added."}
        </p>
      </div>

      <div className="details-section">
        <h2>Experience</h2>
        <p>
          {application.experience ||
            "No experience added."}
        </p>
      </div>

      <div className="details-section">
        <h2>Interview Notes</h2>
        <p>
          {application.interviewNotes ||
            "No interview notes added."}
        </p>
      </div>

      <div className="actions">
        <button onClick={() => setModalOpen(true)}>
          Edit Application
        </button>

        <button
          className="danger"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>

      <ApplicationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        application={application}
      />
    </div>
  );
}

export default ApplicationDetails;