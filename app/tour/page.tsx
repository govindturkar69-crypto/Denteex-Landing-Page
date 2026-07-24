import type { Metadata } from "next";
import { TourExperience } from "@/components/tour/tour-experience";

export const metadata: Metadata = {
  title: "Denteex — Client Pitch Deck Tour",
  description:
    "An interactive, page-by-page walkthrough of the Denteex client pitch deck.",
};

export default function TourPage() {
  return <TourExperience />;
}
