export type TierSpec = {
  id: string;
  name: string;
  chip: string;
  edge: string;
  unlock: string;
  benefit: string;
  retainer: string;
};

export const TIERS: TierSpec[] = [
  {
    id: "bronze",
    name: "Bronze Chip",
    chip: "#B87333",
    edge: "#5A3417",
    unlock: "First Stake",
    benefit: "Daily Spin bonus + starter House Chips",
    retainer: "Starter",
  },
  {
    id: "silver",
    name: "Silver Chip",
    chip: "#C0C0C0",
    edge: "#5A5A5A",
    unlock: "5 session days · $500 total Stake",
    benefit: "5% Retainer · weekly Showdown entry",
    retainer: "5%",
  },
  {
    id: "gold",
    name: "Gold Chip",
    chip: "#E0FF57",
    edge: "#5A7012",
    unlock: "30 session days · $5,000 total Stake",
    benefit: "10% Retainer · exclusive Drops · priority Concierge",
    retainer: "10%",
  },
  {
    id: "ruby",
    name: "Ruby Chip",
    chip: "#C41E3A",
    edge: "#5A0E1A",
    unlock: "90 session days · $25,000 total Stake",
    benefit: "15% Retainer · dedicated host · monthly Showdown invite",
    retainer: "15%",
  },
  {
    id: "onyx",
    name: "Onyx Crown",
    chip: "#0A0A0C",
    edge: "#D4AF37",
    unlock: "Invitation only",
    benefit: "20% Retainer · bespoke Drops · private experiences",
    retainer: "20%",
  },
];
