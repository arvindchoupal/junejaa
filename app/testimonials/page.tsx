import { SiteFrame } from "@/components/SiteChrome";
import { testimonials } from "@/lib/siteData";

export default function TestimonialsPage() {
  return (
    <SiteFrame>
      <section className="inner-hero">
        <p className="eyebrow">Testimonials</p>
        <h1>Kind Words From Clients Around The World</h1>
        <p>
          Feedback from clients guided through love, relationships, career
          decisions, personal growth, spiritual awakening, and transitions.
        </p>
      </section>
      <section className="catalog-section">
        <div className="catalog-grid">
          {testimonials.map((item) => (
            <article className="catalog-card testimonial-card" key={`${item.clientName}-${item.clientCountry}`}>
              <div className="stars">{"★".repeat(item.rating)}</div>
              <p>“{item.testimonial}”</p>
              <strong>{item.clientName}</strong>
              <span>{item.clientCountry}</span>
            </article>
          ))}
        </div>
      </section>
    </SiteFrame>
  );
}
