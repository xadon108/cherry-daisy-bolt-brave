import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as formatPct, f as useAppStore, n as Button, p as useHydrated, r as PageIntro, s as formatEuro, t as AppShell } from "./use-hydrated-DjofOuhO.mjs";
import { a as calculateTrip, r as calculateActual } from "./status-badge-BS3vQL20.mjs";
import { t as TripTable } from "./trip-table-CJNlL39W.mjs";
import { a as Bar, i as CartesianGrid, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ritten-CPIfnt4j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RittenPage() {
	const hydrated = useHydrated();
	const trips = useAppStore((s) => s.trips);
	const settings = useAppStore((s) => s.settings);
	const [filter, setFilter] = (0, import_react.useState)("alle");
	const visible = trips.filter((trip) => filter === "alle" ? true : trip.status === filter);
	const chart = (0, import_react.useMemo)(() => [...trips].slice().reverse().map((trip) => {
		const shown = calculateActual(settings, trip) ?? calculateTrip(settings, trip);
		return {
			name: trip.destination.slice(0, 10),
			marge: Number((shown.marginPct ?? 0).toFixed(1)),
			winst: Math.round(shown.profit)
		};
	}), [trips, settings]);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 rounded-sm bg-ink/5" }) });
	const afgerond = trips.filter((t) => t.status === "afgerond");
	const actualTotals = afgerond.reduce((acc, trip) => {
		const actual = calculateActual(settings, trip);
		const expected = calculateTrip(settings, trip);
		if (actual) {
			acc.actual += actual.profit;
			acc.expected += expected.profit;
		}
		return acc;
	}, {
		actual: 0,
		expected: 0
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			kicker: "Boek",
			title: "Ritten, vooraf en achteraf.",
			children: "Elke aanvraag blijft staan. Na de rit vult u de werkelijke kosten in en ziet u of de marge hield."
		}),
		afgerond.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-6 text-sm text-warm",
			children: [
				"Op ",
				afgerond.length,
				" afgeronde ritten was de verwachte winst",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold text-ink tabular-nums",
					children: formatEuro(actualTotals.expected)
				}),
				", werkelijk",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold text-ink tabular-nums",
					children: formatEuro(actualTotals.actual)
				}),
				". Verschil ",
				formatEuro(actualTotals.actual - actualTotals.expected),
				"."
			]
		}) : null,
		chart.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 h-56 rounded-sm border border-ink/10 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-warm",
				children: "Marge per rit"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "90%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
					data: chart,
					margin: {
						top: 8,
						right: 8,
						left: 0,
						bottom: 0
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
							stroke: "color-mix(in srgb, var(--color-ink) 8%, transparent)",
							vertical: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "name",
							tick: {
								fill: "var(--color-warm)",
								fontSize: 11
							},
							axisLine: false,
							tickLine: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							tick: {
								fill: "var(--color-warm)",
								fontSize: 11
							},
							axisLine: false,
							tickLine: false,
							unit: "%",
							width: 36
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							cursor: { fill: "color-mix(in srgb, var(--color-kobalt) 8%, transparent)" },
							contentStyle: {
								border: "1px solid color-mix(in srgb, var(--color-ink) 12%, transparent)",
								borderRadius: 8,
								fontFamily: "Archivo, sans-serif",
								fontSize: 12
							},
							formatter: (value, name) => name === "marge" ? [`${formatPct(Number(value))}`, "Marge"] : [formatEuro(Number(value)), "Winst"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "marge",
							fill: "var(--color-kobalt)",
							radius: [
								2,
								2,
								0,
								0
							],
							maxBarSize: 36
						})
					]
				})
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1 rounded-sm ring-1 ring-ink/12 p-1",
				children: [
					["alle", "Alle"],
					["aanvraag", "Aanvraag"],
					["gepland", "Gepland"],
					["afgerond", "Afgerond"]
				].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setFilter(key),
					className: filter === key ? "h-9 rounded-sm bg-kobalt px-3 text-sm font-semibold text-wit" : "h-9 rounded-sm px-3 text-sm font-semibold text-ink",
					children: label
				}, key))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: "Nieuwe rit"
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-3 text-sm text-warm",
			children: [
				visible.length,
				" ",
				visible.length === 1 ? "rit" : "ritten"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TripTable, { status: filter })
	] });
}
//#endregion
export { RittenPage as component };
