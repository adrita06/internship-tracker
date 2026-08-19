import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ApplicationModal from "../../components/ApplicationModal";
import { deleteApplication, getApplication, updateApplication } from "../../services/applicationService";
import { getCompanies } from "../../services/companyService";

function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getApplication(id), getCompanies()])
      .then(([applicationData, companyData]) => { setApplication(applicationData); setCompanies(companyData); })
      .catch((err) => setError(err.response?.data?.message || "Failed to load application"));
  }, [id]);

  const handleSave = async (updatedApplication) => {
    try {
      const saved = await updateApplication(application._id, updatedApplication);
      setApplication(saved);
      setModalOpen(false);
    } catch (err) { setError(err.response?.data?.message || "Failed to save application"); }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;
    try { await deleteApplication(id); navigate("/applications"); }
    catch (err) { setError(err.response?.data?.message || "Failed to delete application"); }
  };

  if (error && !application) return <p className="error-message">{error}</p>;
  if (!application) return <p className="muted">Loading application...</p>;

  return <div className="application-details">
    <button className="secondary" onClick={() => navigate("/applications")}>Back to Applications</button>
    <div className="details-header"><div><h1>{application.position}</h1><h2>{application.company?.name || "Unknown company"}</h2></div><span className="status-badge">{application.status}</span></div>
    <div className="details-grid"><div className="details-card"><h3>Application Date</h3><p>{new Date(application.applicationDate).toLocaleDateString()}</p></div><div className="details-card"><h3>FitScore</h3><p className="large-score">{application.fitScore}%</p></div></div>
    <div className="details-section"><h2>Job Description</h2><p>{application.jobDescription || "No job description added."}</p></div>
    <div className="details-section"><h2>Experience</h2><p>{application.experience || "No experience added."}</p></div>
    <div className="details-section"><h2>Interview Notes</h2><p>{application.interviewNotes || "No interview notes added."}</p></div>
    <div className="actions"><button onClick={() => setModalOpen(true)}>Edit Application</button><button className="danger" onClick={handleDelete}>Delete</button></div>
    {error && <p className="error-message">{error}</p>}
    <ApplicationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} application={application} companies={companies} />
  </div>;
}

export default ApplicationDetails;
