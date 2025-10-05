export const items = [
  {
    name: "VitaNova",
    url: "https://github.com/tom-halstead/vitanova",
    liveUrl: "https://vitanova-app.com",
    blurb:
      "Health & fitness goals tracker with secure auth and progress dashboards.",
    stack: ["java", "spring", "react", "postgresql", "aws"],
    details:
      "Full-stack wellness app where users set goals (habits, workouts, nutrition), log daily activity, and visualize progress over time. Backend is Spring Boot with JPA/Flyway on PostgreSQL; frontend is React. Authentication via OAuth2/OIDC (Amazon Cognito) with a JWT-protected API. Containerized and deployed on AWS App Runner from ECR, connected privately to RDS through a VPC connector + NAT; CI/CD via GitHub Actions.",
  },
  {
    name: "Expense Tracker CLI/API",
    url: "https://github.com/tom-halstead/expensetracker",
    blurb:
      "Java + Spring Boot REST service for expense categories, reports, and CSV import.",
    stack: ["java", "spring", "postgresql", "jwt"],
    details:
      "JWT-secured Spring Boot API for managing users, expenses, categories, budgets, and income. Implements layered architecture with repositories, validation, and reporting logic. Features include recurring expenses, monthly summaries, and CSV data import/export using PostgreSQL.",
  },
  {
    name: "Content Aggregator API",
    url: "https://github.com/tom-halstead/ContentAggregator",
    blurb: "Aggregates articles from external APIs with caching and filtering.",
    stack: ["nodejs", "javascript", "postgresql"],
    details:
      "Content aggregation service that fetches and filters news and Reddit posts from multiple APIs. Features external API integration, caching, deduplication, dynamic category filtering, user-customized sources, and relevance-based scoring with PostgreSQL storage.",
  },
  {
    name: "Portfolio Site",
    url: "https://github.com/Tom-Halstead/Tom-halstead.github.io",
    blurb: "Personal site with React + Vite and accessible UI patterns.",
    stack: ["react", "vite", "css3"],
    details:
      "Personal portfolio built with React and Vite, focusing on accessibility and performance. Includes dark/light theme support, no-scroll tabbed navigation, responsive layouts, and semantic ARIA patterns for fully keyboard-accessible design.",
  },
];
