import { ServicesClient } from "@/components/ServicesClient";
import { SiteFrame } from "@/components/SiteChrome";

export default function ServicesPage() {
  return (
    <SiteFrame>
      <section className="inner-hero">
        <p className="eyebrow">Services</p>
        <h1>Tarot, Astrology, Numerology, Healing & Vastu</h1>
        <p>
          Choose the guidance format that matches your current question, life
          phase, or spiritual work.
        </p>
      </section>
      <section className="catalog-section">
        <ServicesClient />
      </section>
    </SiteFrame>
  );
}
