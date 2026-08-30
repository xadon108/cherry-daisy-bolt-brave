const euro = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const euroCompact = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const pct = new Intl.NumberFormat("nl-NL", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const num = new Intl.NumberFormat("nl-NL", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatEuro(value: number) {
  if (!Number.isFinite(value)) return "€ 0,00";
  return euro.format(value);
}

export function formatEuroWhole(value: number) {
  if (!Number.isFinite(value)) return "€ 0";
  return euroCompact.format(value);
}

export function formatPct(value: number | null) {
  if (value === null || !Number.isFinite(value)) return "—";
  return `${pct.format(value)}%`;
}

export function formatNumber(value: number) {
  if (!Number.isFinite(value)) return "0";
  return num.format(value);
}

/** Parse Dutch or plain numeric input: 1.650,50 / 1650.50 / 1650 */
export function parseAmount(raw: string): number {
  const trimmed = raw.trim();
  if (!trimmed) return 0;
  const hasComma = trimmed.includes(",");
  const hasDot = trimmed.includes(".");
  let normalized = trimmed.replace(/[^\d,.-]/g, "");
  if (hasComma && hasDot) {
    normalized = normalized.replace(/\./g, "").replace(",", ".");
  } else if (hasComma) {
    normalized = normalized.replace(",", ".");
  }
  const value = Number.parseFloat(normalized);
  return Number.isFinite(value) ? value : 0;
}

export function daysLabel(days: number) {
  const formatted = new Intl.NumberFormat("nl-NL", {
    minimumFractionDigits: days % 1 === 0 ? 0 : 1,
    maximumFractionDigits: 1,
  }).format(days);
  return days === 1 ? "1 dag" : `${formatted} dagen`;
}
