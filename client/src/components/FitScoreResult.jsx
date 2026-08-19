const getFitLabel = (score) => {
  if (score >= 75) {
    return "Strong fit";
  }

  if (score >= 45) {
    return "Moderate fit";
  }

  return "Low fit";
};

function FitScoreResult({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className="card fitscore-result">
      <p className="muted">FitScore Result</p>
      <div className="large-score">{result.score}%</div>
      <h3>{getFitLabel(result.score)}</h3>

      <p className="muted">
        Based on {result.required.length} recognized skill keyword
        {result.required.length === 1 ? "" : "s"} in the job description.
      </p>

      <h2>Matched Skills</h2>
      {result.matched.length > 0 ? (
        <div className="tag-list">
          {result.matched.map((skill) => (
            <span className="skill-tag" key={skill}>
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <p className="muted">No matching skills found.</p>
      )}

      <h2>Missing Skills</h2>
      {result.missing.length > 0 ? (
        <div className="tag-list">
          {result.missing.map((skill) => (
            <span className="skill-tag missing" key={skill}>
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <p className="muted">No missing skills found.</p>
      )}
    </div>
  );
}

export default FitScoreResult;
