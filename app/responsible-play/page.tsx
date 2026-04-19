import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "House Rules — cryptojackpot",
  description:
    "Stake limits, reality checks, self-exclusion, helplines, your record. Visible — never buried.",
};

export default function ResponsiblePlayPage() {
  return (
    <div className="relative">
      <iframe
        src="/demos/house-cube.html"
        title="House Rules — the Cube"
        className="block min-h-[100vh] w-full"
        style={{ border: 0, height: "calc(100svh * 6)" }}
      />
    </div>
  );
}
