import { useState } from "react";
import { Link } from "react-router-dom";
import mockCompanies from "./mockCompanies";

function CompanyList() {
  const [companies, setCompanies] = useState(mockCompanies);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");

  function handleAddCompany(e) {
    e.preventDefault();
    const newCompany = {
      id: Date.now(),
      name,
      industry,
      website,
      location,
      notes: "",
      hrContacts: [],
    };
    setCompanies([...companies, newCompany]);
    setName("");
    setIndustry("");
    setWebsite("");
    setLocation("");
    setShowForm(false);
  }

  return (
    <div>
      <h1>Company Database</h1>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "+ Add Company"}
      </button>

      {showForm && (
        <form className="card" onSubmit={handleAddCompany}>
          <label>Company Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Industry</label>
          <input
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          />

          <label>Website</label>
          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />

          <label>Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <button type="submit">Save Company</button>
        </form>
      )}

      <div style={{ marginTop: "20px" }}>
        {companies.map((company) => (
          <div className="card" key={company.id}>
            <h3>{company.name}</h3>
            <p className="muted">
              {company.industry} · {company.location}
            </p>
            <Link to={`/companies/${company.id}`}>
              <button className="secondary">View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompanyList;
