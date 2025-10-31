export const promos = {
  SAVE10: { type: "percent", value: 10 },
  FLAT100: { type: "flat", value: 100 }
};

export function validatePromo(code) {
  if (!code) return { valid: false };
  const key = code.trim().toUpperCase();
  if (promos[key]) {
    return { valid: true, code: key, ...promos[key] };
  }
  return { valid: false };
}
