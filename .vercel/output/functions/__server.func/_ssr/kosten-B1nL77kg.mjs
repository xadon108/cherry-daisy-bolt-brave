import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as uid, f as useAppStore, l as parseAmount, n as Button, p as useHydrated, r as PageIntro, s as formatEuro, t as AppShell, u as routeLabel } from "./use-hydrated-DjofOuhO.mjs";
import { n as Label, t as Input } from "./label-PaN46YB7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kosten-B1nL77kg.js
var import_jsx_runtime = require_jsx_runtime();
function KostenPage() {
	const hydrated = useHydrated();
	const settings = useAppStore((s) => s.settings);
	const setSettings = useAppStore((s) => s.setSettings);
	const updateRoute = useAppStore((s) => s.updateRoute);
	const resetSettings = useAppStore((s) => s.resetSettings);
	const clearSamples = useAppStore((s) => s.clearSamples);
	const hasSamples = useAppStore((s) => s.trips).some((trip) => trip.id.startsWith("sample-"));
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 rounded-sm bg-ink/5" }) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			kicker: "Onder water",
			title: "Vaste kosten per lijn.",
			children: "Tol België, tol Frankrijk, tankbeurt Luxemburg, dagen op de weg. Deze cijfers trekt de rekenmachine van elke aanvraag af. Pas ze hier aan als de werkelijkheid verschuift."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-10 grid gap-4 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberCard, {
					label: "Dagtarief chauffeur",
					hint: "Loonkosten per dag, inclusief lasten",
					value: settings.driverDayRate,
					onChange: (driverDayRate) => setSettings({ driverDayRate })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberCard, {
					label: "Depotdag",
					hint: "Extra stilstand op de loods",
					value: settings.depotDayCost,
					onChange: (depotDayCost) => setSettings({ depotDayCost })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberCard, {
					label: "Streefmarge",
					hint: "Percentage waarop de tool u wijst",
					value: settings.targetMarginPct,
					suffix: "%",
					onChange: (targetMarginPct) => setSettings({ targetMarginPct })
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "flex flex-col gap-4",
			children: settings.routes.map((route) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteCard, {
				route,
				onChange: (patch) => updateRoute(route.id, patch)
			}, route.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "secondary",
				onClick: resetSettings,
				children: "Kostenblad terugzetten"
			}), hasSamples ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "ghost",
				onClick: clearSamples,
				children: "Voorbeeldritten wissen"
			}) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 max-w-xl text-sm text-warm",
			children: [
				"Spanje via Lyon staat op de gemeten waarden: ",
				formatEuro(56.19),
				" België,",
				" ",
				formatEuro(214.9),
				" Frankrijk Metz–Lyon–grens, ",
				formatEuro(1100),
				" brandstof waarvan ",
				formatEuro(650),
				" Luxemburg, 3,5 dag en 31,5 uur rijden."
			]
		})
	] });
}
function NumberCard({ label, hint, value, suffix, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block rounded-sm border border-ink/10 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-semibold",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block text-sm text-warm",
				children: hint
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-3",
				children: [
					suffix ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-warm",
						children: "€"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: suffix ? "" : "pl-8",
						inputMode: "decimal",
						defaultValue: String(value),
						onBlur: (e) => onChange(parseAmount(e.target.value))
					}),
					suffix ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-warm",
						children: suffix
					}) : null
				]
			})
		]
	});
}
function RouteCard({ route, onChange }) {
	const setToll = (id, patch) => {
		onChange({ tolls: route.tolls.map((toll) => toll.id === id ? {
			...toll,
			...patch
		} : toll) });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-sm border border-ink/10 p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-baseline justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: routeLabel(route)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-warm",
					children: route.hint
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "Dagen",
						value: route.days,
						onChange: (days) => onChange({ days })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "Rij-uren",
						value: route.drivingHours,
						onChange: (drivingHours) => onChange({ drivingHours })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "Brandstof totaal",
						money: true,
						value: route.fuelTotal,
						onChange: (fuelTotal) => onChange({ fuelTotal })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "Waarvan Luxemburg",
						money: true,
						value: route.fuelLuxembourg,
						onChange: (fuelLuxembourg) => onChange({ fuelLuxembourg })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tol" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "ghost",
						onClick: () => onChange({ tolls: [...route.tolls, {
							id: uid(),
							label: "Tol",
							amount: 0
						}] }),
						children: "Tolregel"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: route.tolls.map((toll) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: toll.label,
							onChange: (e) => setToll(toll.id, { label: e.target.value })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-36 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-warm",
								children: "€"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "pl-8",
								inputMode: "decimal",
								defaultValue: String(toll.amount),
								onBlur: (e) => setToll(toll.id, { amount: parseAmount(e.target.value) })
							})]
						})]
					}, toll.id))
				})]
			})
		]
	});
}
function Mini({ label, value, money, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-semibold text-warm",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mt-1",
			children: [money ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-warm",
				children: "€"
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				className: money ? "pl-8" : "",
				inputMode: "decimal",
				defaultValue: String(value),
				onBlur: (e) => onChange(parseAmount(e.target.value))
			})]
		})]
	});
}
//#endregion
export { KostenPage as component };
