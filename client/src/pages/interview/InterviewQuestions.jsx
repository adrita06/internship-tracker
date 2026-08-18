import { useEffect, useState } from "react";
import {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getReadiness,
} from "../../services/interviewService";

const categories = ["HR", "Technical", "Behavioral"];
const statuses = ["Unattempted", "Practicing", "Mastered"];

const emptyForm = {
  category: "HR",
  question: "",
  answerNotes: "",
  status: "Unattempted",
};

function InterviewQuestions() {
  const [questions, setQuestions] = useState([]);
  const [readiness, setReadiness] = useState([]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const loadQuestions = async () => {
    const filters = {};

    if (activeCategory !== "All") {
      filters.category = activeCategory;
    }

    if (search) {
      filters.search = search;
    }

    const data = await getQuestions(filters);
    setQuestions(data);
  };

  const loadReadiness = async () => {
    const data = await getReadiness();
    setReadiness(data);
  };

  // Debounce the search box before it hits the backend
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    loadQuestions();
  }, [activeCategory, search]);

  useEffect(() => {
    loadReadiness();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setFormData(emptyForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.question.trim()) {
      alert("Question is required");
      return;
    }

    if (editingId) {
      await updateQuestion(editingId, formData);
    } else {
      await createQuestion(formData);
    }

    resetForm();
    await loadQuestions();
    await loadReadiness();
  };

  const handleEdit = (question) => {
    setEditingId(question._id);
    setFormData({
      category: question.category,
      question: question.question,
      answerNotes: question.answerNotes || "",
      status: question.status,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this question?")) {
      return;
    }

    await deleteQuestion(id);
    await loadQuestions();
    await loadReadiness();
  };

  const handleStatusChange = async (question, newStatus) => {
    await updateQuestion(question._id, {
      ...question,
      status: newStatus,
    });

    await loadQuestions();
    await loadReadiness();
  };

  return (
    <div className="interview-page">
      <div className="page-header">
        <div>
          <h1>Interview Preparation</h1>
          <p className="muted">
            Track and practice your interview questions
          </p>
        </div>
      </div>

      <h2>Readiness</h2>
      <div className="readiness-grid">
        {readiness.map((item) => (
          <div className="readiness-card" key={item.category}>
            <div className="readiness-card-header">
              <span>{item.category}</span>
              <span className="muted">
                {item.mastered}/{item.total} mastered
              </span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${item.percent}%` }}
              />
            </div>

            <span className="muted">{item.percent}%</span>
          </div>
        ))}
      </div>

      <h2>{editingId ? "Edit Question" : "Add Question"}</h2>
      <form onSubmit={handleSubmit} className="card">
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label>Question</label>
        <textarea
          name="question"
          value={formData.question}
          onChange={handleChange}
          rows="2"
          placeholder="e.g. Tell me about yourself"
        />

        <label>Answer Notes</label>
        <textarea
          name="answerNotes"
          value={formData.answerNotes}
          onChange={handleChange}
          rows="4"
          placeholder="Your notes / talking points"
        />

        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <div className="modal-actions">
          {editingId && (
            <button
              type="button"
              className="secondary"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}

          <button type="submit">
            {editingId ? "Save Changes" : "Add Question"}
          </button>
        </div>
      </form>

      <h2>Questions</h2>

      <div className="tabs">
        {["All", ...categories].map((category) => (
          <button
            key={category}
            className={
              activeCategory === category ? "" : "secondary"
            }
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Search questions..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <div className="question-list">
        {questions.map((question) => (
          <div className="card question-card" key={question._id}>
            <div className="question-card-header">
              <span className="badge">{question.category}</span>

              <select
                value={question.status}
                onChange={(e) =>
                  handleStatusChange(question, e.target.value)
                }
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <h3>{question.question}</h3>

            {question.answerNotes && (
              <p className="muted">{question.answerNotes}</p>
            )}

            <div className="actions">
              <button
                className="secondary"
                onClick={() => handleEdit(question)}
              >
                Edit
              </button>

              <button
                className="secondary"
                onClick={() => handleDelete(question._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {questions.length === 0 && (
          <p className="empty-column">No questions found</p>
        )}
      </div>
    </div>
  );
}

export default InterviewQuestions;
