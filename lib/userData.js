import { getToken } from "./authenticate";

async function fetchWithAuth(url, options = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    Authorization: `JWT ${token}`,
  };

  const res = await fetch(url, { ...options, headers });

  if (res.status === 200) {
    return res.json();
  } else {
    return [];
  }
}

export async function addToFavourites(id) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`;
  return await fetchWithAuth(url, { method: "PUT" });
}

export async function removeFromFavourites(id) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`;
  return await fetchWithAuth(url, { method: "DELETE" });
}

export async function getFavourites() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites`;
  return await fetchWithAuth(url, { method: "GET" });
}
