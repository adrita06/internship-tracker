import { useEffect, useState } from "react";
import { getCompanies } from "../../services/companyService";

function HRContacts() {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => { getCompanies().then(setCompanies).catch((err) => setError(err.response?.data?.message || "Failed to load contacts")); }, []);
  const contacts = companies.flatMap((company) => company.hrContacts.map((contact) => ({ ...contact, companyName: company.name })));
  return <div><h1>HR Contacts</h1>{error && <p className="error-message">{error}</p>}{contacts.length === 0 ? <p className="muted">No HR contacts found.</p> : <table><thead><tr><th>Name</th><th>Company</th><th>Mobile</th><th>Email</th></tr></thead><tbody>{contacts.map((item) => <tr key={item._id}><td>{item.name}</td><td>{item.companyName}</td><td>{item.mobile || "-"}</td><td>{item.email || "-"}</td></tr>)}</tbody></table>}</div>;
}
export default HRContacts;
