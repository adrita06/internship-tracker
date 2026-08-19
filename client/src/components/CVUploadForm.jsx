import { useState } from "react";

function CVUploadForm({ onSubmit, onCancel, isSaving }) {
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("CV title is required");
      return;
    }

    if (!skills.trim()) {
      alert("Skills are required for FitScore calculation");
      return;
    }

    onSubmit({
      title,
      skills,
      notes,
      file,
    });
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <label>CV Title</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. Backend Internship CV"
      />

      <label>Skills (comma separated)</label>
      <input
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        placeholder="e.g. React, Node.js, MongoDB"
      />

      <label>Notes</label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows="3"
        placeholder="Short notes about this CV version"
      />

      <label>Upload File</label>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <div className="actions">
        <button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save CV"}
        </button>
        <button
          type="button"
          className="secondary"
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CVUploadForm;
