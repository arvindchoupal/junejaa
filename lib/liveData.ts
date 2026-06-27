import { alieyaApiRoutes, extractList, postAlieyaApiServer } from "./alieyaApi";

export type PublicService = {
  id: number;
  icon: string;
  name: string;
  price: number;
  priceLabel: string;
  description: string;
  category: string;
};

export type PublicPackage = {
  id: number;
  name: string;
  totalSessions: number;
  actualPrice: number;
  packagePrice: number;
  savings: number;
  validityMonths: number;
  description: string;
};

const serviceIconMap: Record<string, string> = {
  tarot: "crystal",
  astrology: "sun",
  numerology: "lamp",
  vastu: "shield",
  energy: "leaf",
  chakra: "leaf",
  aura: "spark",
  soul: "spark",
  relationship: "heart",
  bracelet: "crystal",
  consultation: "moon",
};

function text(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function number(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function isActiveRow(row: Record<string, unknown>) {
  const status = row.status ?? row.is_active ?? row.isActive;

  if (status === undefined || status === null || status === "") return true;
  if (typeof status === "boolean") return status;
  if (typeof status === "number") return status === 1;

  return ["active", "1", "true", "enabled"].includes(String(status).trim().toLowerCase());
}

function inferCategory(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("tarot")) return "Tarot";
  if (lower.includes("astrology") || lower.includes("forecast") || lower.includes("marriage") || lower.includes("career") || lower.includes("wealth")) return "Astrology";
  if (lower.includes("numerology")) return "Numerology";
  if (lower.includes("vastu")) return "Vastu";
  if (lower.includes("energy") || lower.includes("chakra") || lower.includes("aura")) return "Energy";
  if (lower.includes("relationship")) return "Relationship";
  if (lower.includes("bracelet")) return "Remedy";
  if (lower.includes("soul") || lower.includes("akashic")) return "Soul Path";
  return "Consultation";
}

function inferIcon(name: string) {
  const lower = name.toLowerCase();
  const match = Object.entries(serviceIconMap).find(([key]) => lower.includes(key));
  return match?.[1] ?? "spark";
}

export function mapService(row: Record<string, unknown>, index = 0): PublicService {
  const name = text(row.service_name ?? row.name, `Service ${index + 1}`);
  const price = number(row.charges ?? row.price, 0);
  return {
    id: number(row.id, index + 1),
    icon: inferIcon(name),
    name,
    price,
    priceLabel: price ? `$${price}` : "Price on request",
    description: text(row.description, ""),
    category: inferCategory(name),
  };
}

export function mapPackage(row: Record<string, unknown>, index = 0): PublicPackage {
  return {
    id: number(row.id, index + 1),
    name: text(row.package_name ?? row.name, `Package ${index + 1}`),
    totalSessions: number(row.total_sessions, 0),
    actualPrice: number(row.actual_price, 0),
    packagePrice: number(row.package_price, 0),
    savings: number(row.savings_amount, 0),
    validityMonths: number(row.validity_months, 0),
    description: text(row.description, ""),
  };
}

export async function getLiveServices(): Promise<PublicService[]> {
  try {
    const data = await postAlieyaApiServer(alieyaApiRoutes.service.list, {});
    const rows = extractList(data);
    if (rows.length) return rows.filter(isActiveRow).map(mapService).filter((item) => item.name);
  } catch {
  }

  return [];
}

export async function getLivePackages(): Promise<PublicPackage[]> {
  try {
    const data = await postAlieyaApiServer(alieyaApiRoutes.package.list, {});
    const rows = extractList(data);
    if (rows.length) return rows.filter(isActiveRow).map(mapPackage).filter((item) => item.name);
  } catch {
  }

  return [];
}
