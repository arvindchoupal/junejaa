import { PackagesClient } from "@/components/PackagesClient";
import { SiteFrame } from "@/components/SiteChrome";

export default function PackagesPage() {
  return (
    <SiteFrame>
      <section className="inner-hero">
        <p className="eyebrow">Tarot Packages</p>
        <h1>Session Bundles For Continued Guidance</h1>
        <p>
          Packages are designed for clients who want deeper support over time
          instead of a single reading.
        </p>
      </section>
      <section className="catalog-section">
        <PackagesClient />
      </section>
    </SiteFrame>
  );
}
