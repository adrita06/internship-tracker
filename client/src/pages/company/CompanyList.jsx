import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createCompany, getCompanies } from "../../services/companyService";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", industry: "", website: "", location: "" });
  const [error, setError] = useState("");
  useEffect(() => { getCompanies().then(setCompanies).catch((err) => setError(err.response?.data?.message || "Failed to load companies")); }, []);
  const handleAddCompany = async (event) => {
    event.preventDefault();
    try {
      const company = await createCompany(form);
      setCompanies((previous) => [...previous, company].sort((a, b) => a.name.localeCompare(b.name)));
      setForm({ name: "", industry: "", website: "", location: "" });
      setShowForm(false);
    } catch (err) { setError(err.response?.data?.message || "Failed to save company"); }
  };
  return <div>
    <h1>Company Database</h1><button onClick={() => setShowForm((shown) => !shown)}>{showForm ? "Cancel" : "+ Add Company"}</button>
    {error && <p className="error-message">{error}</p>}
    {showForm && <form className="card" onSubmit={handleAddCompany}>
      <label>Company Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <label>Industry</label><input value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} />
      <label>Website</label><input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
      <label>Location</label><input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
      <button type="submit">Save Company</button>
    </form>}
    <div style={{ marginTop: "20px" }}>{companies.map((company) => <div className="card" key={company._id}><h3>{company.name}</h3><p className="muted">{company.industry} · {company.location}</p><Link to={`/companies/${company._id}`}><button className="secondary">View Details</button></Link></div>)}</div>
  </div>;
}

export default CompanyList;
