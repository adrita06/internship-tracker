import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateMe } from "../../services/userService";

function UserProfile() {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    university: user?.university || "",
    department: user?.department || "",
    skills: user?.skills?.join(", ") || "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const startEditing = () => {
    setForm({
      name: user.name,
      university: user.university || "",
      department: user.department || "",
      skills: user.skills.join(", "),
    });
    setEditing(true);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      setError("");
      const saved = await updateMe({
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
      });
      updateUser(saved);
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (!user) return <p className={error ? "error-message" : "muted"}>{error || "Loading profile..."}</p>;

  return (
    <div>
      <h1>User Profile</h1>
      {error && <p className="error-message">{error}</p>}
      {!editing ? (
        <div className="card">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>University:</strong> {user.university}</p>
          <p><strong>Department:</strong> {user.department}</p>
          <p><strong>Skills:</strong> {user.skills.join(", ")}</p>
          <button onClick={startEditing}>Edit Profile</button>
        </div>
      ) : (
        <form className="card" onSubmit={handleSave}>
          {Object.entries(form).map(([field, value]) => (
            <label key={field}>
              {field[0].toUpperCase() + field.slice(1)}
              <input value={value} onChange={(e) => setForm({ ...form, [field]: e.target.value })} />
            </label>
          ))}
          <div className="actions">
            <button type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
            <button type="button" className="secondary" onClick={() => setEditing(false)} disabled={saving}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}
export default UserProfile;