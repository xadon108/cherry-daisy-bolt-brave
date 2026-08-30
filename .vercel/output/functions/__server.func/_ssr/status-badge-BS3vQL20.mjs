import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as cn, o as findRoute } from "./use-hydrated-DjofOuhO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-badge-BS3vQL20.js
var import_jsx_runtime = require_jsx_runtime();
function sumExtra(lines) {
	return lines.reduce((sum, line) => sum + (Number(line.amount) || 0), 0);
}
function sumTolls(route) {
	return route.tolls.reduce((sum, toll) => sum + (Number(toll.amount) || 0), 0);
}
function expectedCosts(route, settings, extraDepotDays, extraCosts) {
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
		total: fuel + tolls + wage + depot + extra
	};
}
function actualCosts(route, settings, actual) {
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
		tollLines: [{
			id: "actual-tolls",
			label: "Tol (werkelijk)",
			amount: tolls
		}],
		wage,
		days,
		drivingHours: route.drivingHours,
		driverDayRate: Number(settings.driverDayRate) || 0,
		depot,
		extra,
		extraLines: actual.extraCosts,
		total: fuel + tolls + wage + depot + extra
	};
}
function fromBreakdown(outboundRevenue, returnRevenue, costs, targetMarginPct, depotDayCost) {
	const outbound = Number(outboundRevenue) || 0;
	const ret = Number(returnRevenue) || 0;
	const revenue = outbound + ret;
	const profit = revenue - costs.total;
	const marginPct = revenue > 0 ? profit / revenue * 100 : null;
	const target = Math.min(95, Math.max(0, Number(targetMarginPct) || 0)) / 100;
	return {
		revenue,
		outboundRevenue: outbound,
		returnRevenue: ret,
		costs,
		profit,
		marginPct,
		breakEvenRevenue: costs.total,
		returnForTarget: target >= 1 ? 0 : Math.max(0, costs.total / (1 - target) - outbound),
		targetMarginPct: target * 100,
		depotDayImpact: Number(depotDayCost) || 0
	};
}
function calculateExpected(settings, input) {
	const costs = expectedCosts(findRoute(settings.routes, input.routeId), settings, input.extraDepotDays, input.extraCosts);
	return fromBreakdown(input.outboundRevenue, input.returnRevenue, costs, settings.targetMarginPct, settings.depotDayCost);
}
function calculateTrip(settings, trip) {
	return calculateExpected(settings, trip);
}
function calculateActual(settings, trip) {
	if (!trip.actual) return null;
	const costs = actualCosts(findRoute(settings.routes, trip.routeId), settings, trip.actual);
	return fromBreakdown(trip.actual.outboundRevenue, trip.actual.returnRevenue, costs, settings.targetMarginPct, settings.depotDayCost);
}
function marginTone(marginPct, profit) {
	if (profit < 0 || marginPct !== null && marginPct < 0) return "loss";
	if (marginPct === null) return "neutral";
	if (marginPct < 10) return "tight";
	if (marginPct < 20) return "ok";
	return "healthy";
}
function marginLabel(tone) {
	switch (tone) {
		case "loss": return "Verlies";
		case "tight": return "Krap";
		case "ok": return "Net aan";
		case "healthy": return "Gezond";
		default: return "—";
	}
}
var STATUS = {
	aanvraag: "Aanvraag",
	gepland: "Gepland",
	afgerond: "Afgerond"
};
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex h-7 items-center rounded-sm px-2 text-xs font-semibold", status === "aanvraag" && "bg-ivoor text-diep", status === "gepland" && "bg-kobalt text-wit", status === "afgerond" && "bg-diep text-ivoor"),
		children: STATUS[status]
	});
}
function MarginBadge({ marginPct, profit }) {
	const tone = marginTone(marginPct, profit);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex h-7 items-center rounded-sm px-2 text-xs font-semibold", tone === "loss" && "bg-diep text-ivoor", tone === "tight" && "bg-ivoor text-diep", tone === "ok" && "bg-ivoor text-ink", tone === "healthy" && "bg-kobalt text-wit", tone === "neutral" && "bg-ink/5 text-warm"),
		children: marginLabel(tone)
	});
}
//#endregion
export { calculateTrip as a, calculateExpected as i, StatusBadge as n, marginLabel as o, calculateActual as r, marginTone as s, MarginBadge as t };
