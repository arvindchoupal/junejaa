import { ALIEYA_API_BASE_URL } from "@/lib/alieyaApi";
import { getAuthToken } from "@/lib/authStorage";

export const baseUrl = ALIEYA_API_BASE_URL;

export const CallAPIPostPromise = (path: string, data: Record<string, unknown>) => {
  const token = getAuthToken();

  return fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    const text = await response.text();
    const body = text ? JSON.parse(text) : null;

    if (!response.ok) {
      throw body ?? new Error(`Request failed with ${response.status}`);
    }

    return { data: body };
  });
};
