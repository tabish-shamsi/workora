import Job from "@/types/Job";

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechNova",
    location: "Remote",
    type: "Full-time",
    status: "open",
    salary: "$60k - $80k",
    lastDate: "2025-01-31",
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    description: `
We are looking for a Frontend Developer to build modern, responsive web interfaces.

Responsibilities:
- Develop user-facing features using React and Next.js
- Translate designs into high-quality code
- Optimize applications for performance and accessibility
- Collaborate with designers and backend engineers

Requirements:
- 2+ years experience with React
- Strong understanding of HTML, CSS, and JavaScript
- Experience with Tailwind CSS or similar
- Familiarity with Git and REST APIs

Benefits:
- Fully remote
- Flexible working hours
- Learning budget
- Competitive salary
`,
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: "CloudCore",
    location: "Karachi, Pakistan",
    type: "Full-time",
    status: "open",
    salary: "$70k - $90k",
    lastDate: "2025-02-05",
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    description: `
CloudCore is hiring a Backend Engineer to build scalable backend services.

Responsibilities:
- Design and implement RESTful APIs
- Work with databases (MongoDB / PostgreSQL)
- Write clean, maintainable code
- Ensure security and performance best practices

Requirements:
- Strong knowledge of Node.js
- Experience with Express or Fastify
- Database design fundamentals
- Understanding of authentication & authorization

Benefits:
- On-site + hybrid options
- Health insurance
- Annual performance bonus
`,
  },
  {
    id: "3",
    title: "UI/UX Designer",
    company: "DesignHub",
    location: "Remote",
    type: "Contract",
    status: "filled",
    salary: "$40k - $55k",
    lastDate: "2025-01-15",
    createdAt: new Date(Date.now() - 12 * 86400000).toISOString(),
    description: `
We are looking for a UI/UX Designer to improve user experience across products.

Responsibilities:
- Create wireframes and high-fidelity designs
- Conduct user research and usability testing
- Collaborate with developers to ensure design feasibility

Requirements:
- Experience with Figma or Sketch
- Strong portfolio
- Understanding of UX principles

Benefits:
- Remote contract
- Flexible deadlines
`,
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "InfraWorks",
    location: "Islamabad, Pakistan",
    type: "Full-time",
    status: "open",
    salary: "$80k - $100k",
    lastDate: "2025-02-10",
    createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
    description: `
InfraWorks is seeking a DevOps Engineer to manage infrastructure and deployments.

Responsibilities:
- Maintain CI/CD pipelines
- Manage cloud infrastructure (AWS)
- Monitor system performance and uptime

Requirements:
- Experience with Docker & Kubernetes
- Knowledge of AWS services
- Linux administration skills

Benefits:
- Hybrid work
- Paid certifications
- Competitive salary
`,
  },
  {
    id: "5",
    title: "Junior Web Developer",
    company: "StartupX",
    location: "Lahore, Pakistan",
    type: "Internship",
    status: "expired",
    salary: "$800/month",
    lastDate: "2024-12-15",
    createdAt: new Date(Date.now() - 45 * 86400000).toISOString(),
    description: `
This internship is ideal for beginners looking to gain real-world experience.

Responsibilities:
- Assist senior developers
- Build small frontend features
- Fix bugs and improve UI

Requirements:
- Basic knowledge of HTML, CSS, JavaScript
- Willingness to learn
- Git basics

Benefits:
- Mentorship
- Certificate of completion
`,
  },
  {
    id: "6",
    title: "Product Manager",
    company: "Buildify",
    location: "Remote",
    type: "Full-time",
    status: "open",
    salary: "$90k - $110k",
    lastDate: "2025-02-20",
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    description: `
Buildify is looking for a Product Manager to lead product strategy.

Responsibilities:
- Define product roadmap
- Collaborate with engineering & design
- Gather and prioritize requirements

Requirements:
- Experience managing digital products
- Strong communication skills
- Agile/Scrum knowledge

Benefits:
- Fully remote
- Equity options
- Paid time off
`,
  },
];
