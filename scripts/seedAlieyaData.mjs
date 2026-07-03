const BASE_URL = "https://websites-backend-ba3gq.ondigitalocean.app";

const endpoints = {
  login: "/api/users/alieyaUsers/login",
  serviceList: "/api/service/listServices",
  serviceCreate: "/api/service/createService",
  packageList: "/api/pakage/listPackages",
  packageCreate: "/api/pakage/createPackage",
  availabilityList: "/api/availability/listAvailabilitySlots",
  availabilityCreate: "/api/availability/createAvailabilitySlot",
  testimonialList: "/api/testimonial/listTestimonials",
  testimonialCreate: "/api/testimonial/createTestimonial",
};

const testimonialTexts = [
  "I'm so grateful for your reading! The accuracy and depth of your insights amazed me. Your words gave me reassurance and a clear direction to move forward. You have a true gift, Alieya!",
  "Thank you so much for your readings. It was such a great help. It is just like getting a reflection of my thoughts; whatever the situation was, you interpreted it so correctly. I would surely recommend you to my friends and family.",
  "Thank you, Alieya, for a wonderful session. I got a lot of clarity and hopefully will have a better turnout to things now. Thank you so much.",
  "Honestly, I didn't know what to expect, but Alieya blew me away. Her reading was spot on, and she gave me the clarity I'd been looking for. Highly recommend her to anyone needing a little guidance!",
  "Every time I get a reading from Alieya, I feel like she's reading my mind. The way she explains the cards is so relatable, and it's like she just gets it. I've gained so much clarity from her, and I'm really grateful for her guidance.",
  "Alieya, you just know. Your reading was so spot on and so healing. I feel clear. I cried in the best way possible. Thank you. Let's do a session again soon.",
  "This reading was like a mirror to my soul. What I appreciate most about your reading is your honesty. You don't sugarcoat things but deliver messages with kindness and understanding. Your intuitive guidance has helped me through some challenging moments. Thank you so much for all the help.",
  "After the Soul Path session with you, it felt like talking to someone who just gets it. Everything you said made sense and connected so deeply. It felt personal, comforting, and real. After the session I felt lighter, more clear, and like I just got a warm pep talk from the universe. Highly recommend if you're looking for something honest and soulful.",
  "Thank you so much for doing all these readings for me. They are super helpful and always end up being true. You have guided me throughout my studies and applying for law school, which has given me a sense of support. I find the readings interesting and fun, and I can ask almost anything and get an answer.",
  "Alieya is amazing at what she does. Her readings aren't just accurate—she actually makes you feel seen and understood. She's helped me work through so much, and I'm genuinely in a better place because of her.",
  "The reading session with Alieya was such a beautiful experience! Her intuition is spot on, and she delivers messages with so much warmth and clarity. She created a safe space where I felt heard, guided, and understood. I can't wait for another reading!",
  "Best decision for me to discuss with you. It actually helped me and the crystals are really amazing. I feel more positive nowadays and am moving towards my goals, all thanks to you.",
  "Alieya's intuition is spot-on! Her reading helped me see things from a fresh perspective and gave me a deeper understanding of my life's purpose. I'm forever grateful for her guidance and support!",
  "I've had several readings with Alieya, and each session has been eye-opening and incredibly meaningful. She has an amazing ability to tune into what's going on in my life, and every reading feels so personal and accurate. I always leave feeling clearer, more grounded, and with a fresh perspective.",
  "I had a wonderful tarot session with you, and it was absolutely spot on. All the doubts I had regarding my career and life in general were answered with such clarity. The simple remedies you suggested were truly helpful. It was a fantastic experience, and I'll definitely be connecting with you again.",
  "I had an incredible experience with Alieya's tarot reading. Her insights were thoughtful, intuitive, and deeply resonant. The reading gave me clarity on my situation and left me feeling more aligned and hopeful. I highly recommend a session with her!",
  "I had a relationship reading with Alieya, and it was so on point! She described my feelings and circumstances with such accuracy, and her advice was gentle yet empowering. It gave me a lot to think about and helped me see my path more clearly.",
  "Thank you so much for the reading. It gave me a lot to think about and helped me see things from a different perspective. The cards picked up on so much of what I've been feeling lately, and the guidance was exactly what I needed to hear. I felt understood, hopeful, and empowered.",
  "I was blown away by how spot-on your reading was. The way you interpreted the cards and connected them to my situation was so insightful. I'm taking your advice to heart, and I'm already feeling a shift in perspective. Truly grateful!",
  "Not everything you say clicks for me instantly, but later it always makes sense! I've noticed that about your readings—they are so real and honest. They stay with me.",
  "Thank you so much for the reading. I honestly didn't know what to expect, but you really surprised me with how accurate and spot-on everything was. Your guidance gave me a lot of clarity, and I appreciate how kind and understanding you were throughout.",
  "I was feeling stuck and unsure about a decision, but Alieya's reading gave me the clarity I needed. She explained the cards in a way that was easy to understand and helped me trust my own intuition. I'm so grateful for her guidance!",
  "Thank you so much for the insightful reading, Alieya! Your guidance and expertise helped me see things in a new light. I appreciate your kindness and compassion, and I feel empowered to make positive changes in my life.",
  "Your reading really resonated with me on a deep level. It felt like you understood my situation without me even having to say much. I'm feeling more at peace and hopeful now. Thank you for your beautiful energy!",
  "You said I'd meet someone around mid-March with specific features and in a work-related place. Recently, I met someone exactly like that. It honestly caught me off guard, and the connection has been going really well. It made me think back to everything you said—it really stayed with me.",
  "That reading with you was just wow. I didn't even have to say much and you were literally saying things that were actually happening. It was shocking how you picked up on things I'd only thought about. You explained it all and it made so much sense.",
  "You have a very calming presence. The way you did the reading didn't feel like a typical session; it felt personal. You said a few things that stayed with me even after the call ended. Very thoughtful and mature energy. I feel inspired by you.",
  "It was a really insightful session, and I truly felt that you cared about what I was going through. Your presence was powerful, your energy was comforting, and the guidance resonated deeply with me. I walked away feeling more grounded and at peace.",
  "Alieya truly has a gift. She made me feel so comfortable and really listened. The reading was insightful and encouraging—exactly what I needed to hear. I'm still thinking about it! Truly magical and surprising!",
  "I am so glad that I did the healings. I definitely feel a change in my overall wellbeing. I'm not feeling anxiety like I did before, I'm sleeping well and on time, and I feel calmer and less tired. I would love to continue these healings.",
  "My Soul Path reading helped me understand patterns, fears, and karmas I've been carrying. I walked away feeling lighter, understood, and genuinely more connected to myself. It wasn't just a reading; it was something really healing. Thank you for guiding me back to myself.",
  "If you're thinking about getting a reading, just do it. Alieya's energy is so calming, and she has this way of explaining things that makes everything click. She's helped me see the bigger picture and trust myself more. So very grateful to you!",
  "It was way more than I expected. I thought it would just be a quick insight, but it actually gave me clarity on something I've been stuck on. I felt like you really understood where I was coming from without me saying too much. Thank you so much!",
  "I've always been skeptical about tarot card readings, but you completely changed my perspective. Your reading was exceptionally accurate and incredibly genuine. The clarity and depth with which you explain everything is remarkable. I left feeling more at peace and enlightened.",
  "Thank you for being a mirror for me. I think I finally understood what you were trying to show me, even in the last few readings. Thank you for sticking through it with me and being patient. Really grateful.",
  "After talking to you, I felt so light, like a big weight got lifted. You got me and made me feel heard, seen, and validated. It felt like you were reading my heart, not just cards. I'm really grateful—keep doing this amazing work!",
  "I've had many tarot readings before, but none like this. Your approach was so grounded and real, yet magical at the same time. You gave me a roadmap to follow, and I finally feel like I'm on the right path!",
  "Everything you said clicked, like you saw right through the chaos in my head and knew exactly what needed to be heard. You made me feel calm, safe, and understood. You gave me clarity on things I'd been carrying for too long, and I still feel lighter because of that session.",
  "Thank you, dearest Alieya, for the wonderful and amazing reading. You were spot on and your predictions did come true! I will definitely recommend you to friends and family. Wish you all the best. Luck and light.",
];

const testimonials = testimonialTexts.map((testimonial, index) => ({
  client_name: `Verified Client ${String(index + 1).padStart(2, "0")}`,
  client_country: "Worldwide",
  client_image: "",
  testimonial_type: "text",
  video_url: "",
  rating: 5,
  testimonial,
  display_order: index + 1,
  status: "active",
}));

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

if (process.argv.includes("--check-public-testimonials")) {
  try {
    const publicData = await post(endpoints.testimonialList, {});
    console.log(`Public testimonials available: ${listFrom(publicData).length}`);
  } catch (error) {
    console.error(`Public testimonials unavailable: ${error.message}`);
    process.exitCode = 1;
  }
  process.exit();
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
  listPath: endpoints.testimonialList,
  createPath: endpoints.testimonialCreate,
  records: testimonials,
  key: "testimonial",
  label: "Testimonials",
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
