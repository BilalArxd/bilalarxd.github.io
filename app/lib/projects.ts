import type { CompanyKey } from "./companies";
import type { ClientKey } from "./clients";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  role: string;
  company: CompanyKey;
  clients?: ClientKey[];
  overview: string;
  contributions: string[];
  tags: string[];
  featured?: boolean;
};

export function projectsByCompany(company: CompanyKey): Project[] {
  return PROJECTS.filter((project) => project.company === company);
}

export const PROJECTS: Project[] = [
  {
    slug: "velocity-ai",
    name: "Velocity AI",
    tagline: "Multi-Agent AI SaaS Platform",
    role: "Initiator & Lead Engineer",
    company: "hexaware",
    overview:
      "A platform that turns a natural-language brief into production-ready deliverables (user stories, decks, and working prototypes) through an LLM-orchestrated multi-agent pipeline.",
    contributions: [
      "Initiated and led engineering for the platform end to end.",
      "Designed a deterministic orchestration engine sequencing ~80 specialized LLM agents through manifest-driven pipelines.",
      "Implemented human-in-the-loop review gates with durable state (LangGraph Postgres checkpointer).",
      "Built a custom evaluation framework that raised one pipeline's scenario pass rate from 80% to 100%.",
      "Built the full stack end to end: FastAPI/PostgreSQL backend, MCP server integration, Next.js/React frontend, provisioned on Terraform-managed AWS infrastructure.",
    ],
    tags: [
      "Python",
      "FastAPI",
      "LangGraph",
      "Claude",
      "PostgreSQL",
      "Next.js",
      "Terraform",
      "AWS",
    ],
    featured: true,
  },
  {
    slug: "apex",
    name: "Apex",
    tagline: "AI SDLC Governance Framework",
    role: "Creator & Lead Developer",
    company: "hexaware",
    overview:
      "An internal governance framework layering structured, auditable delivery controls on top of AI coding assistants across 6 platforms.",
    contributions: [
      "Led development of Apex from concept to internal rollout.",
      "Built YAML/Markdown-driven agent definitions with structured context handoff between stages.",
      "Enforced a spec-driven lifecycle with automated quality gates, guardrails, and tamper-evident audit logging.",
    ],
    tags: ["Node.js", "GitHub Actions"],
    featured: true,
  },
  {
    slug: "agentic-voice-platform",
    name: "Agentic AI Chat & Voice Platform",
    tagline: "Banking & Telecom",
    role: "Solution Architect",
    company: "hexaware",
    clients: ["vodafone-qatar"],
    overview:
      "An end-to-end agentic AI architecture POC coordinating specialist agents across voice and digital channels for banking and telecom use cases.",
    contributions: [
      "Designed and implemented the end-to-end agentic AI architecture.",
      "Architected a Supervisor Agent coordinating specialist agents (Billing, Sales) with autonomous decision-making and tool invocation.",
      "Integrated LLM-driven reasoning with RAG knowledge bases and secure backend integrations across API and voice channels.",
    ],
    tags: [
      "Amazon Bedrock",
      "Amazon Lex",
      "Amazon Connect",
      "OpenSearch",
      "React",
      ".NET",
    ],
    featured: true,
  },
  {
    slug: "enterprise-ai-document-analysis",
    name: "Enterprise AI Document Analysis Integration",
    tagline: "Document Automation",
    role: "Backend Integration Engineer",
    company: "hexaware",
    overview:
      "Backend integration with AI-powered document analysis APIs for structured extraction, workflow automation, and enterprise document processing.",
    contributions: [
      "Built secure API orchestration around third-party document analysis APIs.",
      "Delivered structured-output extraction and workflow automation under delivery constraints.",
    ],
    tags: [".NET", "Azure", "REST APIs"],
  },
  {
    slug: "mpg-nova",
    name: "MPG Nova",
    tagline: "Client Access Portal",
    role: "Lead Backend Engineer",
    company: "hexaware",
    overview:
      "An enterprise-grade client access portal providing secure, high-performance access for complex, compliance-heavy business workflows.",
    contributions: [
      "Delivered the Azure cloud-native architecture end to end.",
      "Built with Functions, App Services, Logic Apps, API Management, and Data Factory.",
      "Set up Azure DevOps CI/CD pipelines for the portal.",
    ],
    tags: ["C#", "Azure Functions", "SQL Server", "Azure DevOps"],
    featured: true,
  },
  {
    slug: "hejaz-financial-services",
    name: "Hejaz Financial Services",
    tagline: "Islamic Finance Platform",
    role: "Backend Engineer",
    company: "hexaware",
    clients: ["hejaz"],
    overview:
      "Serverless backend services for a leading Australian Islamic finance institution offering Shariah-compliant products.",
    contributions: [
      "Built and deployed NodeJS/TypeScript serverless services on AWS Lambda and Step Functions.",
      "Implemented event-driven design and state machines with SQS/SNS messaging.",
      "Integrated third-party APIs into the platform.",
    ],
    tags: ["TypeScript", "Node.js", "AWS Lambda", "Step Functions"],
  },
  {
    slug: "reservoir-safety",
    name: "Reservoir Safety",
    tagline: "Reservoir Safety Oversight",
    role: "Backend Engineer",
    company: "hexaware",
    clients: ["yorkshire-water"],
    overview:
      "A digital platform for reservoir safety oversight, covering water monitoring, structural integrity, and emergency response coordination.",
    contributions: [
      "Built the backend on C# / .NET Core with Clean Architecture and Azure Functions.",
      "Delivered water level monitoring, structural integrity assessment, and maintenance management features.",
    ],
    tags: ["C#", ".NET Core", "Azure Functions", "React"],
  },
  {
    slug: "end-to-end-data-pipeline",
    name: "End-to-End Data Pipeline",
    tagline: "Data Ingestion, Analytics & Reporting",
    role: "Data Engineer",
    company: "hexaware",
    overview:
      "A comprehensive data pipeline covering ingestion, normalization, analytics, and reporting.",
    contributions: [
      "Built data ingestion and normalization pipelines on Azure Data Factory.",
      "Delivered analytics and reporting via Power BI on top of SQL Server.",
    ],
    tags: ["Azure Data Factory", "Power BI", "SQL Server"],
  },
  {
    slug: "ascent-360",
    name: "Ascent 360",
    tagline: "Customer Engagement Platform",
    role: "Senior Backend Engineer",
    company: "systems-limited",
    overview:
      "A customer data and engagement platform powering personalized communication across email, messaging, campaigns, and digital channels.",
    contributions: [
      "Upgraded the legacy campaign criteria designer for maintainability and reuse.",
      "Reduced code smells by 40% and improved the maintainability score by 30%.",
    ],
    tags: ["C#", ".NET Core", "React", "Azure"],
  },
  {
    slug: "qbunk",
    name: "Qbunk",
    tagline: "Real-Time Food Ordering",
    role: "Technical Lead",
    company: "we-are-nova",
    overview:
      "A real-time food ordering application for skipping queues in bars and restaurants.",
    contributions: [
      "Owned architectural decisions and delivery as Technical Lead.",
      "Integrated Stripe payments and a Firebase backend.",
    ],
    tags: [".NET Core", "React Native", "Stripe", "Firebase"],
  },
  {
    slug: "cheqs",
    name: "CHEQS",
    tagline: "Health & Safety Risk Assessment",
    role: "Technical Lead",
    company: "we-are-nova",
    overview:
      "A health and safety risk assessment platform for on-site consultants.",
    contributions: [
      "Owned architectural decisions and delivery as Technical Lead.",
      "Replaced manual document handling with dynamic assessments, version control, and corrective actions.",
    ],
    tags: [".NET Core", "React"],
  },
  {
    slug: "paidyou",
    name: "PaidYou",
    tagline: "Bill-Splitting Fintech",
    role: "Technical Lead",
    company: "we-are-nova",
    overview:
      "A fintech application for splitting bills between users and housemates.",
    contributions: [
      "Owned architectural decisions and delivery as Technical Lead.",
      "Integrated Open Banking APIs and built a queue-based transaction processing system with RabbitMQ.",
    ],
    tags: [".NET Core", "RabbitMQ", "React Native"],
  },
  {
    slug: "workpal",
    name: "WorkPal",
    tagline: "Performance Management",
    role: "Technical Lead",
    company: "we-are-nova",
    overview:
      "A web application for next-generation performance management and reviews for enterprises.",
    contributions: ["Owned architectural decisions and delivery as Technical Lead."],
    tags: [".NET Core"],
  },
  {
    slug: "nova-core",
    name: "Nova Core",
    tagline: "Reusable Application Boilerplate",
    role: "Architect & Creator",
    company: "we-are-nova",
    overview:
      "A reusable application boilerplate and architecture framework accelerating startup product development.",
    contributions: [
      "Designed the reusable architecture, scaffolding, and deployment standards.",
      "Reduced project initialization from 45 minutes to ~1200ms using a .NET Core templating engine with pluggable components.",
    ],
    tags: [".NET Core", "React", "Docker", "Kubernetes", "MongoDB"],
  },
  {
    slug: "dealers-cloud",
    name: "Dealers Cloud",
    tagline: "Car Dealership Management Portal",
    role: "Software Engineer (Full Stack)",
    company: "dealers-cloud",
    overview:
      "A car dealership management portal enabling dealers to share leads, calculate revenues, and apply for loans within the app.",
    contributions: [
      "Owned delivery across REST APIs, a single-page application, and an Android app.",
      "Strengthened system architecture with Onion Architecture and SOLID principles.",
      "Achieved a 6x query performance improvement through system analysis and bottleneck resolution.",
    ],
    tags: ["C#", "ASP.NET MVC", "SQL Server"],
  },
  {
    slug: "threes-dots-squares",
    name: "Threes / Dots / Squares",
    tagline: "Matrix-Based Game Clones",
    role: "Software Engineer",
    company: "developer-tribe",
    overview: "Matrix-based game clones for the Windows App Store.",
    contributions: [
      "Engineered a reusable Windows Phone game engine for matrix-based games.",
      "Integrated the engine with social network and gaming APIs.",
    ],
    tags: ["C#"],
  },
];
