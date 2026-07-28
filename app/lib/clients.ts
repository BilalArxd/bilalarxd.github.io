export type ClientKey = "vodafone-qatar" | "yorkshire-water" | "hejaz";

export const CLIENTS: Record<ClientKey, { name: string; logo: string }> = {
  "vodafone-qatar": {
    name: "Vodafone Qatar",
    logo: "/assets/logos/vodafone.svg",
  },
  "yorkshire-water": {
    name: "Yorkshire Water",
    logo: "/assets/logos/yorkshire-water.svg",
  },
  hejaz: {
    name: "Hejaz Financial Services",
    logo: "/assets/logos/hejaz.png",
  },
};
