import { COMPANIES, type CompanyKey } from "../lib/companies";
import LogoBadge from "./LogoBadge";

export default function CompanyLogo({
  company,
  size = "h-10 w-10",
}: {
  company: CompanyKey;
  size?: string;
}) {
  const { name, logo, onDark } = COMPANIES[company];
  return <LogoBadge name={name} logo={logo} onDark={onDark} size={size} />;
}
