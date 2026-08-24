const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Job = require('../models/Job');
const connectDB = require('../config/db');

dotenv.config({ path: path.join(__dirname, '../.env') });

const SAMPLE_JOBS = [
  {
    title: 'Senior Frontend Engineer (React & TypeScript)',
    company: 'Apex Digital Solutions',
    location: 'Remote',
    experienceLevel: 'Senior Level',
    jobType: 'Full-time',
    salaryRange: '$120,000 - $155,000',
    tags: ['React', 'TypeScript', 'Tailwind', 'Redux', 'Vite', 'GraphQL', 'Jest', 'REST API'],
    description: `We are searching for a passionate Senior Frontend Engineer to build high-performance, accessible, and responsive user interfaces.
Key Responsibilities:
- Design and architect complex web application modules using React.js, TypeScript, and modern CSS frameworks (Tailwind CSS).
- Collaborate with UI/UX designers to translate Figma mockups into reusable component libraries.
- Optimize application performance, load times, and state management strategies.
- Write robust unit and integration tests using Jest and React Testing Library.
Requirements:
- 4+ years of professional experience with React.js, modern JavaScript (ES6+), and TypeScript.
- Strong proficiency in responsive design, CSS flexbox/grid, and performance profiling tools.
- Experience consuming RESTful APIs and GraphQL endpoints.
- Bachelor's degree in Computer Science, Software Engineering, or equivalent experience.`
  },
  {
    title: 'Full Stack Web Developer (Node.js & React)',
    company: 'Nexus Innovations',
    location: 'New York, NY (Hybrid)',
    experienceLevel: 'Mid Level',
    jobType: 'Full-time',
    salaryRange: '$95,000 - $125,000',
    tags: ['Node.js', 'Express', 'React', 'MongoDB', 'JavaScript', 'REST API', 'Git', 'Docker'],
    description: `Join our dynamic engineering team building scalable SaaS products for enterprise clients.
Key Responsibilities:
- Build end-to-end features using Node.js, Express.js backend services and React frontend UI.
- Design database schemas and optimize MongoDB queries for performance and concurrency.
- Implement secure authentication, authorization, and API gateways.
- Participate in code reviews, automated CI/CD deployment pipelines, and agile sprints.
Requirements:
- 2-4 years of experience working with the MERN stack (MongoDB, Express, React, Node.js).
- Strong understanding of asynchronous JavaScript, promises, and RESTful API architecture.
- Solid experience with Git version control and modern containerization tools like Docker.`
  },
  {
    title: 'Backend Engineer (Node.js & Microservices)',
    company: 'CloudScale Technologies',
    location: 'San Francisco, CA (Remote)',
    experienceLevel: 'Mid Level',
    jobType: 'Full-time',
    salaryRange: '$110,000 - $140,000',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Microservices', 'Redis', 'AWS', 'Docker'],
    description: `Seeking a skilled Backend Engineer to scale our distributed microservices infrastructure handling millions of daily requests.
Key Responsibilities:
- Develop robust, fault-tolerant REST APIs and gRPC services in Node.js and TypeScript.
- Manage SQL (PostgreSQL) and NoSQL (MongoDB) databases, write migrations, and optimize queries.
- Integrate Redis caching layers and asynchronous event buses using Kafka or RabbitMQ.
- Deploy services to AWS using Docker containers and Kubernetes orchestrations.
Requirements:
- 3+ years experience in Node.js backend development.
- Deep understanding of relational and document databases, indexing, and transactional isolation.
- Practical experience with AWS cloud services (EC2, S3, ECS, Lambda).`
  },
  {
    title: 'Data Analyst & Visualization Specialist',
    company: 'Insight Analytics Co.',
    location: 'Chicago, IL',
    experienceLevel: 'Entry Level',
    jobType: 'Full-time',
    salaryRange: '$75,000 - $90,000',
    tags: ['Python', 'SQL', 'Pandas', 'Tableau', 'Power BI', 'Excel', 'Statistics', 'Data Mining'],
    description: `Insight Analytics is hiring a Data Analyst to transform raw business metrics into actionable intelligence and interactive visual dashboards.
Key Responsibilities:
- Query large relational datasets using SQL to perform exploratory data analysis and trend discovery.
- Build automated data pipelines and clean datasets using Python (Pandas, NumPy).
- Create executive dashboards in Tableau and Power BI showcasing key KPI performance metrics.
Requirements:
- Bachelor's degree in Statistics, Data Science, Economics, Mathematics, or Computer Science.
- Advanced proficiency in SQL queries (JOINs, Window functions, Aggregations).
- Hands-on experience with Python data manipulation libraries and data presentation tools.`
  },
  {
    title: 'AI/ML Software Engineer',
    company: 'Cortex AI Labs',
    location: 'Austin, TX (Hybrid)',
    experienceLevel: 'Senior Level',
    jobType: 'Full-time',
    salaryRange: '$140,000 - $180,000',
    tags: ['Python', 'PyTorch', 'TensorFlow', 'NLP', 'LLMs', 'Scikit-learn', 'Docker', 'FastAPI'],
    description: `Cortex AI Labs is breaking new ground in domain-specific natural language processing and LLM fine-tuning.
Key Responsibilities:
- Build and evaluate machine learning models for text classification, sentiment extraction, and tokenization.
- Fine-tune open-source Large Language Models (LLMs) and optimize inference latency using PyTorch and vLLM.
- Deploy scalable model inference APIs using FastAPI, Docker, and GPU cloud infrastructure.
Requirements:
- Master's or Ph.D. in AI, Machine Learning, Computer Science, or 4+ years of industry ML engineering experience.
- Strong Python programming skills and familiarity with PyTorch, Transformers (Hugging Face), and NumPy.
- Experience with model evaluation frameworks, vector databases (Pinecone, ChromaDB), and RAG pipelines.`
  },
  {
    title: 'Junior Web Developer (React Focus)',
    company: 'BrightByte Studio',
    location: 'Boston, MA',
    experienceLevel: 'Entry Level',
    jobType: 'Full-time',
    salaryRange: '$65,000 - $80,000',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'React', 'Git', 'Tailwind', 'REST API'],
    description: `Perfect role for fresh graduates or junior developers seeking hands-on industry experience building modern web applications.
Key Responsibilities:
- Implement responsive user interfaces using HTML5, CSS3, JavaScript, and React.js.
- Work closely with senior developers to fix UI bugs, add interactive components, and write clean code.
- Participate in daily standups, code reviews, and sprint planning meetings.
Requirements:
- Foundational knowledge of web development (HTML, CSS, JavaScript ES6+).
- Familiarity with React concepts (Hooks, Component state, JSX) and Git version control.
- Enthusiastic learner with strong problem-solving skills and attention to detail.`
  },
  {
    title: 'UI/UX Product Designer',
    company: 'Vivid Design House',
    location: 'Remote',
    experienceLevel: 'Mid Level',
    jobType: 'Full-time',
    salaryRange: '$90,000 - $115,000',
    tags: ['Figma', 'UI Design', 'UX Research', 'Wireframing', 'Prototyping', 'Design Systems', 'User Testing'],
    description: `We need a creative UI/UX Designer to craft seamless, beautiful digital experiences across web and mobile platforms.
Key Responsibilities:
- Conduct user research, persona creation, user journey mapping, and usability testing.
- Design high-fidelity wireframes, interactive prototypes, and design system components in Figma.
- Collaborate with frontend engineers to ensure design fidelity and micro-animation alignment.
Requirements:
- Portfolio demonstrating clean, intuitive UI design and clear user problem-solving processes.
- 3+ years of experience with Figma, design system maintenance, and responsive layout design.`
  },
  {
    title: 'DevOps & Cloud Infrastructure Engineer',
    company: 'Skyline Cloud Systems',
    location: 'Seattle, WA (Remote)',
    experienceLevel: 'Senior Level',
    jobType: 'Full-time',
    salaryRange: '$130,000 - $165,000',
    tags: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'Linux', 'Python', 'Prometheus'],
    description: `Seeking an experienced DevOps Engineer to design automated cloud infrastructure, CI/CD pipelines, and monitoring systems.
Key Responsibilities:
- Provision infrastructure as code (IaC) using Terraform across AWS cloud environments.
- Maintain and scale production Kubernetes clusters, service meshes, and Docker container registries.
- Build automated deployment pipelines using GitHub Actions, GitLab CI, or Jenkins.
Requirements:
- 4+ years in DevOps/SRE roles supporting high-availability production architectures.
- Expertise in AWS services, Terraform, Docker, Kubernetes, and Linux server administration.`
  },
  {
    title: 'Product Manager (SaaS & B2B)',
    company: 'Velocity Software',
    location: 'Denver, CO (Hybrid)',
    experienceLevel: 'Mid Level',
    jobType: 'Full-time',
    salaryRange: '$105,000 - $135,000',
    tags: ['Product Management', 'Agile', 'Jira', 'User Stories', 'Roadmapping', 'Analytics', 'B2B SaaS'],
    description: `Velocity Software is looking for a proactive Product Manager to own product features from concept through launch.
Key Responsibilities:
- Define product strategy, write detailed PRDs/user stories, and prioritize sprint backlogs in Jira.
- Interface with customers, customer success teams, and engineering leads to align product roadmap.
- Analyze feature adoption metrics and optimize funnel conversion rates.
Requirements:
- 3+ years in product management for software or B2B SaaS applications.
- Strong communication, data analysis, and Agile/Scrum cross-functional team leadership.`
  },
  {
    title: 'Cybersecurity Analyst & SOC Specialist',
    company: 'Fortress Cyber Defense',
    location: 'Washington, DC',
    experienceLevel: 'Mid Level',
    jobType: 'Full-time',
    salaryRange: '$95,000 - $120,000',
    tags: ['Cybersecurity', 'SIEM', 'Network Security', 'Incident Response', 'Vulnerability Scanning', 'Linux', 'Python'],
    description: `Fortress Cyber Defense seeks a dedicated Security Analyst to monitor network traffic, investigate threats, and defend enterprise infrastructure.
Key Responsibilities:
- Monitor SIEM dashboards, investigate security alerts, and execute incident response procedures.
- Conduct regular vulnerability scans, penetration testing, and security posture audits.
Requirements:
- 2-4 years experience in SOC analyst or cybersecurity engineering roles.
- Industry certifications such as CompTIA Security+, CEH, or CISSP preferred.`
  }
];

async function seedJobs(shouldDisconnectAndExit = false) {
  try {
    await connectDB();
    await Job.deleteMany({});
    console.log('[Seed] Cleared existing Job documents.');

    const created = await Job.insertMany(SAMPLE_JOBS);
    console.log(`[Seed] Successfully seeded ${created.length} sample job postings into MongoDB!`);

    if (shouldDisconnectAndExit) {
      await mongoose.disconnect();
      process.exit(0);
    }
  } catch (error) {
    console.error('[Seed] Error seeding database:', error);
    if (shouldDisconnectAndExit) {
      process.exit(1);
    }
  }
}

module.exports = seedJobs;

// If executed directly from terminal (e.g. node scripts/seedJobs.js)
if (require.main === module) {
  seedJobs(true);
}

