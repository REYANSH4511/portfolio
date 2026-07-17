export const profile = {
  name: "Reyansh Joshi",
  title: "Senior Full Stack Engineer — Backend & AI Platform Engineering",
  location: "Gurugram, India",
  email: "reyanshjoshi4511@gmail.com",
  phone: "+91 8696164511",
  linkedin: "https://linkedin.com/in/reyansh-joshi",
  github: "https://github.com/REYANSH4511",
  website: "https://reyansh.dev",
  resumeUrl: "/resume",
  summary:
    "Senior Full Stack Engineer with 4+ years of experience designing scalable cloud-native applications, distributed backend systems, and AI-powered enterprise platforms. Proven expertise in Node.js, React, Python, AWS, Microservices, FastAPI, and modern DevOps practices. Experienced in leading engineering teams, architecting high-performance systems, building production AI applications with LangChain and OpenAI APIs, and delivering secure, scalable software for enterprise customers.",
};

export const achievements = [
  {
    label: "Scalability improvement",
    value: "35%",
    detail: "through core architecture redesign",
  },
  {
    label: "Deployment time cut",
    value: "40%",
    detail: "via AWS / Docker / Nginx CI/CD",
  },
  {
    label: "DB latency reduced",
    value: "45%",
    detail: "through MongoDB & PostgreSQL optimization",
  },
  {
    label: "Manual effort saved",
    value: "60%",
    detail: "with LangChain / OpenAI automation",
  },
  {
    label: "Engineers mentored",
    value: "4",
    detail: "in sprint planning & architecture",
  },
  {
    label: "Concurrent users served",
    value: "5,000+",
    detail: "with zero downtime at peak",
  },
];

export const experience = [
  {
    id: "delveinsight",
    role: "Team Lead",
    company: "DelveInsight Business Research LLP",
    url: "https://www.delveinsight.com/",
    location: "Gurugram, India",
    start: "Mar 2025",
    end: "Present",
    bullets: [
      "Architected and delivered enterprise-grade MERN stack (MongoDB, Express.js, React.js, Node.js) applications, boosting scalability and maintainability by 35% through distributed system redesign.",
      "Led technical design decisions and automated CI/CD workflows using AWS, Docker, and Nginx, reducing deployment time by 40%.",
      "Managed and mentored a team of 4 engineers; led sprint planning, architecture and code reviews, and DevOps implementation in an Agile/Scrum environment.",
      "Optimized MongoDB and PostgreSQL queries, reducing database latency by 45% and improving overall system performance.",
      "Designed enterprise AI assistants and automated data extraction pipelines using LangChain and OpenAI APIs with web scraping workflows, cutting data analysis time by 60%.",
      "Owned production monitoring and incident response, ensuring 99.9% uptime through proactive AWS CloudWatch monitoring and fault-tolerant DevOps practices.",
    ],
  },
  {
    id: "spanidea",
    role: "Senior Software Engineer",
    company: "Spanidea Systems",
    url: "https://spanidea.com/",
    location: "Jodhpur, India",
    start: "Sep 2022",
    end: "Mar 2025",
    bullets: [
      "Designed and developed Node.js and Express.js microservices and scalable RESTful APIs for large-scale enterprise applications serving thousands of concurrent users.",
      "Integrated and secured payment gateways (Razorpay, CCAvenue) with audit-compliant transaction logging, ensuring PCI-DSS alignment.",
      "Reduced server response time by 30% through performance tuning, Redis caching, and load optimization strategies.",
      "Collaborated with product and business stakeholders to deliver responsive, data-driven UIs using React.js and digital system integration.",
      "Built real-time chat, live class, and CRM features for EdTech platforms (Dhister, IFAS, Lurnigo) using WebSockets and Node.js, supporting high-availability, fault-tolerant delivery.",
    ],
  },
];

export const projects = [
  {
    id: "delveinsight-com",
    name: "DelveInsight",
    url: "https://www.delveinsight.com/",
    role: "Team Lead",
    problem:
      "DelveInsight.com needed performance optimization, enterprise-grade security, zero-downtime delivery, and high-throughput search indexing at scale.",
    solution:
      "Optimized the Next.js architecture with ISR and the App Router for faster loads and better SEO. Hardened security with CAPTCHA, AWS WAF, private VPC, CDN, AWS Secrets Manager, and AWS log analysis. Replaced single-record Algolia puts with a bulk upload API.",
    result:
      "Maintained zero downtime while improving performance and security; cut Algolia indexing from ~2 minutes per single put to under 3 seconds for 1,000+ records.",
    detail:
      "Migrated and optimized the Next.js site to leverage ISR and the App Router, reducing build and page-load overhead. Implemented layered security controls including WAF rules, VPC isolation, edge CDN caching, and centralized secrets management. The Algolia bulk upload feature collapsed thousands of single-record writes into one operation, eliminating per-record latency and reducing indexing costs.",
    tags: ["Next.js", "ISR", "App Router", "AWS", "WAF", "VPC", "CDN", "Algolia", "Security"],
  },
  {
    id: "delveinsight-market-ai",
    name: "DelveInsight Market AI Platform",
    url: "https://market.delveinsight.ai/",
    role: "Team Lead",
    problem:
      "DelveInsight needed a RAG-powered chat system that could answer questions from uploaded PDF reports and manage users, admins, and chat sessions at scale.",
    solution:
      "Built a React.js frontend and a Node.js/PostgreSQL backend for user management, admin controls, chat sessions, and PDF report uploads. Implemented the RAG engine in Python with FastAPI, LangChain, and OpenAI to serve contextual answers from report data.",
    result:
      "Reduced manual research effort by 60% and maintained 99.9% platform uptime.",
    detail:
      "Split the architecture by responsibility: Node.js handled users, roles, sessions, and document uploads, while a Python/FastAPI RAG service managed embeddings, retrieval, and LLM-based responses over uploaded reports. Designed prompt chains and ingestion pipelines so analysts could ask natural-language questions and get answers grounded in report data.",
    tags: ["React.js", "Node.js", "PostgreSQL", "Python", "FastAPI", "LangChain", "OpenAI", "RAG"],
  },
  {
    id: "agastya-heritage",
    name: "Agastya Heritage",
    role: "Backend Developer",
    problem:
      "Patient intake and hotel workflows were fragmented across modules with inconsistent data.",
    solution:
      "Implemented Node.js microservices across 3 integrated modules with transaction-safe database operations.",
    result:
      "Reduced inter-service API response time by 35% and improved data consistency.",
    tags: ["Node.js", "Microservices", "PostgreSQL", "Transactions"],
  },
  {
    id: "the-medical-league",
    name: "The Medical League (iTDL)",
    url: "https://itdl.app/sign-in",
    role: "Full Stack Developer",
    problem:
      "UK healthcare revalidation platform needed a complete React frontend rebuild, but the client had no original Angular source code — only production build files and a live backend.",
    solution:
      "Reverse-engineered the UI and API behavior from production artifacts and GraphQL endpoints, then rebuilt the frontend in React with functional components and full feature parity. Fixed live-site bugs and optimized complex MongoDB aggregation pipelines.",
    result:
      "Delivered a working React frontend that lets doctors, admins, superadmins, and ROs manage revalidation workflows seamlessly.",
    detail:
      "With no frontend source available, I analyzed backend GraphQL schemas, existing API calls, and the deployed Angular app to recreate every screen and workflow in React. Implemented role-based modules for admin, superadmin, and RO users, resolved critical production bugs, and tuned extensive MongoDB aggregations powering doctor revalidation data.",
    tags: ["React", "GraphQL", "Node.js", "MongoDB", "JavaScript", "Healthcare"],
  },
  {
    id: "melodi-log-analysis",
    name: "Melodi Log Analysis Tool",
    role: "Solo Developer",
    problem:
      "Distributed service debugging relied on slow manual log investigation.",
    solution:
      "Engineered an intelligent log parsing and analysis engine using Python and FastAPI to automate root-cause detection.",
    result:
      "Reduced average debug time by 40% and saved 10+ engineering hours per week.",
    tags: ["Python", "FastAPI", "Log Analysis", "Automation"],
  },
  {
    id: "meeting-room-booking",
    name: "Meeting Room Booking App",
    role: "Full Stack Developer",
    problem:
      "Conference rooms were double-booked and scheduling requests took too long.",
    solution:
      "Designed a full-stack scheduling platform with conflict-resolution logic on the MERN stack.",
    result:
      "Cut room scheduling time from 15 minutes to under 2 minutes per request.",
    tags: ["MERN", "Scheduling", "Conflict Resolution"],
  },
  {
    id: "sensor-coverage",
    name: "Sensor Coverage Tool",
    role: "Full Stack Developer",
    problem:
      "Field teams needed a way to check sensor coverage areas and visualize them on a web portal instead of relying on manual verification.",
    solution:
      "Built a React web portal with JavaScript and Pyodide for in-browser sensor coverage analysis and visualization, backed by a Django/Python API with Celery for background processing.",
    result:
      "Enabled real-time sensor coverage checks and interactive visualization on the web portal, reducing manual verification effort.",
    tags: ["React", "JavaScript", "Django", "Python", "Celery", "Pyodide", "IoT"],
  },
  {
    id: "ifas-edtech",
    name: "IFAS EdTech Platform",
    url: "https://ifasonline.com/",
    role: "Full Stack Lead",
    problem:
      "IFAS needed a complete EdTech platform covering students, teachers, CRM, admin, test systems, live classes, and recorded lectures under one system.",
    solution:
      "Built a full EdTech ecosystem with student and teacher portals, CRM, admin panel, test and assessment systems, live classes, recorded lectures, real-time chat, and Razorpay payment integration.",
    result:
      "Handled 5,000+ concurrent users with zero downtime during peak live sessions.",
    tags: ["Node.js", "Express.js", "WebSockets", "MongoDB", "Razorpay", "EdTech"],
  },
  {
    id: "employee-onboarding",
    name: "Employee Onboarding System",
    role: "Lead Developer",
    problem:
      "Fragmented, manual onboarding process created delays and duplicated HR work.",
    solution:
      "Replaced it with an end-to-end MERN-based HR automation suite covering intake through completion.",
    result:
      "Streamlined onboarding for 200+ employees, improving process efficiency by 35% and cutting manual HR effort by 50%.",
    tags: ["MERN", "HR Automation", "REST APIs", "MongoDB"],
  },
];

export const skills = {
  languages: ["JavaScript", "TypeScript", "Python", "SQL", "Bash"],
  frontend: [
    "React.js",
    "Next.js",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Material-UI",
    "Ant Design",
  ],
  backend: [
    "Node.js",
    "Express.js",
    "FastAPI",
    "Django",
    "RESTful APIs",
    "GraphQL",
  ],
  databases: ["MongoDB", "PostgreSQL", "MySQL", "Prisma", "Sequelize", "Redis"],
  ai: [
    "LangChain",
    "OpenAI APIs",
    "LLMs",
    "Retrieval-Augmented Generation (RAG)",
    "Prompt Engineering",
    "AI Automation",
  ],
  cloud: [
    "AWS (EC2, S3, Lambda, RDS, CloudWatch)",
    "Docker",
    "Nginx",
    "Jenkins",
    "GitHub Actions",
    "CI/CD",
  ],
  messaging: [
    "Kafka",
    "RabbitMQ",
    "Web Scraping & Automation",
    "Payment Gateway Integration",
  ],
  testing: [
    "Jest",
    "Postman",
    "Swagger",
    "JWT",
    "OAuth2",
    "Unit Testing",
    "Code Review",
  ],
  tools: [
    "Git",
    "GitHub",
    "Jira",
    "ClickUp",
    "Confluence",
    "Agile/Scrum",
    "VS Code",
  ],
};

export const education = [
  {
    degree: "B.Tech – Mechanical Engineering",
    institution: "JECRC College, Jaipur, India",
    period: "2018 – 2022",
    note: "Successfully transitioned from Mechanical Engineering to Software Engineering through intensive self-learning and hands-on product development, progressing to Senior Full Stack Engineer level within 4 years.",
  },
];

export const certifications = [
  "Full Stack Development (Python) — Codeplanet Technologies",
  "Self-directed training: Node.js, React.js, MongoDB, Docker, DevOps, LangChain, OpenAI APIs",
];

export const languages = [
  { name: "English", level: "Professional" },
  { name: "Hindi", level: "Native" },
];
