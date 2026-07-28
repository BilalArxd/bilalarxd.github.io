import type { CompanyKey } from "./companies";

export type Role = {
  slug: string;
  dates: string;
  title: string;
  company: CompanyKey;
  companyLabel: string;
  summary: string;
  bullets: string[];
  tags: string[];
};

export const ROLES: Role[] = [
  {
    slug: "hexaware",
    dates: "May 2022 - Present",
    title: "Applied AI Engineer & Senior Backend Consultant",
    company: "hexaware",
    companyLabel: "Hexaware Technologies (formerly Mobiquity)",
    summary:
      "Consult on backend architecture and delivery for enterprise clients across banking, telecom, insurance, utilities, and financial services, owning technical decisions from solution design through production on .NET, Azure, and AWS. Introduced an AI-assisted SDLC and agentic workflow practice, and established an evaluation discipline for AI features: scenario testing, structured output validation, human-review gates, and production-readiness criteria.",
    bullets: [
      "Consult on backend architecture and delivery for enterprise clients across banking, telecom, insurance, utilities, and financial services, owning technical decisions from solution design through production on .NET, Azure, and AWS.",
      "Deliver enterprise backend and cloud-native platforms end to end, including secure client-access portals, event-driven microservices, enterprise API integrations, and analytics data pipelines for compliance-heavy environments.",
      "Modernize legacy systems and integrate third-party and enterprise APIs into existing systems, with continuous focus on performance, scalability, and security.",
      "Introduced an AI-assisted SDLC and agentic workflow practice that delivery teams now use for requirement analysis, architecture, code review, and documentation, backed by a governance layer that keeps AI-assisted delivery auditable.",
      "Took agentic and RAG-based AI solutions from proof of concept to enterprise demo, and embedded AI integration patterns into existing backend and cloud systems.",
      "Established evaluation discipline for AI features across engagements, including scenario testing, structured output validation, fallback handling, human-review gates, and production-readiness criteria.",
      "Support presales with solution architecture, estimations, and technical demos, and mentor engineers on backend design, cloud integration, API design, and practical AI adoption.",
    ],
    tags: [".NET", "Azure", "AWS", "RAG", "AI Governance"],
  },
  {
    slug: "systems-limited",
    dates: "Jul 2021 - Apr 2022",
    title: "Senior Consultant & Senior Backend Engineer",
    company: "systems-limited",
    companyLabel: "Systems Limited",
    summary:
      "Led migration of legacy products to .NET 5 and React under fixed consulting deadlines, owning technical direction while staying hands-on for most of the delivery. Improved maintainability of inherited codebases through refactoring, review standards, and static analysis, driving adoption of modern engineering practices across delivery teams.",
    bullets: [
      "Led migration of legacy products to .NET 5 and React under fixed consulting deadlines, owning technical direction while staying hands-on for most of the delivery.",
      "Improved maintainability of inherited codebases through refactoring, review standards, and static analysis, reducing code smells and raising maintainability scores.",
      "Drove adoption of modern engineering practices across delivery teams, building a culture of continuous improvement.",
    ],
    tags: [".NET 5", "React", "Static Analysis"],
  },
  {
    slug: "we-are-nova",
    dates: "Mar 2016 - Jul 2021",
    title: "Technical Lead & Senior Software Engineer",
    company: "we-are-nova",
    companyLabel: "We Are Nova (Islamabad, with time in Liverpool, UK)",
    summary:
      "Provided technical leadership across 4 product teams in fintech, hospitality, health & safety, and enterprise SaaS. Cut CI/CD build times 60% with Bitbucket Pipelines (a further 40% via mono-repository restructuring) and cut application bugs 70% by introducing code review standards, SonarLint, and SonarQube quality gates. Built, mentored, and reviewed engineering teams, training new engineers in the UK office on .NET Core and architecture.",
    bullets: [
      "Progressed Senior Software Engineer (2016–2018) › Project Lead (2018–2019) › Technical Lead (2019–2021).",
      "Provided technical leadership across 4 product teams in fintech, hospitality, health & safety, and enterprise SaaS, owning architectural decisions, engineering standards, and delivery.",
      "Owned solution architecture for products involving payment gateways, Open Banking integration, and queue-based transaction processing on cloud-hosted backend services.",
      "Cut CI/CD build times 60% with Bitbucket Pipelines and a further 40% through mono-repository restructuring, and introduced one-click store deployments, release automation, and feature flag management.",
      "Cut application bugs 70% by introducing code review standards, SonarLint in the IDE, and SonarQube quality gates in the pipeline.",
      "Built, mentored, and reviewed engineering teams, ran monthly performance cycles, and trained new engineers in the UK office on .NET Core, architecture, and SOLID principles.",
    ],
    tags: [".NET Core", "Bitbucket Pipelines", "SonarQube"],
  },
  {
    slug: "dealers-cloud",
    dates: "Nov 2014 - Mar 2016",
    title: "Software Engineer",
    company: "dealers-cloud",
    companyLabel: "Dealers Cloud",
    summary:
      "Owned delivery of the dealership platform across backend and client apps, leading development of REST APIs, a single-page application, and an Android app. Strengthened system architecture with Onion Architecture and SOLID principles, resolving performance bottlenecks across the platform.",
    bullets: [
      "Owned delivery of the dealership platform across backend and client apps, leading development of REST APIs, a single-page application, and an Android app.",
      "Strengthened system architecture with Onion Architecture, SOLID principles, and design patterns, and resolved performance bottlenecks across the platform.",
    ],
    tags: ["REST APIs", "Onion Architecture", "SOLID"],
  },
  {
    slug: "developer-tribe",
    dates: "Jan 2013 - Nov 2014",
    title: "Software Engineer",
    company: "developer-tribe",
    companyLabel: "Developer Tribe",
    summary:
      "Owned the full mobile application lifecycle, from market analysis and architecture through release and ongoing support. Designed mobile app architectures using MVVM, SOLID, and service-oriented principles, with regular reviews to maintain quality and user experience.",
    bullets: [
      "Owned the full mobile application lifecycle, from market analysis and architecture through release and ongoing support.",
      "Designed mobile app architectures using MVVM, SOLID, and service-oriented principles, with regular reviews to maintain quality and user experience.",
    ],
    tags: ["MVVM", "SOLID"],
  },
];
