import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/lib/siteData";
import { Icon } from "./Icon";

export function TopStrip() {
  return (
    <section className="top-strip" aria-label="Contact information">
      <p>✦ Guided by Soul. Rooted in Truth. ✦</p>
      <div className="top-contact">
        <span><Icon name="phone" /> +44 1234 567890</span>
        <span><Icon name="mail" /> hello@alieyajunejaa.com</span>
      </div>
      <div className="socials" aria-label="Social links">
        <span><Icon name="instagram" /></span>
        <span><Icon name="facebook" /></span>
        <span><Icon name="pinterest" /></span>
      </div>
    </section>
  );
}

export function Brand({ small = false }: { small?: boolean }) {
  return (
    <Link className={`brand${small ? " footer-brand" : ""}`} href="/" aria-label="Alieya Junejaa home">
      <span className="brand-mark">
        <Image src="/logo.png" alt="" fill sizes={small ? "44px" : "68px"} priority={!small} />
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
      <p>© 2024 Alieya Junejaa. All Rights Reserved.</p>
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
