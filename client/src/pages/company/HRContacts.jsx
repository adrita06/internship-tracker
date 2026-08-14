import mockCompanies from "./mockCompanies";

function HRContacts() {
  // Flatten all HR contacts from all companies into one list
  const allContacts = mockCompanies.flatMap((company) =>
    company.hrContacts.map((contact) => ({
      ...contact,
      companyName: company.name,
    }))
  );

  return (
    <div>
      <h1>HR Contacts</h1>

      {allContacts.length === 0 ? (
        <p className="muted">No HR contacts found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {allContacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.companyName}</td>
                <td>{contact.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HRContacts;
