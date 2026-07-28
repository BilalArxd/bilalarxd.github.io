export type CompanyKey =
  | "hexaware"
  | "systems-limited"
  | "we-are-nova"
  | "dealers-cloud"
  | "developer-tribe";

export const COMPANIES: Record<
  CompanyKey,
  { name: string; logo: string | null; onDark?: boolean }
> = {
  hexaware: {
    name: "Hexaware Technologies",
    logo: "/assets/logos/hexaware.svg",
    onDark: true,
  },
  "systems-limited": {
    name: "Systems Limited",
    logo: "/assets/logos/systems-limited.svg",
  },
  "we-are-nova": {
    name: "We Are Nova",
    logo: "/assets/logos/we-are-nova.svg",
    onDark: true,
  },
  "dealers-cloud": {
    name: "Dealers Cloud",
    // No verified logo. The only source found (dealerscloud.com) is likely a
    // different company with a coincidental name match. See public/assets/logos/SOURCES.md.
    logo: null,
  },
  "developer-tribe": {
    name: "Developer Tribe",
    logo: "/assets/logos/developer-tribe.png",
  },
};
