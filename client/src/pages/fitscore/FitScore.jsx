import { useEffect, useState } from "react";
import FitScoreResult from "../../components/FitScoreResult";
import { getCVs } from "../../services/cvService";
import { calculateFitScore } from "../../services/fitScoreService";

const GENERIC_JOB_DESCRIPTION = `Software Engineering Intern

We are looking for a Software Engineering Intern to join our product team and help build web applications used by students and recruiters.

Responsibilities
- Build and maintain user-facing features with JavaScript, TypeScript, React, HTML, and CSS
- Develop backend APIs with Node.js, Express, and REST API design
- Work with MongoDB and SQL databases to store and query application data
- Use Git and GitHub for version control, code reviews, and collaboration
- Apply problem solving, data structures, and algorithms when implementing features
- Collaborate with designers using Figma and style components with Tailwind or Bootstrap

Requirements
- Currently pursuing a degree in Computer Science or a related field
- Familiarity with JavaScript and React
- Basic understanding of Node.js, Express, and REST APIs
- Experience with Git

Nice to have
- TypeScript, Redux, Python, Docker, AWS, or Firebase experience
`;

function FitScore() {
  const [cvs, setCVs] = useState([]);
  const [cvId, setCVId] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingCVs, setLoadingCVs] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    const loadCVs = async () => {
      try {
        const data = await getCVs();

        if (!isActive) {
          return;
        }

        setCVs(data);

        if (data.length > 0) {
          setCVId(data[0]._id);
        }
      } catch (err) {
        if (isActive) {
          setError(err.response?.data?.message || "Failed to load CVs");
        }
      } finally {
        if (isActive) {
          setLoadingCVs(false);
        }
      }
    };

    loadCVs();

    return () => {
      isActive = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cvId) {
      alert("Select a CV first");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Job description is required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await calculateFitScore({
        cvId,
        jobDescription,
      });
      setResult(data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to calculate FitScore"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>FitScore</h1>
          <p className="muted">
            Compare a saved CV against an internship job description
          </p>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="fitscore-layout">
        <form className="card" onSubmit={handleSubmit}>
          <label>Select CV</label>
          <select
            value={cvId}
            onChange={(e) => setCVId(e.target.value)}
            disabled={loadingCVs || cvs.length === 0}
          >
            {cvs.map((cv) => (
              <option key={cv._id} value={cv._id}>
                {cv.title}
              </option>
            ))}
          </select>

          {loadingCVs && <p className="muted">Loading CVs...</p>}

          {!loadingCVs && cvs.length === 0 && (
            <p className="muted">
              Upload a CV first from the CV Management page.
            </p>
          )}

          <div className="form-label-row">
            <label htmlFor="job-description">Job Description</label>
            <button
              type="button"
              className="secondary"
              onClick={() => setJobDescription(GENERIC_JOB_DESCRIPTION)}
            >
              Use sample
            </button>
          </div>
          <textarea
            id="job-description"
            rows="10"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the internship job description here..."
          />

          <button
            type="submit"
            disabled={loading || loadingCVs || cvs.length === 0}
          >
            {loading ? "Calculating..." : "Calculate FitScore"}
          </button>
        </form>

        <FitScoreResult result={result} />
      </div>
    </div>
  );
}

export default FitScore;
