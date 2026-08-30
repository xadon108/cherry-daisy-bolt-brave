import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as formatPct, f as useAppStore, i as cn, o as findRoute, s as formatEuro, u as routeLabel } from "./use-hydrated-DjofOuhO.mjs";
import { a as calculateTrip, n as StatusBadge, r as calculateActual, t as MarginBadge } from "./status-badge-BS3vQL20.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trip-table-CJNlL39W.js
var import_jsx_runtime = require_jsx_runtime();
function formatDate(iso) {
	if (!iso) return "—";
	const date = /* @__PURE__ */ new Date(`${iso}T00:00:00`);
	if (Number.isNaN(date.getTime())) return iso;
	return new Intl.DateTimeFormat("nl-NL", {
		day: "numeric",
		month: "short"
	}).format(date);
}
function TripTable({ limit, status }) {
	const all = useAppStore((s) => s.trips);
	const settings = useAppStore((s) => s.settings);
	const filtered = !status || status === "alle" ? all : all.filter((trip) => trip.status === status);
	const rows = limit ? filtered.slice(0, limit) : filtered;
	if (rows.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-sm border border-ink/10 px-5 py-10 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-semibold",
			children: "Nog geen ritten"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-warm",
			children: "Leg een aanvraag vast vanaf de rekenpagina."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden rounded-sm border border-ink/10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-ink/10",
			children: rows.map((trip) => {
				const expected = calculateTrip(settings, trip);
				const shown = calculateActual(settings, trip) ?? expected;
				const route = findRoute(settings.routes, trip.routeId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/ritten/$id",
					params: { id: trip.id },
					className: "flex flex-col gap-3 px-4 py-4 transition-colors duration-150 hover:bg-ivoor/40 md:flex-row md:items-center md:gap-6 md:px-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: trip.destination
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: trip.status }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarginBadge, {
									marginPct: shown.marginPct,
									profit: shown.profit
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 truncate text-sm text-warm",
							children: [
								trip.customer,
								" · ",
								routeLabel(route),
								" · ",
								formatDate(trip.date)
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "grid grid-cols-3 gap-4 text-right md:w-[22rem]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-warm",
								children: "Opbrengst"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-semibold tabular-nums",
								children: formatEuro(shown.revenue)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-warm",
								children: "Winst"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: cn("font-semibold tabular-nums", shown.profit < 0 ? "text-diep" : "text-ink"),
								children: formatEuro(shown.profit)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-warm",
								children: "Marge"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-semibold tabular-nums",
								children: formatPct(shown.marginPct)
							})] })
						]
					})]
				}) }, trip.id);
			})
		})
	});
}
//#endregion
export { TripTable as t };
