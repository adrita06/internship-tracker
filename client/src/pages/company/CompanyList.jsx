import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createCompany, getCompanies } from "../../services/companyService";

const emptyContact = () => ({ name: "", email: "", mobile: "", linkedin: "" });
const emptyForm = () => ({ name: "", industry: "", website: "", location: "", notes: "", hrContacts: [emptyContact()] });

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    getCompanies().then(setCompanies).catch((err) => setError(err.response?.data?.message || "Failed to load companies"));
  }, []);

  const updateContact = (index, field, value) => {
    setForm((previous) => ({
      ...previous,
      hrContacts: previous.hrContacts.map((contact, contactIndex) => contactIndex === index ? { ...contact, [field]: value } : contact),
    }));
  };

  const handleAddCompany = async (event) => {
    event.preventDefault();
    try {
      const company = await createCompany({
        ...form,
        hrContacts: form.hrContacts.filter((contact) => contact.name.trim()),
      });
      setCompanies((previous) => [...previous, company].sort((a, b) => a.name.localeCompare(b.name)));
      setForm(emptyForm());
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save company");
    }
  };

  return <div>
    <h1>Company Database</h1>
    <button onClick={() => setShowForm((shown) => !shown)}>{showForm ? "Cancel" : "+ Add Company"}</button>
    {error && <p className="error-message">{error}</p>}
    {showForm && <form className="card" onSubmit={handleAddCompany}>
      <label>Company Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <label>Industry</label><input value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} />
      <label>Website</label><input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
      <label>Location</label><input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
      <label>Notes</label><textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows="2" />
      <h2>HR Contacts</h2>
      {form.hrContacts.map((contact, index) => <div className="contact-fields" key={index}>
        <label>Contact Name</label><input value={contact.name} onChange={(e) => updateContact(index, "name", e.target.value)} />
        <label>Email</label><input type="email" value={contact.email} onChange={(e) => updateContact(index, "email", e.target.value)} />
        <label>Mobile Number</label><input type="tel" value={contact.mobile} onChange={(e) => updateContact(index, "mobile", e.target.value)} />
        <label>LinkedIn URL</label><input type="url" value={contact.linkedin} onChange={(e) => updateContact(index, "linkedin", e.target.value)} />
        {form.hrContacts.length > 1 && <button type="button" className="secondary" onClick={() => setForm({ ...form, hrContacts: form.hrContacts.filter((_, contactIndex) => contactIndex !== index) })}>Remove Contact</button>}
      </div>)}
      <button type="button" className="secondary" onClick={() => setForm({ ...form, hrContacts: [...form.hrContacts, emptyContact()] })}>+ Add HR Contact</button>
      <button type="submit">Save Company</button>
    </form>}
    <div style={{ marginTop: "20px" }}>{companies.map((company) => <div className="card" key={company._id}><h3>{company.name}</h3><p className="muted">{company.industry} - {company.location}</p><Link to={`/companies/${company._id}`}><button className="secondary">View Details</button></Link></div>)}</div>
  </div>;
}

export default CompanyList;
