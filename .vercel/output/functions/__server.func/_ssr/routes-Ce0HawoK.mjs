import { v as Link, x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Minus, i as Plus, n as Trash2 } from "../_libs/lucide-react.mjs";
import { a as daysLabel, c as formatPct, f as useAppStore, i as cn, l as parseAmount, n as Button, p as useHydrated, r as PageIntro, s as formatEuro, t as AppShell, u as routeLabel } from "./use-hydrated-DjofOuhO.mjs";
import { n as Label, t as Input } from "./label-PaN46YB7.mjs";
import { a as calculateTrip, i as calculateExpected, r as calculateActual } from "./status-badge-BS3vQL20.mjs";
import { t as TripTable } from "./trip-table-CJNlL39W.mjs";
import { n as Textarea, t as LiveResult } from "./live-result--AURaIkj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Ce0HawoK.js
var import_jsx_runtime = require_jsx_runtime();
function CalculatorForm() {
	const draft = useAppStore((s) => s.draft);
	const settings = useAppStore((s) => s.settings);
	const setDraft = useAppStore((s) => s.setDraft);
	const addExtraCost = useAppStore((s) => s.addExtraCost);
	const updateExtraCost = useAppStore((s) => s.updateExtraCost);
	const removeExtraCost = useAppStore((s) => s.removeExtraCost);
	const route = settings.routes.find((item) => item.id === draft.routeId) ?? settings.routes[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Bestemming" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 mb-3 text-sm text-warm",
					children: "Kies de lijn. De kosten vullen zichzelf in."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: settings.routes.map((item) => {
						const active = item.id === draft.routeId;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setDraft({ routeId: item.id }),
							className: cn("h-11 rounded-sm px-3 text-left text-sm font-semibold transition-colors duration-150", active ? "bg-kobalt text-wit" : "bg-wit text-ink ring-1 ring-ink/12 hover:ring-ink/30"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block leading-tight",
								children: item.service
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: cn("block text-xs font-normal", active ? "text-wit/80" : "text-warm"),
								children: ["via ", item.via]
							})]
						}, item.id);
					})
				}),
				route ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-warm",
					children: [
						routeLabel(route),
						" · ",
						daysLabel(route.days),
						" · ",
						route.drivingHours,
						" uur rijden · brandstof",
						" ",
						formatEuro(route.fuelTotal),
						route.hint ? ` · ${route.hint}` : ""
					]
				}) : null
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Plaats",
						hint: "Waar de auto naartoe moet",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: draft.destination,
							onChange: (e) => setDraft({ destination: e.target.value }),
							placeholder: "Tarragona",
							autoComplete: "off"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Klant of kenmerk",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: draft.customer,
							onChange: (e) => setDraft({ customer: e.target.value }),
							placeholder: "Naam of kenteken",
							autoComplete: "off"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Datum rit",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: draft.date,
							onChange: (e) => setDraft({ date: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Wat de klant betaalt",
						hint: "Omzet heen",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-warm",
								children: "€"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								inputMode: "decimal",
								className: "pl-8",
								value: draft.outboundRevenue,
								onChange: (e) => setDraft({ outboundRevenue: e.target.value }),
								placeholder: "0,00"
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Retour" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-warm",
					children: "Enkele reis, of iets mee terug."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex rounded-sm ring-1 ring-ink/12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setDraft({
							hasReturn: false,
							returnRevenue: ""
						}),
						className: cn("h-11 px-4 text-sm font-semibold", !draft.hasReturn ? "bg-kobalt text-wit" : "bg-wit text-ink"),
						children: "Enkele reis"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setDraft({ hasReturn: true }),
						className: cn("h-11 px-4 text-sm font-semibold", draft.hasReturn ? "bg-kobalt text-wit" : "bg-wit text-ink"),
						children: "Met retour"
					})]
				})]
			}), draft.hasReturn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 max-w-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Retouromzet",
					hint: "Wat u terug verdient op dezelfde rit",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-warm",
							children: "€"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							inputMode: "decimal",
							className: "pl-8",
							value: draft.returnRevenue,
							onChange: (e) => setDraft({ returnRevenue: e.target.value }),
							placeholder: "0,00"
						})]
					})
				})
			}) : null] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Extra dagen op het depot" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 mb-3 text-sm text-warm",
					children: [
						"Depannage of wachten. Elke dag kost ",
						formatEuro(settings.depotDayCost),
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "secondary",
							size: "icon",
							"aria-label": "Een dag minder",
							onClick: () => setDraft({ extraDepotDays: Math.max(0, draft.extraDepotDays - 1) }),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-16 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-semibold tabular-nums",
								children: draft.extraDepotDays
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-warm",
								children: "dagen"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "secondary",
							size: "icon",
							"aria-label": "Een dag extra",
							onClick: () => setDraft({ extraDepotDays: draft.extraDepotDays + 1 }),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {})
						})
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Overige kosten" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-warm",
					children: "Wachturen, veer, extra chauffeur."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "secondary",
					size: "sm",
					onClick: addExtraCost,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Regel"]
				})]
			}), draft.extraCosts.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 flex flex-col gap-2",
				children: draft.extraCosts.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "flex-1",
							placeholder: "Omschrijving",
							value: line.label,
							onChange: (e) => updateExtraCost(line.id, { label: e.target.value })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-32 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-warm",
								children: "€"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								inputMode: "decimal",
								className: "pl-8",
								value: line.amount ? String(line.amount) : "",
								onChange: (e) => updateExtraCost(line.id, { amount: Number.parseFloat(e.target.value.replace(",", ".")) || 0 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon",
							"aria-label": "Regel verwijderen",
							onClick: () => removeExtraCost(line.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
						})
					]
				}, line.id))
			}) : null] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Notitie",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: draft.notes,
					onChange: (e) => setDraft({ notes: e.target.value }),
					placeholder: "Kenteken, ophaaladres, bijzonderheden",
					rows: 3
				})
			}) })
		]
	});
}
function Field({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-semibold text-ink",
				children: label
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-0.5 block text-sm text-warm",
				children: hint
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2",
				children
			})
		]
	});
}
function resultFor(trip, settings) {
	return calculateActual(settings, trip) ?? calculateTrip(settings, trip);
}
function KpiRow() {
	const trips = useAppStore((s) => s.trips);
	const settings = useAppStore((s) => s.settings);
	const totals = trips.reduce((acc, trip) => {
		const result = resultFor(trip, settings);
		acc.revenue += result.revenue;
		acc.costs += result.costs.total;
		acc.profit += result.profit;
		return acc;
	}, {
		revenue: 0,
		costs: 0,
		profit: 0
	});
	const margin = totals.revenue > 0 ? totals.profit / totals.revenue * 100 : null;
	const open = trips.filter((trip) => trip.status !== "afgerond").length;
	const items = [
		{
			label: "Opbrengst in het boek",
			value: formatEuro(totals.revenue)
		},
		{
			label: "Kosten",
			value: formatEuro(totals.costs)
		},
		{
			label: "Netto winst",
			value: formatEuro(totals.profit)
		},
		{
			label: "Gemiddelde marge",
			value: formatPct(margin)
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-ink/10 md:grid-cols-4",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-wit px-4 py-4 md:px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-warm",
					children: item.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-xl font-semibold tabular-nums tracking-tight md:text-2xl",
					children: item.value
				})]
			}, item.label))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-warm",
			children: trips.length === 0 ? "Nog geen ritten vastgelegd." : `${trips.length} ritten in het boek, waarvan ${open} nog open.`
		})]
	});
}
function Home() {
	const hydrated = useHydrated();
	const navigate = useNavigate();
	const draft = useAppStore((s) => s.draft);
	const settings = useAppStore((s) => s.settings);
	const saveDraft = useAppStore((s) => s.saveDraft);
	const resetDraft = useAppStore((s) => s.resetDraft);
	const trips = useAppStore((s) => s.trips);
	const result = calculateExpected(settings, {
		routeId: draft.routeId,
		outboundRevenue: parseAmount(draft.outboundRevenue),
		returnRevenue: draft.hasReturn ? parseAmount(draft.returnRevenue) : 0,
		extraDepotDays: draft.extraDepotDays,
		extraCosts: draft.extraCosts
	});
	function save(status) {
		const id = saveDraft(status);
		navigate({
			to: "/ritten/$id",
			params: { id }
		});
	}
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 rounded-sm bg-ink/5" }) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			kicker: "LINEA Marge",
			title: "Reken de rit voordat u ja zegt.",
			children: "Bestemming, omzet, retour. De tol, brandstof en loonkosten gaan er onder water af. U ziet direct wat er overblijft."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiRow, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-sm border border-ink/10 p-5 md:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-semibold",
						children: "Nieuwe aanvraag"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 mb-6 text-sm text-warm",
						children: "Een auto naar Spanje terwijl de klant vliegt. Of een volle lijn. Typ de omzet, de rest rekent zichzelf."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalculatorForm, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col gap-2 sm:flex-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								onClick: () => save("aanvraag"),
								className: "sm:flex-1",
								children: "Vastleggen als aanvraag"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "secondary",
								onClick: () => save("gepland"),
								className: "sm:flex-1",
								children: "Ja zeggen en inplannen"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								onClick: resetDraft,
								children: "Wissen"
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:sticky lg:top-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveResult, {
					result,
					destination: draft.destination
				})
			})]
		}),
		trips.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-semibold",
					children: "Laatste ritten"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ghost",
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/ritten",
						children: "Alles"
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TripTable, { limit: 5 })]
		}) : null
	] });
}
//#endregion
export { Home as component };
