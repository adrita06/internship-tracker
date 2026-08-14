import { useEffect, useState } from "react";

const statuses = [
  "Wishlist",
  "Applied",
  "HR Screening",
  "Interview",
  "Offer",
  "Rejected",
];

function ApplicationModal({
  isOpen,
  onClose,
  onSave,
  application,
}) {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "Wishlist",
    applicationDate: "",
    jobDescription: "",
    fitScore: 0,
    interviewNotes: "",
    experience: "",
  });

  useEffect(() => {
    if (application) {
      setFormData(application);
    } else {
      setFormData({
        company: "",
        position: "",
        status: "Wishlist",
        applicationDate: "",
        jobDescription: "",
        fitScore: 0,
        interviewNotes: "",
        experience: "",
      });
    }
  }, [application, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "fitScore"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.company.trim()) {
      alert("Company is required");
      return;
    }

    if (!formData.position.trim()) {
      alert("Position is required");
      return;
    }

    onSave({
      ...formData,
      id: application?.id || Date.now().toString(),
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>
            {application
              ? "Edit Application"
              : "Add Application"}
          </h2>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Company</label>
          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. Vivasoft"
          />

          <label>Position</label>
          <input
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="e.g. Software Engineer Intern"
          />

          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <label>Application Date</label>
          <input
            type="date"
            name="applicationDate"
            value={formData.applicationDate}
            onChange={handleChange}
          />

          <label>FitScore</label>
          <input
            type="number"
            name="fitScore"
            min="0"
            max="100"
            value={formData.fitScore}
            onChange={handleChange}
          />

          <label>Job Description</label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            rows="4"
          />

          <div className="modal-actions">
            <button
              type="button"
              className="secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit">
              {application ? "Save Changes" : "Add Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplicationModal;