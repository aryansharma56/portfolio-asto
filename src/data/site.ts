// ─────────────────────────────────────────────────────────────
// Single source of truth for your personal data.
// Edit this file to update the site — no HTML digging required.
// ─────────────────────────────────────────────────────────────

export const person = {
  name: 'Aryan Sharma',
  title: 'Software Engineer',
  tagline:
    'Backend engineer building fast, reliable distributed systems — and the occasional RAG pipeline.',
  location: 'Mumbai, India',
  email: 'aryansharma5669@gmail.com',
  // Update these with your real profile URLs
  github: 'https://github.com/',
  leetcode: 'https://leetcode.com/',
  linkedin: '',
  resume: '/resume.pdf',
};

export const about = [
  `I'm a software engineer focused on backend systems, distributed architecture, and
   performance. I like taking features from idea to production — profiling the slow
   paths, cutting the costs, and keeping deploys boring.`,
  `Currently at Play Games24x7 (My11Circle), where I shipped the Prediction Contest
   feature end-to-end and spend my time making financial and fantasy-contest flows
   faster and cheaper. Previously at Infosys building event-driven microservices.`,
];

export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  { label: 'Languages', items: ['Java', 'JavaScript', 'TypeScript'] },
  { label: 'Frontend', items: ['React', 'Tailwind CSS'] },
  { label: 'Backend', items: ['Spring Boot', 'Node.js', 'REST APIs'] },
  { label: 'Databases', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'pgvector'] },
  { label: 'Distributed Systems', items: ['Kafka', 'Apache Camel'] },
  { label: 'Infra & Tools', items: ['Git', 'AWS EC2', 'AWS Lambda', 'Redis', 'JGit'] },
  {
    label: 'Concepts',
    items: [
      'Microservices',
      'API Design',
      'Event-driven Architecture',
      'Caching Strategies',
      'System Design',
      'RAG',
      'LLM Integration',
    ],
  },
];

export type Job = {
  role: string;
  company: string;
  period: string;
  highlights: string[];
};

export const experience: Job[] = [
  {
    role: 'Software Engineer',
    company: 'Play Games24x7 (My11Circle)',
    period: 'Apr 2026 – Present',
    highlights: [
      'Developed and launched the Prediction Contest feature end-to-end, contributing to a 10% increase in revenue within the first quarter of release.',
      'Reduced API latency by 50% by profiling Fantasy Contest flows and optimizing queries to remove bottlenecks.',
      'Refactored core financial workflows, simplifying service architecture to cut infrastructure and processing costs by 50% while improving reliability.',
      'Introduced Redis and local in-memory caching for prediction contest flows, cutting average response times by 40%.',
      'Partnered with product and QA to define APIs, write technical specs, and ship zero-downtime deployments in a fast release cycle.',
      'Used AI-assisted development tools (Cursor, Claude Code) to accelerate feature development and bug fixes.',
    ],
  },
  {
    role: 'Specialist Programmer',
    company: 'Infosys',
    period: 'Aug 2024 – Mar 2026',
    highlights: [
      'Built scalable backend microservices in Spring Boot with REST APIs tuned for low-latency integrations within the TDS 2.0 tax processing system.',
      'Implemented Kafka-based event-driven communication between services, improving fault tolerance and enabling reliable asynchronous processing at scale.',
      'Developed routing and transformation pipelines with Apache Camel across 5+ heterogeneous systems, standardizing inter-service communication.',
      'Optimized database access with JPA/Hibernate — lazy loading, batch fetching, native query tuning — reducing average query time by ~30%.',
      'Achieved 85%+ test coverage with JUnit and Mockito, reducing regression bugs in production.',
    ],
  },
];

export type Project = {
  name: string;
  stack: string[];
  year: string;
  description: string[];
  link?: string;
};

export const projects: Project[] = [
  {
    name: 'Git Archaeologist',
    stack: ['Java', 'Spring Boot', 'JGit', 'PostgreSQL', 'pgvector', 'OpenAI API', 'Gemini 2.5 Flash'],
    year: '2026',
    description: [
      'A Retrieval-Augmented Generation (RAG) system in Spring Boot that answers natural-language questions about a git repository’s commit history, grounded with real commit citations.',
      'Extracts commit history via JGit into PostgreSQL, filters low-signal commits, generates OpenAI embeddings with pgvector similarity search, and synthesizes cited answers using Gemini 2.5 Flash.',
    ],
  },
  {
    name: 'HTTP Server from Scratch',
    stack: ['Java', 'TCP Sockets'],
    year: '2024',
    description: [
      'An HTTP server built from raw TCP primitives — handling GET/POST requests, serving static files, and managing multiple concurrent connections via multithreading.',
    ],
  },
];

export type Education = { degree: string; school: string; detail: string; period: string };

export const education: Education[] = [
  {
    degree: 'B.E. Computer Engineering',
    school: 'Thapar University',
    detail: 'CGPA: 8.43 · Elective: Data Science',
    period: '2020 – 2024',
  },
  {
    degree: 'Class XII — Non-Medical',
    school: 'Kendriya Vidyalaya, Udhampur',
    detail: '91%',
    period: '2019 – 2020',
  },
];

export const achievements: string[] = [
  'AWS Certified Cloud Practitioner',
  'Knight rating on LeetCode (Top 5% globally)',
];
