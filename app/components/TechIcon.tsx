const ICON_MAP: Record<string, string> = {
  "c#": "csharp",
  ".net": "dotnet",
  ".net core": "dotnet",
  ".net 5": "dotnet",
  ".net standard": "dotnet",
  "asp.net core": "dotnet",
  "asp.net mvc": "dotnet",
  python: "python",
  fastapi: "fastapi",
  azure: "microsoftazure",
  "azure functions": "microsoftazure",
  "azure app services": "microsoftazure",
  "azure devops": "azuredevops",
  aws: "amazonaws",
  "aws bedrock": "amazonaws",
  "amazon bedrock": "amazonaws",
  "amazon lex": "amazonaws",
  "amazon connect": "amazonaws",
  "aws lambda": "awslambda",
  "api gateway": "amazonapigateway",
  "step functions": "amazonaws",
  s3: "amazons3",
  iam: "amazoniam",
  dynamodb: "amazondynamodb",
  opensearch: "opensearch",
  langgraph: "langchain",
  "langchain/langgraph": "langchain",
  claude: "claude",
  "anthropic api": "anthropic",
  docker: "docker",
  kubernetes: "kubernetes",
  terraform: "terraform",
  "next.js": "nextdotjs",
  "node.js": "nodedotjs",
  nodejs: "nodedotjs",
  typescript: "typescript",
  react: "react",
  "react native": "react",
  postgresql: "postgresql",
  mongodb: "mongodb",
  mysql: "mysql",
  "sql server": "microsoftsqlserver",
  git: "git",
  bitbucket: "bitbucket",
  "bitbucket pipelines": "bitbucket",
  rabbitmq: "rabbitmq",
  stripe: "stripe",
  firebase: "firebase",
  sonarqube: "sonarqube",
  "github actions": "githubactions",
  playwright: "playwright",
  opentelemetry: "opentelemetry",
  jira: "jira",
  "power bi": "powerbi",
  "azure data factory": "microsoftazure",
};

export default function TechIcon({ name }: { name: string }) {
  const slug = ICON_MAP[name.toLowerCase()];
  if (!slug) return null;

  const src = `/assets/logos/tech/${slug}.svg`;

  return (
    <span
      aria-hidden="true"
      className="inline-block h-3 w-3 shrink-0 bg-current"
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
