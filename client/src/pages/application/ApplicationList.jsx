import { useState } from "react";
import ApplicationCard from "../../components/ApplicationCard";
import ApplicationModal from "../../components/ApplicationModal";
import {
  mockApplications,
  applicationStatuses,
} from "./mockApplications";

function ApplicationList() {
  const [applications, setApplications] =
    useState(mockApplications);

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

  const handleSave = (application) => {
    setApplications((prev) => {
      const exists = prev.some(
        (item) => item.id === application.id
      );

      if (exists) {
        return prev.map((item) =>
          item.id === application.id
            ? application
            : item
        );
      }

      return [...prev, application];
    });
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
                      key={application.id}
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
      />
    </div>
  );
}

export default ApplicationList;