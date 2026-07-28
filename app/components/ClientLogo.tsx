import { CLIENTS, type ClientKey } from "../lib/clients";
import LogoBadge from "./LogoBadge";

export default function ClientLogo({
  client,
  size = "h-9 w-9",
}: {
  client: ClientKey;
  size?: string;
}) {
  const { name, logo } = CLIENTS[client];
  return <LogoBadge name={name} logo={logo} size={size} />;
}
