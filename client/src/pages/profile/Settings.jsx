import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateMe } from "../../services/userService";

function Settings() {
  const { user, updateUser } = useAuth();
  const [settings, setSettings] = useState(user?.settings || { emailNotifications: true, reminderDays: 3 });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      setError("");
      setSaved(false);
      const updated = await updateMe({ settings });
      updateUser(updated);
      setSettings(updated.settings);
      setSaved(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (!user) return <p className={error ? "error-message" : "muted"}>{error || "Loading settings..."}</p>;

  return (
    <div>
      <h1>Settings</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="card" onSubmit={handleSave}>
        <label>
          <input type="checkbox" style={{ width: "auto", marginRight: "8px" }}
            checked={settings.emailNotifications}
            onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })} />
          Email me application reminders
        </label>
        <label>
          Remind me (days before interview)
          <input type="number" min="0" value={settings.reminderDays}
            onChange={(e) => setSettings({ ...settings, reminderDays: Number(e.target.value) })} />
        </label>
        <button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Settings"}</button>
        {saved && <p className="muted">Settings saved.</p>}
      </form>
    </div>
  );
}
export default Settings;