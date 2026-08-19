import { useEffect, useState } from "react";
import CVUploadForm from "../../components/CVUploadForm";
import {
  createCV,
  deleteCV,
  getCVs,
} from "../../services/cvService";

const SERVER_URL = "http://localhost:3000";

function CVList() {
  const [cvs, setCVs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    const loadCVs = async () => {
      try {
        const data = await getCVs();

        if (isActive) {
          setCVs(data);
        }
      } catch (err) {
        if (isActive) {
          setError(err.response?.data?.message || "Failed to load CVs");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadCVs();

    return () => {
      isActive = false;
    };
  }, []);

  const handleCreateCV = async ({ title, skills, notes, file }) => {
    try {
      setSaving(true);
      setError("");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("skills", skills);
      formData.append("notes", notes);

      if (file) {
        formData.append("file", file);
      }

      const newCV = await createCV(formData);
      setCVs((prev) => [newCV, ...prev]);
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save CV");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCV = async (id) => {
    if (!window.confirm("Delete this CV?")) {
      return;
    }

    try {
      setError("");
      await deleteCV(id);
      setCVs((prev) => prev.filter((cv) => cv._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete CV");
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>CV Management</h1>
          <p className="muted">
            Upload and manage CV versions for internship applications
          </p>
        </div>

        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Upload CV"}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {showForm && (
        <CVUploadForm
          onSubmit={handleCreateCV}
          onCancel={() => setShowForm(false)}
          isSaving={saving}
        />
      )}

      {loading ? (
        <p className="muted">Loading CVs...</p>
      ) : cvs.length === 0 ? (
        <div className="card">
          <h3>No CVs yet</h3>
          <p className="muted">
            Upload your first CV to start calculating FitScores.
          </p>
        </div>
      ) : (
        <div>
          {cvs.map((cv) => (
            <div className="card" key={cv._id}>
              <div className="cv-card-header">
                <div>
                  <h3>{cv.title}</h3>
                  <p className="muted">
                    Uploaded{" "}
                    {new Date(cv.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="actions">
                  {cv.fileUrl && (
                    <a
                      className="btn secondary"
                      href={`${SERVER_URL}${cv.fileUrl}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View File
                    </a>
                  )}
                  <button
                    className="secondary"
                    onClick={() => handleDeleteCV(cv._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {cv.skills?.length > 0 && (
                <div className="tag-list">
                  {cv.skills.map((skill) => (
                    <span className="skill-tag" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {cv.notes && <p>{cv.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CVList;
