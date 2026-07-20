import type { Metadata } from "next";
import { DailyCardDraw } from "@/components/DailyCardDraw";
import { SiteFrame } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Daily Tarot Guidance | Alieya Junejaa",
  description: "Draw your daily tarot card for guidance, clarity, and insight into today's energy.",
};

export default function DailyGuidancePage() {
  return (
    <SiteFrame>
      <DailyCardDraw />
    </SiteFrame>
  );
}
