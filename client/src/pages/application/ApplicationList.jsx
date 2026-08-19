import { useEffect, useState } from "react";
import ApplicationCard from "../../components/ApplicationCard";
import ApplicationModal from "../../components/ApplicationModal";
import { applicationStatuses } from "./mockApplications";
import { createApplication, getApplications, updateApplication } from "../../services/applicationService";
import { getCompanies } from "../../services/companyService";


function ApplicationList() {
  const [applications, setApplications] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState(null);

  const handleAdd = () => {
    setSelectedApplication(null);
    setModalOpen(true);
  };

  const handleEdit = (application) => {
    setSelectedApplication(application);
    setModalOpen(true);
  };

  useEffect(() => {
    Promise.all([getApplications(), getCompanies()])
      .then(([applicationData, companyData]) => {
        setApplications(applicationData);
        setCompanies(companyData);
      })
      .catch((err) => setError(err.response?.data?.message || "Failed to load applications"));
  }, []);

  const handleSave = async (application) => {
    try {
      setError("");
      if (application._id) {
        const updated = await updateApplication(application._id, application);
        setApplications((prev) => prev.map((item) => item._id === updated._id ? updated : item));
      } else {
        const created = await createApplication(application); 
        setApplications((prev) => [...prev, created]);
      }
      setModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save application");
    }
  };

  return (
    <div className="applications-page">
      <div className="page-header">
        <div>
          <h1>Applications</h1>
          <p className="muted">
            Track your internship applications
          </p>
        </div>

        <button onClick={handleAdd}>
          + Add Application
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="kanban-board">
        {applicationStatuses.map((status) => {
          const statusApplications =
            applications.filter(
              (application) =>
                application.status === status
            );

          return (
            <div
              className="kanban-column"
              key={status}
            >
              <div className="kanban-column-header">
                <h2>{status}</h2>
                <span>
                  {statusApplications.length}
                </span>
              </div>

              <div className="kanban-cards">
                {statusApplications.map(
                  (application) => (
                    <ApplicationCard
                      key={application._id}
                      application={application}
                      onEdit={handleEdit}
                    />
                  )
                )}

                {statusApplications.length === 0 && (
                  <p className="empty-column">
                    No applications
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <ApplicationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        application={selectedApplication}
        companies={companies}
      />
    </div>
  );
}

export default ApplicationList;
