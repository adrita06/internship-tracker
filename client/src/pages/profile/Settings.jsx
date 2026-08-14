import { useState } from "react";

function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [reminderDays, setReminderDays] = useState(3);
  const [saved, setSaved] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
  }

  return (
    <div>
      <h1>Settings</h1>

      <form className="card" onSubmit={handleSave}>
        <label>
          <input
            type="checkbox"
            style={{ width: "auto", marginRight: "8px" }}
            checked={emailNotifications}
            onChange={(e) => setEmailNotifications(e.target.checked)}
          />
          Email me application reminders
        </label>

        <label>Remind me (days before interview)</label>
        <input
          type="number"
          min="0"
          value={reminderDays}
          onChange={(e) => setReminderDays(e.target.value)}
        />

        <button type="submit">Save Settings</button>
        {saved && <p className="muted">Settings saved.</p>}
      </form>
    </div>
  );
}

export default Settings;
