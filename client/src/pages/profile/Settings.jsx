import { useEffect, useState } from "react";
import { getDemoUser, updateUser } from "../../services/userService";

function Settings() {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({ emailNotifications: true, reminderDays: 3 });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { getDemoUser().then((data) => { setUser(data); setSettings(data.settings || { emailNotifications: true, reminderDays: 3 }); }).catch((err) => setError(err.response?.data?.message || "Failed to load settings")); }, []);
  const handleSave = async (event) => { event.preventDefault(); try { const updated = await updateUser(user._id, { settings }); setUser(updated); setSettings(updated.settings); setSaved(true); } catch (err) { setError(err.response?.data?.message || "Failed to save settings"); } };
  if (!user) return <p className={error ? "error-message" : "muted"}>{error || "Loading settings..."}</p>;
  return <div><h1>Settings</h1>{error && <p className="error-message">{error}</p>}<form className="card" onSubmit={handleSave}><label><input type="checkbox" style={{ width: "auto", marginRight: "8px" }} checked={settings.emailNotifications} onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })} />Email me application reminders</label><label>Remind me (days before interview)<input type="number" min="0" value={settings.reminderDays} onChange={(e) => setSettings({ ...settings, reminderDays: Number(e.target.value) })} /></label><button type="submit">Save Settings</button>{saved && <p className="muted">Settings saved.</p>}</form></div>;
}
export default Settings;
