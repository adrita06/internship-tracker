import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createCompany, getCompanies } from "../../services/companyService";

const contact = () => ({ name: "", email: "", mobile: "", linkedin: "" });
const initialForm = () => ({ name: "", industry: "", website: "", location: "", notes: "", hrContacts: [contact()] });

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { getCompanies().then(setCompanies).catch((err) => setError(err.response?.data?.message || "Failed to load companies")); }, []);
  const updateContact = (index, field, value) => setForm((current) => ({ ...current, hrContacts: current.hrContacts.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item) }));
  const saveCompany = async (event) => {
    event.preventDefault();
    try {
      const saved = await createCompany({ ...form, hrContacts: form.hrContacts.filter((item) => item.name.trim()) });
      setCompanies((current) => [...current, saved].sort((a, b) => a.name.localeCompare(b.name)));
      setForm(initialForm());
      setShowForm(false);
    } catch (err) { setError(err.response?.data?.message || "Failed to save company"); }
  };

  return <div>
    <div className="page-header"><div><h1>Company Database</h1><p className="muted">Manage companies and HR contacts</p></div><button onClick={() => setShowForm((value) => !value)}>{showForm ? "Cancel" : "+ Add Company"}</button></div>
    {error && <p className="error-message">{error}</p>}
    {showForm && <form className="card" onSubmit={saveCompany}>
      <label>Company Name</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <label>Industry</label><input value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} />
      <label>Website</label><input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
      <label>Location</label><input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
      <label>Notes</label><textarea rows="2" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
      <h2>HR Contacts</h2>{form.hrContacts.map((item, index) => <div className="contact-fields" key={index}>
        <label>Name</label><input value={item.name} onChange={(e) => updateContact(index, "name", e.target.value)} />
        <label>Email</label><input type="email" value={item.email} onChange={(e) => updateContact(index, "email", e.target.value)} />
        <label>Mobile Number</label><input type="tel" value={item.mobile} onChange={(e) => updateContact(index, "mobile", e.target.value)} />
        <label>LinkedIn URL</label><input value={item.linkedin} onChange={(e) => updateContact(index, "linkedin", e.target.value)} />
        {form.hrContacts.length > 1 && <button type="button" className="secondary" onClick={() => setForm({ ...form, hrContacts: form.hrContacts.filter((_, itemIndex) => itemIndex !== index) })}>Remove Contact</button>}
      </div>)}
      <div className="actions"><button type="button" className="secondary" onClick={() => setForm({ ...form, hrContacts: [...form.hrContacts, contact()] })}>Add HR Contact</button><button type="submit">Save Company</button></div>
    </form>}
    {companies.map((company) => <div className="card" key={company._id}><h3>{company.name}</h3><p className="muted">{company.industry || "No industry"} - {company.location || "No location"}</p><Link to={`/companies/${company._id}`}><button className="secondary">View Details</button></Link></div>)}
  </div>;
}
export default CompanyList;
