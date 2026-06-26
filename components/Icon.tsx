export function Icon({ name }: { name: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "phone":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M6.7 3.8 9.2 8l-2 2c1.5 3 3.8 5.3 6.8 6.8l2-2 4.2 2.5c.4.2.6.7.5 1.1-.4 1.8-1.8 3.1-3.6 3.1C9.1 21.5 2.5 14.9 2.5 6.9c0-1.8 1.3-3.2 3.1-3.6.4-.1.9.1 1.1.5Z" /></svg>;
    case "mail":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M4 6h16v12H4z" /><path {...common} d="m4 7 8 6 8-6" /></svg>;
    case "instagram":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><rect {...common} x="5" y="5" width="14" height="14" rx="4" /><circle {...common} cx="12" cy="12" r="3.2" /><path {...common} d="M16.4 7.7h.1" /></svg>;
    case "facebook":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M14.4 8.2H13c-.9 0-1.3.5-1.3 1.4v1.5h2.5l-.4 2.4h-2.1V20H9.2v-6.5H7.5v-2.4h1.7V9.3c0-2.3 1.4-3.6 3.5-3.6.8 0 1.4.1 1.7.2v2.3Z" /></svg>;
    case "pinterest":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M10.2 19.5c.4-1.1.9-2.9 1.1-3.7.3.5 1.1.9 2 .9 2.6 0 4.5-2.4 4.5-5.4 0-2.9-2.4-5-5.5-5-3.8 0-5.8 2.6-5.8 5.4 0 1.3.5 2.5 1.5 3 .2.1.4 0 .4-.2l.2-.8c.1-.3 0-.4-.2-.7-.3-.4-.5-.9-.5-1.6 0-1.9 1.5-3.6 4.1-3.6 2.2 0 3.7 1.4 3.7 3.5 0 2.3-1.2 3.9-2.7 3.9-.8 0-1.4-.7-1.2-1.5.2-1 .7-2.1.7-2.8 0-.7-.4-1.2-1.1-1.2-.9 0-1.6.9-1.6 2.2 0 .8.3 1.3.3 1.3s-1 4.1-1.2 4.9c-.2.8-.2 1.6-.1 2.2" /></svg>;
    case "heart":
      return <svg viewBox="0 0 48 48" aria-hidden="true"><path {...common} d="M24 39S9 30.5 9 18.8c0-5.4 6.8-8.6 11.2-4.4L24 18l3.8-3.6C32.2 10.2 39 13.4 39 18.8 39 30.5 24 39 24 39Z" /></svg>;
    case "lamp":
      return <svg viewBox="0 0 48 48" aria-hidden="true"><path {...common} d="M17 20a7 7 0 1 1 14 0c0 4-3 5.8-4.3 8.8h-5.4C20 25.8 17 24 17 20Z" /><path {...common} d="M21 34h6M22 39h4M24 5v4M10 20H6M42 20h-4M13.6 9.6l2.8 2.8M34.4 9.6l-2.8 2.8" /></svg>;
    case "shield":
      return <svg viewBox="0 0 48 48" aria-hidden="true"><path {...common} d="M24 7 37 12v9c0 9.2-5.5 15.7-13 20-7.5-4.3-13-10.8-13-20v-9L24 7Z" /><path {...common} d="m19 24 3.3 3.3L30 19.8" /></svg>;
    case "moon":
      return <svg viewBox="0 0 64 64" aria-hidden="true"><path {...common} d="M40.5 8.5C26.6 11.4 17.7 25 21 38.7c2 8.4 8.3 14.7 16.2 17.2C23.4 58.6 10 49.8 6.9 36.4 3.5 21.7 12.8 7.1 27.5 3.8c4.7-1 9.2-.7 13 1.1v3.6Z" /><path {...common} d="M48 16v8M44 20h8M53 31v6M50 34h6" /></svg>;
    case "crystal":
      return <svg viewBox="0 0 64 64" aria-hidden="true"><path {...common} d="M32 3 48 18 39 59H25L16 18 32 3Z" /><path {...common} d="M16 18h32M32 3v56M24 18l8-15 8 15M25 59l7-41 7 41" /></svg>;
    case "leaf":
      return <svg viewBox="0 0 64 64" aria-hidden="true"><path {...common} d="M17 52c19-4 31-17 34-39-22 3-35 15-39 34" /><path {...common} d="M15 51c9-12 20-22 33-31M25 39l-10-2M34 30l-2-11M42 23l9 1" /></svg>;
    case "sun":
      return <svg viewBox="0 0 64 64" aria-hidden="true"><circle {...common} cx="32" cy="32" r="11" /><path {...common} d="M32 4v10M32 50v10M4 32h10M50 32h10M12.2 12.2l7 7M44.8 44.8l7 7M51.8 12.2l-7 7M19.2 44.8l-7 7" /></svg>;
    case "spark":
      return <svg viewBox="0 0 48 48" aria-hidden="true"><path {...common} d="M24 5v10M24 33v10M5 24h10M33 24h10M14 14l7 7M34 14l-7 7M14 34l7-7M34 34l-7-7" /><circle {...common} cx="24" cy="24" r="5" /></svg>;
    case "envelope-flower":
      return <svg viewBox="0 0 72 72" aria-hidden="true"><path {...common} d="M10 24h52v36H10z" /><path {...common} d="m10 27 26 20 26-20M10 60l20-18M62 60 42 42" /><path {...common} d="M36 10v25M36 18c-8-6-14-2-15 5 7 1 12-1 15-5ZM36 18c8-6 14-2 15 5-7 1-12-1-15-5Z" /><path {...common} d="M36 30c-5-3-10-1-12 4 5 2 9 1 12-4ZM36 30c5-3 10-1 12 4-5 2-9 1-12-4Z" /></svg>;
    default:
      return null;
  }
}
