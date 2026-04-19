import type { Metadata } from "next";
import { HouseCube } from "@/components/house/HouseCube";

export const metadata: Metadata = {
  title: "House Rules — cryptojackpot",
  description:
    "Stake limits, reality checks, self-exclusion, helplines, your record. Visible — never buried.",
};

export default function ResponsiblePlayPage() {
  return <HouseCube />;
}
