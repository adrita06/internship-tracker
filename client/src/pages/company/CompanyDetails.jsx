import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCompany } from "../../services/companyService";

function CompanyDetails() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => { getCompany(id).then(setCompany).catch((err) => setError(err.response?.data?.message || "Failed to load company")); }, [id]);
  if (error) return <p className="error-message">{error}</p>;
  if (!company) return <p className="muted">Loading company...</p>;
  return <div>
    <Link to="/companies"><button className="secondary">Back to Companies</button></Link>
    <h1>{company.name}</h1>
    <div className="card"><p><strong>Industry:</strong> {company.industry || "N/A"}</p><p><strong>Location:</strong> {company.location || "N/A"}</p><p><strong>Website:</strong> {company.website || "N/A"}</p><p><strong>Notes:</strong> {company.notes || "No notes yet."}</p></div>
    <h2>HR Contacts</h2>
    {company.hrContacts.length === 0 ? <p className="muted">No HR contacts added yet.</p> : company.hrContacts.map((contact) => <div className="card" key={contact._id || contact.email}><p><strong>{contact.name}</strong></p><p className="muted">{contact.email}</p></div>)}
    <Link to="/hr-contacts"><button>View All HR Contacts</button></Link>
  </div>;
}
export default CompanyDetails;
