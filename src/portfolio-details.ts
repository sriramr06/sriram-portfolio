export const personalDetails = {
  name: "Sriram R",
  title: "Full Stack Developer",
  location: "Palavakkam, Chennai",
  email: "sriramr.5624@gmail.com",
  mobile: "+91 6374752936",
  github: "https://github.com/sriramr06",
  linkedin: "https://linkedin.com/in/sriram-r-sriram",
aboutme: "I'm a Full Stack Developer with a growing interest in backend engineering. I enjoy turning ideas into working applications and exploring how systems manage data, maintain security, and handle increasing complexity. What drew me into programming was the idea of turning something I imagined into something that actually works. While I enjoy full-stack development, I'm particularly drawn to the backend—understanding how data flows through an application, how it's protected, and how systems evolve as complexity increases. I'm continuously exploring backend architecture, system design, and the engineering decisions that make applications reliable and maintainable. "
} as const;

export const skills = [
  {title: "Frontend", items: ["React", "TypeScript", "JavaScript",  "HTML",  "CSS", "Tailwind CSS", "shadcn/ui"]},
  {title: "Backend", items: ["Node.js", "Express.js", "REST APIs", "JWT Authentication & RBAC", "Zod"]},
  {title: "Data & State Management", items: ["Zustand", "TanStack Query"]},
  {title: "Database & Cloud", items: ["MongoDB", "Mongoose", "Schema Design", "Cloudinary",  "SQL"]},
  {title: "Testing & DevOps", items: ["Vitest", "Playwright", "GitHub Actions (CI/CD)"]},
  {title: "Languages & Tools", items: ["Python", "Git", "GitHub", "Postman", "Render", "Vercel"]},
] as const;

export const education = [
  {degree: "Master of Computer Application", institution: "Guru Nanak College", period: "2024 - 2026", cgpa: "9.1"},
  {degree: "Bachelor of Computer Application", institution: "Hindustan College of Arts & Science", period: "2021 - 2024", cgpa: "8.3"},
] as const;

export const certifications = [
  {title: "SQL", issuer: "Data Software Research Company (DSRC)"},
  {title: 'React 18', issuer: 'Code with Mosh' },
  {title: 'TypeScript', issuer: 'Code with Mosh' },
] as const;

