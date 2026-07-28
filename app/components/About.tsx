import Reveal from "./Reveal";
import TechIcon from "./TechIcon";
import { PROJECTS } from "../lib/projects";

const STATS = [
  { value: "13+", label: "Years in software engineering" },
  { value: String(PROJECTS.length), label: "Projects delivered" },
];

const INDUSTRIES = [
  "Banking",
  "Telecom",
  "Insurance",
  "Utilities",
  "Financial Services",
  "Fintech",
  "Hospitality",
  "Health & Safety",
  "Enterprise SaaS",
];

// Trimmed to the tags that actually differentiate each group (5-8 each) and
// deduped across groups (e.g. DynamoDB now lives only under Cloud) — the
// full exhaustive list belongs on the CV, not as a wall of ~80 pills here.
// See ux.md #3.
const SKILL_GROUPS = [
  {
    name: "Applied AI",
    tags: [
      "Multi-Agent Systems",
      "Agentic Workflows",
      "RAG",
      "LangChain/LangGraph",
      "MCP",
      "Prompt & Context Engineering",
      "LLM Evaluation",
      "AI Governance",
    ],
  },
  {
    name: "AI Platforms",
    tags: [
      "Amazon Bedrock",
      "Anthropic API",
      "Amazon Lex",
      "Amazon Connect",
      "Amazon OpenSearch",
      "Azure AI Foundry",
    ],
  },
  {
    name: "Backend & Data",
    tags: [
      "C#",
      ".NET",
      "Python",
      "FastAPI",
      "TypeScript",
      "React",
      "SQL Server",
      "PostgreSQL",
    ],
  },
  {
    name: "Architecture",
    tags: [
      "Solution Architecture",
      "Microservices",
      "Distributed Systems",
      "Event-Driven Architecture",
      "Clean Architecture",
      "Serverless",
      "Enterprise Integration",
    ],
  },
  {
    name: "Cloud",
    tags: [
      "AWS Lambda",
      "Step Functions",
      "DynamoDB",
      "S3",
      "Terraform",
      "Azure Functions",
      "Azure API Management",
      "Azure Data Factory",
    ],
  },
  {
    name: "DevOps & Quality",
    tags: [
      "Azure DevOps",
      "GitHub Actions",
      "Docker",
      "Kubernetes",
      "TDD",
      "Test Automation",
      "OpenTelemetry",
    ],
  },
  {
    name: "Leadership",
    tags: [
      "Technical Leadership",
      "Solution Ownership",
      "Mentoring",
      "Stakeholder Management",
      "Presales & Technical Demos",
      "Agile/Scrum",
    ],
  },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 pt-8 pb-16 sm:pt-12 sm:pb-24">
      <Reveal>
        <div className="rounded-lg border border-neutral-200 p-5 dark:border-white/10">
          <h2 className="font-mono text-xs font-semibold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
            About
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            Deep experience building backend platforms, cloud-native systems, enterprise integrations, and distributed architectures across .NET, Azure, and AWS. Combines production backend engineering with agentic AI, multi-agentic workflows, RAG, evaluation, and AI governance, delivered as reliable, enterprise-grade systems.
          </p>
          <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-mono text-3xl font-bold text-neutral-900 dark:text-neutral-50">
                  {stat.value}
                </dd>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </dl>

          <div className="mt-5 flex flex-wrap gap-2">
            {INDUSTRIES.map((industry) => (
              <span
                key={industry}
                className="rounded-full bg-neutral-100 px-3 py-1 font-mono text-xs text-neutral-600 dark:bg-white/5 dark:text-neutral-400"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={150}>
        <div className="mt-14">
          <h3 className="font-mono text-xs font-semibold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
            Core Expertise
          </h3>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {SKILL_GROUPS.map((group) => (
              <div
                key={group.name}
                className="rounded-lg border border-neutral-200 p-4 dark:border-white/10"
              >
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {group.name}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.tags.map((tag) => (
                    <li
                      key={tag}
                      className="flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 font-mono text-xs text-neutral-600 dark:bg-white/5 dark:text-neutral-400"
                    >
                      <TechIcon name={tag} />
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
