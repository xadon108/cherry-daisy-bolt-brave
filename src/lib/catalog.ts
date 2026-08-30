import type { RouteDef } from "./types";

/**
 * Default cost sheet for a full loop (NL → bestemming → NL).
 * Spanje via Lyon is the measured run: tolls, fuel (incl. Luxembourg) and days
 * come from the owner's figures. Other lines start from that sheet and can be
 * tuned under Kosten.
 */
export const DEFAULT_ROUTES: RouteDef[] = [
  {
    id: "spanje-lyon",
    service: "Linea Spanje",
    via: "Lyon",
    days: 3.5,
    drivingHours: 31.5,
    fuelTotal: 1100,
    fuelLuxembourg: 650,
    tolls: [
      { id: "be", label: "Tol België", amount: 56.19 },
      { id: "fr-lyon", label: "Tol Frankrijk (Metz–Lyon–grens)", amount: 214.9 },
    ],
    hint: "Tarragona, Barcelona, Valencia, Málaga",
  },
  {
    id: "spanje-madrid",
    service: "Linea Spanje",
    via: "Madrid",
    days: 3,
    drivingHours: 27,
    fuelTotal: 1100,
    fuelLuxembourg: 650,
    tolls: [
      { id: "be", label: "Tol België", amount: 56.19 },
      { id: "fr-west", label: "Tol Frankrijk (west, Bordeaux–Irun)", amount: 168.5 },
    ],
    hint: "Madrid, Sevilla, Alicante, Málaga",
  },
  {
    id: "portugal",
    service: "Linea Portugal",
    via: "Salamanca",
    days: 4,
    drivingHours: 36,
    fuelTotal: 1250,
    fuelLuxembourg: 650,
    tolls: [
      { id: "be", label: "Tol België", amount: 56.19 },
      { id: "fr-west", label: "Tol Frankrijk (west)", amount: 168.5 },
      { id: "pt", label: "Tol Portugal", amount: 42 },
    ],
    hint: "Lissabon, Porto, Faro",
  },
  {
    id: "frankrijk",
    service: "Linea Frankrijk",
    via: "Parijs",
    days: 2,
    drivingHours: 16,
    fuelTotal: 480,
    fuelLuxembourg: 0,
    tolls: [
      { id: "be", label: "Tol België", amount: 56.19 },
      { id: "fr", label: "Tol Frankrijk", amount: 95 },
    ],
    hint: "Parijs, Lyon, Marseille, Nice",
  },
  {
    id: "italie",
    service: "Linea Italië",
    via: "Milaan",
    days: 4,
    drivingHours: 34,
    fuelTotal: 1280,
    fuelLuxembourg: 650,
    tolls: [
      { id: "be", label: "Tol België", amount: 56.19 },
      { id: "fr", label: "Tol Frankrijk", amount: 180 },
      { id: "it", label: "Tol Italië", amount: 85 },
    ],
    hint: "Milaan, Turijn, Rome, Florence",
  },
  {
    id: "duitsland",
    service: "Linea Duitsland",
    via: "Keulen",
    days: 1.5,
    drivingHours: 12,
    fuelTotal: 320,
    fuelLuxembourg: 0,
    tolls: [
      { id: "be", label: "Tol België", amount: 56.19 },
      { id: "de", label: "Maut Duitsland", amount: 95 },
    ],
    hint: "Keulen, Frankfurt, München, Hamburg",
  },
  {
    id: "zomerlijn",
    service: "Linea Zomerlijn",
    via: "Lyon",
    days: 3.5,
    drivingHours: 31.5,
    fuelTotal: 1100,
    fuelLuxembourg: 650,
    tolls: [
      { id: "be", label: "Tol België", amount: 56.19 },
      { id: "fr-lyon", label: "Tol Frankrijk (Metz–Lyon–grens)", amount: 214.9 },
    ],
    hint: "Seizoenslijn naar de Spaanse en Franse kust",
  },
  {
    id: "assistance",
    service: "Linea Assistance",
    via: "op afroep",
    days: 1,
    drivingHours: 8,
    fuelTotal: 180,
    fuelLuxembourg: 0,
    tolls: [{ id: "be", label: "Tol België", amount: 56.19 }],
    hint: "Pech, depot, extra stilstand",
  },
];

export const DEFAULT_DRIVER_DAY_RATE = 280;
export const DEFAULT_DEPOT_DAY_COST = 80;
export const DEFAULT_TARGET_MARGIN_PCT = 20;

export function routeLabel(route: RouteDef) {
  if (route.via === "op afroep") return route.service;
  return `${route.service} · via ${route.via}`;
}

export function chipLabel(route: RouteDef) {
  const name = route.service.replace(/^Linea\s+/, "");
  if (route.via === "op afroep") return name;
  return `${name} · ${route.via}`;
}

export function findRoute(routes: RouteDef[], id: string) {
  return routes.find((route) => route.id === id) ?? routes[0];
}
