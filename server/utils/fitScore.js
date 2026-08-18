const COMMON_SKILLS = [
  "react",
  "node.js",
  "node",
  "express",
  "mongodb",
  "mongo",
  "sql",
  "mysql",
  "postgresql",
  "python",
  "java",
  "javascript",
  "typescript",
  "html",
  "css",
  "git",
  "github",
  "rest api",
  "api",
  "docker",
  "aws",
  "firebase",
  "redux",
  "tailwind",
  "bootstrap",
  "figma",
  "problem solving",
  "data structures",
  "algorithms",
];

const normalize = (value = "") =>
  value
    .toLowerCase()
    .replace(/[^\w\s.+#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const calculateFitScore = (cvSkills = [], jobDescription = "") => {
  const normalizedJobDescription = normalize(jobDescription);
  const normalizedCVSkills = cvSkills.map(normalize);

  const required = COMMON_SKILLS.filter((skill) =>
    normalizedJobDescription.includes(skill)
  );

  const matched = required.filter((skill) =>
    normalizedCVSkills.some(
      (cvSkill) => cvSkill === skill || cvSkill.includes(skill)
    )
  );

  const missing = required.filter((skill) => !matched.includes(skill));
  const score =
    required.length === 0
      ? 0
      : Math.round((matched.length / required.length) * 100);

  return {
    score,
    matched,
    missing,
    required,
  };
};
