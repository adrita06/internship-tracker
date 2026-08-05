import { useState } from "react";

function UserProfile() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Ayesha Mashiat");
  const [email, setEmail] = useState("ayesha@example.com");
  const [university, setUniversity] = useState("IUT");
  const [department, setDepartment] = useState("CSE");
  const [skills, setSkills] = useState("React, Node.js, MongoDB");

  function handleSave(e) {
    e.preventDefault();
    setEditing(false);
  }

  return (
    <div>
      <h1>User Profile</h1>

      {!editing ? (
        <div className="card">
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>University:</strong> {university}
          </p>
          <p>
            <strong>Department:</strong> {department}
          </p>
          <p>
            <strong>Skills:</strong> {skills}
          </p>
          <button onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      ) : (
        <form className="card" onSubmit={handleSave}>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />

          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>University</label>
          <input
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
          />

          <label>Department</label>
          <input
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />

          <label>Skills (comma separated)</label>
          <input value={skills} onChange={(e) => setSkills(e.target.value)} />

          <div className="actions">
            <button type="submit">Save</button>
            <button
              type="button"
              className="secondary"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default UserProfile;
