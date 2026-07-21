const TOKEN_KEY = "token";
const REMEMBERED_EMAIL_KEY = "alieya_admin_email";

export function getAuthToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY);
}

export function storeAuthSession(token: string, remember: boolean, email: string) {
  if (remember) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(REMEMBERED_EMAIL_KEY, email);
    sessionStorage.removeItem(TOKEN_KEY);
    return;
  }

  sessionStorage.setItem(TOKEN_KEY, token);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REMEMBERED_EMAIL_KEY);
}

export function clearAuthToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
}

export function getRememberedEmail() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(REMEMBERED_EMAIL_KEY) ?? "";
}
