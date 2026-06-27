import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { SiteFrame } from "@/components/SiteChrome";
import { getLivePackages, getLiveServices } from "@/lib/liveData";
import { proofPoints, testimonials } from "@/lib/siteData";
import heroImg from './heroimg2.png'
export default async function Home() {
  const [services, packages] = await Promise.all([getLiveServices(), getLivePackages()]);
  const featuredServices = services.slice(1, 5);

  return (
    <SiteFrame>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Oracle x Awakened Path</p>
          <h1>
            Find Clarity, Healing
            <br />
            & Direction Through <span>Spiritual Guidance.</span>
          </h1>
          <p className="hero-text">
            Personalised Tarot, Astrology, Numerology, Energy Healing, Vastu and
            Soul Path guidance to help you understand your journey with clarity
            and confidence.
          </p>
          <div className="hero-actions">
            <Link className="pill-button" href="/booking">Book A Reading</Link>
            <Link className="outline-button" href="/services">View Services</Link>
          </div>
          <div className="qualities">
            {proofPoints.map((item) => (
              <div className="quality" key={item.label}>
                <span><Icon name={item.icon} /></span>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-art" aria-label="Meditating spiritual guide illustration">
          <Image
            src={heroImg}
            alt="Illustration of a meditating spiritual guide surrounded by moon, stars, and leaves"
            fill
            sizes="(max-width: 900px) 88vw, 48vw"
            priority
          />
        </div>
      </section>

      <section className="services-section">
        <h2>Services</h2>
        <div className="divider">✦</div>
        <div className="service-grid">
          {featuredServices.map((service) => (
            <article className="service-card" key={service.name}>
              <span className="service-icon"><Icon name={service.icon} /></span>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <strong>{service.priceLabel}</strong>
              <Link href="/services">Learn More →</Link>
            </article>
          ))}
        </div>
        <div className="package-panel">
          <h3>Tarot Packages</h3>
          <ul>
            {packages.map((item) => (
              <li key={item.name}>{item.name} - ${item.packagePrice}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="welcome-section" id="about">
        <div className="ritual-photo">
          <Image
            src="/ritual-still-life.png"
            alt="Candles, sage, and crystals on a warm ritual table"
            fill
            sizes="(max-width: 800px) 100vw, 39vw"
          />
        </div>
        <div className="welcome-copy">
          <p className="eyebrow">About Alieya Junejaa</p>
          <h2>Alieya Junejaa</h2>
          <p className="role-line">
            Tarot Reader | Astrologer | Numerologist | Spiritual Mentor | Soul
            Path Guide
          </p>
          <p>
            With 5+ years of professional experience and 11,000+ clients guided
            worldwide, Alieya helps individuals gain clarity, direction, and
            deeper understanding through Tarot, Astrology, Numerology, and
            Spiritual Guidance.
          </p>
          <p>
            Her background in Psychology allows each session to combine
            intuitive insight with emotional understanding, self-awareness, and
            practical guidance.
          </p>
          <p>
            My approach combines spiritual insight with psychological
            understanding, helping you move forward with clarity, confidence, and
            purpose.
          </p>
        </div>
        <div className="portrait-card">
          <Image
            src="/alieya-portrait.png"
            alt="Portrait of Alieya Junejaa holding a mug"
            fill
            sizes="(max-width: 800px) 82vw, 22vw"
          />
        </div>
      </section>

      <section className="kind-words">
        <span className="botanical left" aria-hidden="true"><Icon name="leaf" /></span>
        <span className="botanical right" aria-hidden="true"><Icon name="leaf" /></span>
        <h2>Kind Words From Clients Around The World</h2>
        <div className="divider">✦</div>
        <button aria-label="Previous testimonial">‹</button>
        <blockquote>
          <span>“</span>
          {testimonials[0].testimonial}
          <span>”</span>
        </blockquote>
        <div className="stars">★★★★★</div>
        <p>– {testimonials[0].clientName}</p>
        <button aria-label="Next testimonial">›</button>
      </section>

      <section className="subscribe-section">
        <div className="subscribe-copy">
          <span><Icon name="envelope-flower" /></span>
          <div>
            <h2>Stay Connected</h2>
            <p>
              Get soul-nourishing insights, guidance, and exclusive offers
              delivered to your inbox.
            </p>
          </div>
        </div>
        <form className="subscribe-form">
          <input aria-label="Email address" placeholder="Your email address" />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </SiteFrame>
  );
}