// Images live in public/images/<slug>/.
export const projects = [
  {
    slug: "nexora",
    title: "Nexora",
    tagline: "Multi-tenant project management SaaS with role-based review workflows",
    description:
      "Nexora lets companies register an organization, invite their team and run projects on a Kanban board. " +
      "Every organization's data is isolated, each role sees only what it should, and tasks move through a " +
      "review workflow where managers approve or request changes. A platform Owner approves new organizations before they go live.",
    role: "Solo: requirements, design, backend, frontend, testing and deployment",
    period: "Nov 2026",
    status: "Live",
    featured: true,
    links: {
      live: "https://nexora-six-rouge.vercel.app",
      repo: "https://github.com/sriramr06/nexora",
      apiDocs: "https://nexora-six-rouge.vercel.app/api/docs",
    },
    demo: {
      note: "Log in as an admin of the sample company Acme Corp",
      email: "priya@acme.example",
      password: "Demo1234",
    },
    stack: {
      frontend: ["React 19", "TypeScript", "Vite", "TanStack Query", "Zustand", "React Router", "Tailwind CSS", "shadcn/ui"],
      backend: ["Node.js", "Express 5", "MongoDB", "Mongoose", "Zod", "JWT", "Gmail API"],
      testing: ["Vitest", "Supertest", "Playwright"],
      devops: ["npm workspaces monorepo", "GitHub Actions", "Vercel", "Render", "MongoDB Atlas"],
    },
    features: [
      "Organization sign-up with platform Owner approval, suspension and reactivation",
      "Email verification, invitations and password reset",
      "Four roles: Owner, Tenant Admin, Project Manager and Team Member",
      "Kanban board with filters, priorities, due dates, and blocked / on-hold flags",
      "Review workflow: submit, approve or request changes",
      "Comments, activity history and in-app notifications",
      "Light and dark theme; responsive down to 360 px phones",
    ],
    highlights: [
      "Tenant isolation enforced in one Mongoose plugin and checked by a test harness across 46 endpoints",
      "444 automated tests: 441 unit and integration tests plus 3 Playwright end-to-end journeys, run in CI on every pull request",
      "Validation shared between client and server through Zod schemas, which also generate OpenAPI docs for 74 API operations",
      "Notifications written in the same MongoDB transaction as the change, so they never go out of sync",
      "Keyset pagination; a 200-task board loads from the API in 17 ms",
      "Production deploys only after CI and the end-to-end tests pass",
    ],
    images: {
      cover: "/images/nexora/board-light.png",
      gallery: [
        {src: "/images/nexora/landing.png", alt: "Landing page"},
        {src: "/images/nexora/board-light.png", alt: "Kanban board, light theme"},
        {src: "/images/nexora/board-dark.png", alt: "Kanban board, dark theme"},
        {src: "/images/nexora/task-panel.png", alt: "Task details with review actions"},
        {src: "/images/nexora/activity.png", alt: "Project activity feed"},
        {src: "/images/nexora/notifications.png", alt: "Notifications"},
        {src: "/images/nexora/owner.png", alt: "Owner panel for approving organizations"},
        {src: "/images/nexora/mobile-my-tasks.png", alt: "My tasks on a phone"},
      ],
    },
  },
  {
    slug: "charadex",
    title: "CharaDex",
    tagline: "MERN app for creating, organizing and discovering original characters",
    description:
      "CharaDex gives writers and artists one place to build structured profiles for their original characters: " +
      "artwork, personality, abilities with named techniques, backstory and tags. Creators can explore each other's " +
      "characters by search, tag and sort order, and connect through likes, comments and follows.",
    role: "Solo: requirements, database design, backend, frontend and documentation",
    period: "Nov 2026",
    status: "Completed",
    featured: false,
    links: {
      repo: "https://github.com/sriramr06/charadex",
    },
    stack: {
      frontend: ["React 19", "Vite", "React Router", "axios", "react-icons", "CSS"],
      backend: ["Node.js", "Express 5", "MongoDB", "Mongoose", "JWT", "bcrypt", "Multer", "Cloudinary"],
    },
    features: [
      "Two-step sign-up with an instant email check, then a username",
      "Create, edit and delete characters with artwork, personality and backstory",
      "Abilities editor: each ability holds its own list of named techniques",
      "Up to 10 free-form tags per character",
      "Explore page with search, filtering by the 20 most-used tags, sorting and pagination",
      "Likes, comments and follows, plus creator pages listing characters, followers and following",
      "Muted Charcoal & Plum theme that follows the system light or dark mode, responsive on mobile and desktop",
    ],
    highlights: [
      "27 REST endpoints with public, optional-auth, private and owner-only access levels",
      "Five-collection MongoDB design (User, Character, Like, Comment, Follow) with compound unique indexes that block duplicate likes and follows",
      "Image uploads streamed from memory with Multer to Cloudinary for artwork and avatars",
      "Like counts added to list responses so cards show them without extra requests",
      "Documented with a problem statement, SRS, database design and a full API reference",
    ],
    images: {
      cover: "/images/charadex/explore.png",
      gallery: [
        {src: "/images/charadex/landing.png", alt: "Landing page"},
        {src: "/images/charadex/explore.png", alt: "Explore page with search, tag filters and sorting"},
        {src: "/images/charadex/explore-dark.png", alt: "Explore page, dark theme"},
        {src: "/images/charadex/character-detail.png", alt: "Character profile with abilities, likes and comments"},
        {src: "/images/charadex/character-form.png", alt: "Character editor with abilities and techniques"},
        {src: "/images/charadex/creator.png", alt: "Creator page with followers and following"},
        {src: "/images/charadex/mobile-character.png", alt: "Character profile on a phone"},
      ],
    },
  },
] as const;

export const experience = [
  {
    company: "Pentagon Innovations",
    role: "Web Developer Intern",
    type: "Internship",
    period: "Dec 2025 - Apr 2026",
    description:
      "Contributed to the development of a multi-tenant HRMS SaaS application, working on core modules, database schema design, UI architecture, and software testing.",
    responsibilities: [
      "Worked on Attendance & Leave Management and Meetings & Broadcasting modules.",
      "Designed database schemas for assigned HRMS modules.",
      "Contributed to the application's overall UI structure, layout consistency, and theme.",
      "Reviewed and debugged AI-generated code to resolve implementation issues.",
      "Performed automated testing and validated API functionality using Postman.",
      "Used Cursor and Antigravity for AI-assisted development and iterative improvements.",
    ],
    tools: ["Cursor", "Antigravity", "Postman"],
  },
] as const;