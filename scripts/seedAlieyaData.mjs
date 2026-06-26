const BASE_URL = "https://websites-backend-ba3gq.ondigitalocean.app";

const endpoints = {
  login: "/api/users/alieyaUsers/login",
  serviceList: "/api/service/listServices",
  serviceCreate: "/api/service/createService",
  packageList: "/api/pakage/listPackages",
  packageCreate: "/api/pakage/createPackage",
  availabilityList: "/api/availability/listAvailabilitySlots",
  availabilityCreate: "/api/availability/createAvailabilitySlot",
};

const services = [
  ["Consultation Call", 15, "Introductory consultation call to understand your questions and choose the right guidance path."],
  ["Tarot Reading", 33, "Audio/Video Tarot reading for clarity in love, career, choices, and personal growth."],
  ["Archetypal & Psychological Tarot Reading", 44, "Tarot insight blended with psychology, archetypes, self-awareness, and emotional understanding."],
  ["Soul Path Reading", 111, "Deep Soul Path guidance for purpose, life themes, challenges, and next aligned steps."],
  ["Astrology Reading", 88, "Birth chart insight to understand timing, gifts, challenges, relationships, and life themes."],
  ["Two-Year Astrology Forecast", 111, "Two-year astrology forecast for upcoming cycles, opportunities, decisions, and energetic themes."],
  ["Numerology Reading", 44, "Numerology guidance to decode your personal numbers, patterns, timing, and direction. Options from $44 / $77."],
  ["Akashic Records Reading", 188, "Soul-level Akashic Records reading for deeper clarity, healing, and karmic patterns."],
  ["Aura & Chakra Scan", 22, "Aura and chakra scan to understand energetic balance, blocks, and alignment guidance."],
  ["Energy Healing & Spiritual Coaching", 11, "Energy healing and spiritual coaching support for emotional grounding and inner alignment."],
  ["Meditation & Chakra Balancing", 22, "Guided meditation and chakra balancing to restore calm, clarity, and energetic flow."],
  ["Marriage Astrology Reading", 55, "Astrological guidance around marriage themes, timing, partnership patterns, and emotional compatibility."],
  ["Career Astrology Reading", 55, "Career astrology guidance for professional direction, strengths, opportunities, and timing."],
  ["Wealth Astrology Reading", 55, "Astrological insight into wealth patterns, money themes, and supportive financial timing."],
  ["Life Purpose Astrology Reading", 55, "Astrology-based insight into purpose, gifts, soul direction, and aligned next steps."],
  ["Relationship Compatibility Reading", 88, "Relationship compatibility reading for emotional patterns, strengths, challenges, and long-term dynamics."],
  ["Customised Energy Bracelet", 43, "Personalised energy bracelet aligned with your intention and energetic needs."],
  ["Vastu Energy Assessment", 44, "Vastu energy assessment for spatial alignment, energy flow, and practical recommendations."],
  ["Personalised Vastu Remedy Report", 44, "Detailed personalised Vastu remedy report with practical remedies for your space."],
  ["Vastu Bundle", 77, "Vastu bundle including energy assessment and personalised remedy guidance."],
].map(([service_name, charges, description], index) => ({
  service_name,
  charges,
  description,
  image: `${String(service_name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}.jpg`,
  display_order: index + 1,
  status: "active",
}));

const packages = [
  ["5 x 30 Minute Audio Readings", 5, 144, "Five 30 minute audio readings for continued guidance."],
  ["5 x 60 Minute Audio Readings", 5, 222, "Five 60 minute audio readings for deeper exploration."],
  ["5 x 30 Minute Video Readings", 5, 188, "Five 30 minute video readings for focused support."],
  ["5 x 60 Minute Video Readings", 5, 333, "Five 60 minute video readings for in-depth guidance."],
  ["VIP Tarot Package", 10, 555, "10 Personalised Tarot Sessions"],
].map(([package_name, total_sessions, package_price, description], index) => {
  const actualPrice = package_name === "VIP Tarot Package" ? 655 : package_price;
  return {
    package_name,
    total_sessions,
    actual_price: actualPrice,
    package_price,
    savings_amount: actualPrice - package_price,
    validity_months: 12,
    description,
    image: `${String(package_name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}.jpg`,
    display_order: index + 1,
    status: "active",
  };
});

const availabilitySlots = [
  {
    slot_date: "2026-06-25",
    start_time: "10:00:00",
    end_time: "11:00:00",
    status: "available",
    notes: "Morning Tarot Session",
  },
];

async function post(path, payload, token) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    throw new Error(`${path} failed: ${response.status} ${JSON.stringify(data)}`);
  }
  return data;
}

function listFrom(data) {
  if (Array.isArray(data)) return data;
  if (!data || typeof data !== "object") return [];
  if (Array.isArray(data.data)) return data.data;
  if (data.data && typeof data.data === "object") {
    if (Array.isArray(data.data.data)) return data.data.data;
    if (Array.isArray(data.data.list)) return data.data.list;
  }
  if (Array.isArray(data.list)) return data.list;
  if (Array.isArray(data.rows)) return data.rows;
  return [];
}

async function createMissing({ token, listPath, createPath, records, key, label }) {
  const existing = listFrom(await post(listPath, {}, token));
  const existingKeys = new Set(existing.map((item) => String(item[key] ?? "").toLowerCase()));
  let created = 0;
  let skipped = 0;

  for (const record of records) {
    const recordKey = String(record[key] ?? "").toLowerCase();
    if (existingKeys.has(recordKey)) {
      skipped += 1;
      continue;
    }
    await post(createPath, record, token);
    existingKeys.add(recordKey);
    created += 1;
  }

  console.log(`${label}: created ${created}, skipped ${skipped}`);
}

const login = await post(endpoints.login, {
  user_email: "aaliyahjuneja1@gmail.com",
  user_password: "123123",
});

const token = login?.data?.token ?? login?.token ?? login?.data?.data?.token;
if (!token) throw new Error(`Login succeeded but token was not found: ${JSON.stringify(login)}`);

await createMissing({
  token,
  listPath: endpoints.serviceList,
  createPath: endpoints.serviceCreate,
  records: services,
  key: "service_name",
  label: "Services",
});

await createMissing({
  token,
  listPath: endpoints.packageList,
  createPath: endpoints.packageCreate,
  records: packages,
  key: "package_name",
  label: "Packages",
});

const existingSlots = listFrom(await post(endpoints.availabilityList, {}, token));
const existingSlotKeys = new Set(existingSlots.map((slot) => `${slot.slot_date}|${slot.start_time}`));
let createdSlots = 0;
let skippedSlots = 0;
for (const slot of availabilitySlots) {
  const key = `${slot.slot_date}|${slot.start_time}`;
  if (existingSlotKeys.has(key)) {
    skippedSlots += 1;
    continue;
  }
  await post(endpoints.availabilityCreate, slot, token);
  createdSlots += 1;
}
console.log(`Availability: created ${createdSlots}, skipped ${skippedSlots}`);
