const TOKEN_KEY = "access_token";

export function setToken(token) {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function isAuthenticated() {
  return !!getToken();
}

export async function authenticateUser(user, password) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName: user, password }),
  });

  const data = await res.json();

  if (res.status === 200 && data.token) {
    setToken(data.token);
    return true;
  } else {
    throw new Error(data.message || "Unable to authenticate");
  }
}

export async function registerUser(user, password, password2) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName: user, password, password2 }),
  });

  const data = await res.json();

  if (res.status === 200) {
    return true;
  } else {
    throw new Error(data.message || "Unable to register");
  }
}
