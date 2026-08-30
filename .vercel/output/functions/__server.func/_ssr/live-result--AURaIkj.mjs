import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as daysLabel, c as formatPct, i as cn, s as formatEuro } from "./use-hydrated-DjofOuhO.mjs";
import { o as marginLabel, s as marginTone } from "./status-badge-BS3vQL20.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/live-result--AURaIkj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("field flex min-h-24 w-full rounded-sm bg-wit px-3 py-2.5 text-base text-ink transition-[box-shadow] duration-150 placeholder:text-warm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
function Row({ label, value, hint, muted }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between gap-4 py-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("text-sm", muted ? "text-ivoor/70" : "text-ivoor"),
				children: label
			}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-ivoor/55",
				children: hint
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shrink-0 tabular-nums text-sm font-semibold text-ivoor",
			children: value
		})]
	});
}
function LiveResult({ result, destination }) {
	const tone = marginTone(result.marginPct, result.profit);
	const width = Math.min(100, Math.max(0, result.marginPct ?? 0));
	const loss = result.profit < 0;
	const title = destination?.trim() ? `Marge naar ${destination.trim()}` : "Live winst en marge";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "rounded-sm bg-diep p-5 text-ivoor md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.18em] text-ivoor/60",
				children: "Onder aan de streep"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 text-xl font-semibold text-balance text-ivoor",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-sm bg-wit/6 px-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-ivoor/60",
						children: "Totale opbrengst"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-lg font-semibold tabular-nums text-ivoor",
						children: formatEuro(result.revenue)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-sm bg-wit/6 px-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-ivoor/60",
						children: "Totale kosten"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-lg font-semibold tabular-nums text-ivoor",
						children: formatEuro(result.costs.total)
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 border-t border-ivoor/15 pt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-ivoor/60",
						children: "Netto winst"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("mt-1 font-semibold tabular-nums tracking-tight text-ivoor", "text-3xl md:text-4xl"),
						children: formatEuro(result.profit)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-flex h-7 items-center rounded-sm bg-ivoor px-2 text-xs font-semibold text-diep",
						children: marginLabel(tone)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between text-xs text-ivoor/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Winstmarge" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums font-semibold text-ivoor",
							children: formatPct(result.marginPct)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 h-1.5 overflow-hidden rounded-sm bg-wit/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-sm bg-ivoor transition-[width] duration-200 ease-out",
							style: { width: loss ? "0%" : `${width}%` }
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 border-t border-ivoor/15 pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-ivoor/55",
						children: "Kosten onder water"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Brandstof",
						value: formatEuro(result.costs.fuel),
						hint: result.costs.fuelLuxembourg > 0 ? `Inclusief tankbeurt Luxemburg ${formatEuro(result.costs.fuelLuxembourg)}` : void 0
					}),
					result.costs.tollLines.map((toll) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: toll.label,
						value: formatEuro(toll.amount),
						muted: true
					}, toll.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Loonkosten chauffeur",
						value: formatEuro(result.costs.wage),
						hint: `${daysLabel(result.costs.days)} · ${formatEuro(result.costs.driverDayRate)} per dag · ${formatNumberHours(result.costs.drivingHours)} rijden`
					}),
					result.costs.depot > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Extra depotdagen",
						value: formatEuro(result.costs.depot),
						hint: `${daysLabel(result.costs.depot / (result.depotDayImpact || 1))} op de loods`
					}) : null,
					result.costs.extraLines.map((line) => line.amount ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: line.label || "Extra kosten",
						value: formatEuro(line.amount),
						muted: true
					}, line.id) : null)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Insight, { result })
		]
	});
}
function formatNumberHours(hours) {
	return `${new Intl.NumberFormat("nl-NL", {
		minimumFractionDigits: hours % 1 === 0 ? 0 : 1,
		maximumFractionDigits: 1
	}).format(hours)} uur`;
}
function Insight({ result }) {
	const target = result.targetMarginPct;
	const needed = result.returnForTarget;
	if (result.revenue === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-6 text-sm leading-relaxed text-ivoor/80",
		children: "Vul de omzet van de klant in. De kosten van de lijn staan al klaar."
	});
	if (result.profit < 0 && result.returnRevenue === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-6 text-sm leading-relaxed text-ivoor/80",
		children: [
			"Lege retour: deze rit staat op ",
			formatEuro(result.profit),
			". Voor",
			" ",
			formatPct(target),
			" marge is ",
			formatEuro(needed),
			" retouromzet nodig."
		]
	});
	if (result.profit < 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-6 text-sm leading-relaxed text-ivoor/80",
		children: [
			"De kosten liggen ",
			formatEuro(Math.abs(result.profit)),
			" boven de opbrengst. Break-even zit op ",
			formatEuro(result.breakEvenRevenue),
			"."
		]
	});
	if ((result.marginPct ?? 0) < target && result.returnRevenue === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-6 text-sm leading-relaxed text-ivoor/80",
		children: [
			"Heen alleen houdt ",
			formatEuro(result.profit),
			" over. Nog ",
			formatEuro(needed),
			" ",
			"retour brengt u op ",
			formatPct(target),
			" marge."
		]
	});
	if ((result.marginPct ?? 0) < target) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-6 text-sm leading-relaxed text-ivoor/80",
		children: [
			"Winst ",
			formatEuro(result.profit),
			", onder uw streefmarge van ",
			formatPct(target),
			". Break-even was ",
			formatEuro(result.breakEvenRevenue),
			"."
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-6 text-sm leading-relaxed text-ivoor/80",
		children: [
			"Deze rit houdt ",
			formatEuro(result.profit),
			" over, ",
			formatPct(result.marginPct),
			" ",
			"marge. Streefmarge ",
			formatPct(target),
			" is gehaald."
		]
	});
}
//#endregion
export { Textarea as n, LiveResult as t };
