export const ALIEYA_API_BASE_URL =
  "https://websites-backend-ba3gq.ondigitalocean.app";

export const alieyaApiRoutes = {
  users: "/api/users/alieyaUsers",
  service: {
    base: "/api/service",
    create: "/api/service/createService",
    update: "/api/service/updateService",
    delete: "/api/service/deleteService",
    list: "/api/service/listServices",
  },
  booking: {
    base: "/api/booking",
    create: "/api/booking/createBooking",
    update: "/api/booking/updateBooking",
    delete: "/api/booking/deleteBooking",
    list: "/api/booking/listBookings",
  },
  package: {
    base: "/api/pakage",
    create: "/api/pakage/createPackage",
    update: "/api/pakage/updatePackage",
    delete: "/api/pakage/deletePackage",
    list: "/api/pakage/listPackages",
  },
  payment: {
    base: "/api/payment",
    create: "/api/payment/createPayment",
    update: "/api/payment/updatePayment",
    delete: "/api/payment/deletePayment",
    list: "/api/payment/listPayments",
  },
  testimonial: {
    base: "/api/testimonial",
    create: "/api/testimonial/createTestimonial",
    update: "/api/testimonial/updateTestimonial",
    delete: "/api/testimonial/deleteTestimonial",
    list: "/api/testimonial/listTestimonials",
  },
  availability: {
    base: "/api/availability",
    create: "/api/availability/createAvailabilitySlot",
    update: "/api/availability/updateAvailabilitySlot",
    delete: "/api/availability/deleteAvailabilitySlot",
    list: "/api/availability/listAvailabilitySlots",
  },
} as const;

export function getAlieyaApiUrl(path: string) {
  return new URL(path, ALIEYA_API_BASE_URL).toString();
}

export async function postAlieyaApi<TPayload extends Record<string, unknown>>(
  path: string,
  payload: TPayload,
) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const response = await fetch(getAlieyaApiUrl(path), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(data?.message ?? `Request failed with ${response.status}`);
  }

  return data;
}

export async function postAlieyaApiServer<TPayload extends Record<string, unknown>>(
  path: string,
  payload: TPayload,
  token?: string,
) {
  const response = await fetch(getAlieyaApiUrl(path), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(data?.message ?? `Request failed with ${response.status}`);
  }

  return data;
}

export function extractList(data: unknown): Record<string, unknown>[] {
  if (Array.isArray(data)) return data as Record<string, unknown>[];
  if (!data || typeof data !== "object") return [];

  const source = data as Record<string, unknown>;
  for (const key of ["data", "list", "result", "rows"]) {
    const value = source[key];
    if (Array.isArray(value)) return value as Record<string, unknown>[];
  }

  if (source.data && typeof source.data === "object") {
    const nested = source.data as Record<string, unknown>;
    for (const key of ["data", "list", "result", "rows"]) {
      const value = nested[key];
      if (Array.isArray(value)) return value as Record<string, unknown>[];
    }
  }

  return [];
}
