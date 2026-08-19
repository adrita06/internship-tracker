import { useEffect, useState } from "react";
import { getCompanies } from "../../services/companyService";

function HRContacts() {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => { getCompanies().then(setCompanies).catch((err) => setError(err.response?.data?.message || "Failed to load contacts")); }, []);
  const allContacts = companies.flatMap((company) => company.hrContacts.map((contact) => ({ ...contact, companyName: company.name })));
  return <div><h1>HR Contacts</h1>{error && <p className="error-message">{error}</p>}{allContacts.length === 0 ? <p className="muted">No HR contacts found.</p> : <table><thead><tr><th>Name</th><th>Company</th><th>Email</th></tr></thead><tbody>{allContacts.map((contact) => <tr key={contact._id || `${contact.companyName}-${contact.email}`}><td>{contact.name}</td><td>{contact.companyName}</td><td>{contact.email}</td></tr>)}</tbody></table>}</div>;
}
export default HRContacts;
