import { useEffect, useState } from "react";
import { getDemoUser, updateUser } from "../../services/userService";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", university: "", department: "", skills: "" });
  const [error, setError] = useState("");
  useEffect(() => { getDemoUser().then((data) => { setUser(data); setForm({ name: data.name, email: data.email, university: data.university || "", department: data.department || "", skills: data.skills.join(", ") }); }).catch((err) => setError(err.response?.data?.message || "Failed to load profile")); }, []);
  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const saved = await updateUser(user._id, { ...form, skills: form.skills.split(",").map((skill) => skill.trim()).filter(Boolean) });
      setUser(saved); setForm({ ...form, skills: saved.skills.join(", ") }); setEditing(false);
    } catch (err) { setError(err.response?.data?.message || "Failed to save profile"); }
  };
  if (!user) return <p className={error ? "error-message" : "muted"}>{error || "Loading profile..."}</p>;
  return <div><h1>User Profile</h1>{error && <p className="error-message">{error}</p>}{!editing ? <div className="card"><p><strong>Name:</strong> {user.name}</p><p><strong>Email:</strong> {user.email}</p><p><strong>University:</strong> {user.university}</p><p><strong>Department:</strong> {user.department}</p><p><strong>Skills:</strong> {user.skills.join(", ")}</p><button onClick={() => setEditing(true)}>Edit Profile</button></div> : <form className="card" onSubmit={handleSave}>{Object.entries(form).map(([field, value]) => <label key={field}>{field[0].toUpperCase() + field.slice(1)}<input value={value} onChange={(e) => setForm({ ...form, [field]: e.target.value })} /></label>)}<div className="actions"><button type="submit">Save</button><button type="button" className="secondary" onClick={() => setEditing(false)}>Cancel</button></div></form>}</div>;
}
export default UserProfile;
