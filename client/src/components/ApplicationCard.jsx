import { useNavigate } from "react-router-dom";

function ApplicationCard({ application, onEdit }) {
  const navigate = useNavigate();

  return (
    <div
      className="application-card"
      onClick={() => navigate(`/applications/${application.id}`)}
    >
      <div className="application-card-header">
        <div>
          <h3>{application.company}</h3>
          <p>{application.position}</p>
        </div>

        <span className="fit-score">
          {application.fitScore}%
        </span>
      </div>

      <div className="application-card-footer">
        <span>{application.applicationDate}</span>

        <button
          className="secondary"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(application);
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default ApplicationCard;