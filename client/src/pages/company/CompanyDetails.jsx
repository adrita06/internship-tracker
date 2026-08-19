import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteCompany, getCompany, updateCompany } from "../../services/companyService";

const emptyContact = () => ({ name: "", email: "", mobile: "", linkedin: "" });
const toForm = (company) => ({ name: company.name, industry: company.industry || "", website: company.website || "", location: company.location || "", notes: company.notes || "", hrContacts: company.hrContacts.length ? company.hrContacts.map(({ name, email, mobile, linkedin }) => ({ name, email: email || "", mobile: mobile || "", linkedin: linkedin || "" })) : [emptyContact()] });

function CompanyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [form, setForm] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getCompany(id).then((data) => { setCompany(data); setForm(toForm(data)); }).catch((err) => setError(err.response?.data?.message || "Failed to load company"));
  }, [id]);

  const updateContact = (index, field, value) => setForm((previous) => ({ ...previous, hrContacts: previous.hrContacts.map((contact, contactIndex) => contactIndex === index ? { ...contact, [field]: value } : contact) }));
  const saveCompany = async (event) => {
    event.preventDefault();
    try {
      const saved = await updateCompany(id, { ...form, hrContacts: form.hrContacts.filter((contact) => contact.name.trim()) });
      setCompany(saved); setForm(toForm(saved)); setEditing(false);
    } catch (err) { setError(err.response?.data?.message || "Failed to update company"); }
  };
  const removeCompany = async () => {
    if (!window.confirm(`Delete ${company.name}? This cannot be undone.`)) return;
    try { await deleteCompany(id); navigate("/companies"); }
    catch (err) { setError(err.response?.data?.message || "Failed to delete company"); }
  };

  if (error && !company) return <p className="error-message">{error}</p>;
  if (!company || !form) return <p className="muted">Loading company...</p>;
  return <div>
    <Link to="/companies"><button className="secondary">Back to Companies</button></Link>
    <div className="page-header"><h1>{company.name}</h1><div className="actions"><button onClick={() => setEditing((active) => !active)}>{editing ? "Cancel" : "Edit Company"}</button><button className="danger" onClick={removeCompany}>Delete Company</button></div></div>
    {error && <p className="error-message">{error}</p>}
    {editing ? <form className="card" onSubmit={saveCompany}>
      <label>Company Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <label>Industry</label><input value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} />
      <label>Website</label><input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
      <label>Location</label><input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
      <label>Notes</label><textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows="2" />
      <h2>HR Contacts</h2>
      {form.hrContacts.map((contact, index) => <div className="contact-fields" key={index}><label>Contact Name</label><input value={contact.name} onChange={(e) => updateContact(index, "name", e.target.value)} /><label>Email</label><input type="email" value={contact.email} onChange={(e) => updateContact(index, "email", e.target.value)} /><label>Mobile Number</label><input type="tel" value={contact.mobile} onChange={(e) => updateContact(index, "mobile", e.target.value)} /><label>LinkedIn URL</label><input type="url" value={contact.linkedin} onChange={(e) => updateContact(index, "linkedin", e.target.value)} />{form.hrContacts.length > 1 && <button type="button" className="secondary" onClick={() => setForm({ ...form, hrContacts: form.hrContacts.filter((_, contactIndex) => contactIndex !== index) })}>Remove Contact</button>}</div>)}
      <button type="button" className="secondary" onClick={() => setForm({ ...form, hrContacts: [...form.hrContacts, emptyContact()] })}>+ Add HR Contact</button><button type="submit">Save Changes</button>
    </form> : <><div className="card"><p><strong>Industry:</strong> {company.industry || "N/A"}</p><p><strong>Location:</strong> {company.location || "N/A"}</p><p><strong>Website:</strong> {company.website || "N/A"}</p><p><strong>Notes:</strong> {company.notes || "No notes yet."}</p></div><h2>HR Contacts</h2>{company.hrContacts.length === 0 ? <p className="muted">No HR contacts added yet.</p> : company.hrContacts.map((contact) => <div className="card" key={contact._id || contact.email}><p><strong>{contact.name}</strong></p><p className="muted">{contact.email}</p>{contact.mobile && <p className="muted">{contact.mobile}</p>}{contact.linkedin && <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn profile</a>}</div>)}</>}
  </div>;
}
export default CompanyDetails;
