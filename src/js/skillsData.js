// Centralized Skills data; mirrors your original DATA object.

export const SKILLS_DATA = {
  Frontend: [
    { key: "aws", label: "AWS", file: "aws-icon.png" },
    { key: "react", label: "React", file: "react-icon.png" },
    { key: "vite", label: "Vite", file: "vite-icon.png" },
    { key: "html5", label: "HTML", file: "html5-icon.png" },
    { key: "css3", label: "CSS", file: "css3-icon.png" },
    { key: "javascript", label: "JavaScript", file: "javascript-icon.png" },
    { key: "typescript", label: "TypeScript (learning)" }, // no file yet
    { key: "vuejs", label: "Vue (learning)", file: "vue-icon.png" },
    {
      key: "responsive",
      label: "Responsive Layouts",
      file: "responsive-icon.png",
    },
  ],

  Backend: [
    { key: "java", label: "Java", file: "java-icon.png" },
    { key: "spring", label: "Spring Boot", file: "springboot-icon.png" },
    { key: "node", label: "Node.JS", file: "node-icon.png" },
    { key: "postgresql", label: "PostgreSQL", file: "sql-icon.png" },
    { key: "restful", label: "REST APIs", file: "resfulApi-icon.png" }, // spelling as provided
    { key: "jwt", label: "JWT", file: "jwt-icon.png" },
    { key: "aws", label: "AWS", file: "aws-icon.png" },
    {
      key: "junit",
      label: "Unit & Integration Testing (JUnit)",
      file: "junit-icon.png",
    },
  ],

  Tools: [
    { key: "aws", label: "AWS", file: "aws-icon.png" },
    { key: "git", label: "Git", file: "git-icon.png" },
    { key: "github", label: "GitHub", file: "github-icon.gif" },
    { key: "docker", label: "Docker", file: "docker-icon.png" },
    { key: "nodejs", label: "Node.js", file: "node-icon.png" },
    { key: "npm", label: "npm", file: "npm-icon.png" },
    { key: "postman", label: "Postman", file: "postman-icon.png" },
    { key: "curl", label: "cURL", file: "curl-icon.png" },
  ],

  Concepts: [
    { key: "concept-1", label: "API Integrations" },
    { key: "concept-2", label: "User Authentication & Authorization" },
    { key: "concept-3", label: "Token-based Auth (JWT, OAuth2/OIDC)" },
    { key: "concept-4", label: "DTO Mapping & Validation" },
    { key: "concept-5", label: "Cloud Deployment (AWS basics)" },
    { key: "concept-6", label: "Database Modeling & SQL" },
    { key: "concept-7", label: "Testing Strategy" },
    { key: "concept-8", label: "Clean Architecture Principles" },
  ],
};

export const SKILL_CATEGORIES = Object.keys(SKILLS_DATA);
