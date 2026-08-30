import { findRoute } from "./catalog";
import type {
  Actuals,
  CostBreakdown,
  ExtraCost,
  MarginResult,
  RouteDef,
  Settings,
  Trip,
} from "./types";

function sumExtra(lines: ExtraCost[]) {
  return lines.reduce((sum, line) => sum + (Number(line.amount) || 0), 0);
}

function sumTolls(route: RouteDef) {
  return route.tolls.reduce((sum, toll) => sum + (Number(toll.amount) || 0), 0);
}

export function expectedCosts(
  route: RouteDef,
  settings: Settings,
  extraDepotDays: number,
  extraCosts: ExtraCost[],
): CostBreakdown {
  const fuel = Number(route.fuelTotal) || 0;
  const lux = Math.min(Number(route.fuelLuxembourg) || 0, fuel);
  const tolls = sumTolls(route);
  const days = Number(route.days) || 0;
  const wage = days * (Number(settings.driverDayRate) || 0);
  const depot = (Number(extraDepotDays) || 0) * (Number(settings.depotDayCost) || 0);
  const extra = sumExtra(extraCosts);
  return {
    fuel,
    fuelLuxembourg: lux,
    fuelRest: Math.max(0, fuel - lux),
    tolls,
    tollLines: route.tolls,
    wage,
    days,
    drivingHours: Number(route.drivingHours) || 0,
    driverDayRate: Number(settings.driverDayRate) || 0,
    depot,
    extra,
    extraLines: extraCosts,
    total: fuel + tolls + wage + depot + extra,
  };
}

export function actualCosts(
  route: RouteDef,
  settings: Settings,
  actual: Actuals,
): CostBreakdown {
  const fuel = Number(actual.fuel) || 0;
  const lux = Math.min(Number(route.fuelLuxembourg) || 0, fuel);
  const tolls = Number(actual.tolls) || 0;
  const days = Number(actual.wageDays) || 0;
  const wage = days * (Number(settings.driverDayRate) || 0);
  const depot = (Number(actual.depotDays) || 0) * (Number(settings.depotDayCost) || 0);
  const extra = sumExtra(actual.extraCosts);
  return {
    fuel,
    fuelLuxembourg: lux,
    fuelRest: Math.max(0, fuel - lux),
    tolls,
    tollLines: [{ id: "actual-tolls", label: "Tol (werkelijk)", amount: tolls }],
    wage,
    days,
    drivingHours: route.drivingHours,
    driverDayRate: Number(settings.driverDayRate) || 0,
    depot,
    extra,
    extraLines: actual.extraCosts,
    total: fuel + tolls + wage + depot + extra,
  };
}

export function fromBreakdown(
  outboundRevenue: number,
  returnRevenue: number,
  costs: CostBreakdown,
  targetMarginPct: number,
  depotDayCost: number,
): MarginResult {
  const outbound = Number(outboundRevenue) || 0;
  const ret = Number(returnRevenue) || 0;
  const revenue = outbound + ret;
  const profit = revenue - costs.total;
  const marginPct = revenue > 0 ? (profit / revenue) * 100 : null;
  const target = Math.min(95, Math.max(0, Number(targetMarginPct) || 0)) / 100;
  const breakEvenRevenue = costs.total;
  const returnForTarget =
    target >= 1
      ? 0
      : Math.max(0, costs.total / (1 - target) - outbound);
  return {
    revenue,
    outboundRevenue: outbound,
    returnRevenue: ret,
    costs,
    profit,
    marginPct,
    breakEvenRevenue,
    returnForTarget,
    targetMarginPct: target * 100,
    depotDayImpact: Number(depotDayCost) || 0,
  };
}

export function calculateExpected(
  settings: Settings,
  input: {
    routeId: string;
    outboundRevenue: number;
    returnRevenue: number;
    extraDepotDays: number;
    extraCosts: ExtraCost[];
  },
): MarginResult {
  const route = findRoute(settings.routes, input.routeId);
  const costs = expectedCosts(
    route,
    settings,
    input.extraDepotDays,
    input.extraCosts,
  );
  return fromBreakdown(
    input.outboundRevenue,
    input.returnRevenue,
    costs,
    settings.targetMarginPct,
    settings.depotDayCost,
  );
}

export function calculateTrip(settings: Settings, trip: Trip): MarginResult {
  return calculateExpected(settings, trip);
}

export function calculateActual(settings: Settings, trip: Trip): MarginResult | null {
  if (!trip.actual) return null;
  const route = findRoute(settings.routes, trip.routeId);
  const costs = actualCosts(route, settings, trip.actual);
  return fromBreakdown(
    trip.actual.outboundRevenue,
    trip.actual.returnRevenue,
    costs,
    settings.targetMarginPct,
    settings.depotDayCost,
  );
}

export function marginTone(marginPct: number | null, profit: number) {
  if (profit < 0 || (marginPct !== null && marginPct < 0)) return "loss" as const;
  if (marginPct === null) return "neutral" as const;
  if (marginPct < 10) return "tight" as const;
  if (marginPct < 20) return "ok" as const;
  return "healthy" as const;
}

export function marginLabel(tone: ReturnType<typeof marginTone>) {
  switch (tone) {
    case "loss":
      return "Verlies";
    case "tight":
      return "Krap";
    case "ok":
      return "Net aan";
    case "healthy":
      return "Gezond";
    default:
      return "—";
  }
}
