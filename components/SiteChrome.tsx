import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/lib/siteData";
import { Icon } from "./Icon";

export function TopStrip() {
  return (
    <section className="top-strip" aria-label="Contact information">
      <p>✦ Guided by Soul. Rooted in Truth. ✦</p>
      <div className="top-contact">
        <a href="tel:+918699555967"><Icon name="phone" /> +91 86995 55967</a>
        <a href="mailto:alieyajunejaa@gmail.com"><Icon name="mail" /> alieyajunejaa@gmail.com</a>
      </div>
    </section>
  );
}

export function Brand({ small = false }: { small?: boolean }) {
  return (
    <Link className={`brand${small ? " footer-brand" : ""}`} href="/" aria-label="Alieya Junejaa home">
      <span className="brand-mark">
        <Image src="/alieya-logo.png" alt="" fill sizes={small ? "64px" : "104px"} priority={!small} />
      </span>
      <span>
        <strong>ALIEYA JUNEJAA</strong>
        <em>Alchemist Oracle x Awakened Path</em>
      </span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="main-header">
      <Brand />
      <nav className="nav-links" aria-label="Main navigation">
        {navItems.map((item) => (
          <Link href={item.href} key={item.label}>
            {item.label}
          </Link>
        ))}
      </nav>
      <Link className="pill-button header-button" href="/booking">
        Book A Reading
      </Link>
    </header>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Brand small />
      <nav aria-label="Footer navigation">
        {navItems.map((item) => (
          <Link href={item.href} key={item.label}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="footer-legal">
        <p>© {currentYear} Alieya Junejaa. All Rights Reserved.</p>
        <p>
          Powered by{" "}
          <a  style={{ textDecoration: "none" }} href="https://geniusoffice.com/" target="_blank" rel="noreferrer">
            genius office
          </a>
        </p>
      </div>
      <span className="footer-moon" aria-hidden="true">
        <Icon name="moon" />
      </span>
    </footer>
  );
}

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <main className="site-shell">
      <TopStrip />
      <Header />
      {children}
      <Footer />
    </main>
  );
}
