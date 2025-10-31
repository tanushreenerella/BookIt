export const API_BASE = "https://bookit-q1so.onrender.com/api"; // backend URL

export async function fetchExperiences() {
  const res = await fetch(`${API_BASE}/experiences`);
  if (!res.ok) throw new Error("Failed to fetch experiences");
  return res.json();
}

export async function fetchExperienceById(id: string) {
  const res = await fetch(`${API_BASE}/experiences/${id}`);
  if (!res.ok) throw new Error("Experience not found");
  return res.json();
}

export async function createBooking(data: any) {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create booking");
  return res.json();
}
export async function validatePromo(code: string) {
  const res = await fetch(`${API_BASE}/promo/${code}`);
  return res.json();
}
