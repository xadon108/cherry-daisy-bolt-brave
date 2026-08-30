import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as daysLabel, c as formatPct, d as uid, f as useAppStore, l as parseAmount, n as Button, o as findRoute, p as useHydrated, r as PageIntro, s as formatEuro, t as AppShell, u as routeLabel } from "./use-hydrated-DjofOuhO.mjs";
import { n as Label, t as Input } from "./label-PaN46YB7.mjs";
import { a as calculateTrip, n as StatusBadge, r as calculateActual, t as MarginBadge } from "./status-badge-BS3vQL20.mjs";
import { n as Route } from "./router-BY9nKkSr.mjs";
import { n as Textarea, t as LiveResult } from "./live-result--AURaIkj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ritten._id-C6f7Stpf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TripDetail() {
	const { id } = Route.useParams();
	const hydrated = useHydrated();
	const navigate = useNavigate();
	const trip = useAppStore((s) => s.trips.find((item) => item.id === id));
	const settings = useAppStore((s) => s.settings);
	const updateTrip = useAppStore((s) => s.updateTrip);
	const deleteTrip = useAppStore((s) => s.deleteTrip);
	const loadTripIntoDraft = useAppStore((s) => s.loadTripIntoDraft);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 rounded-sm bg-ink/5" }) });
	if (!trip) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
		title: "Deze rit staat niet in het boek.",
		children: "Hij is verwijderd of het adres klopt niet."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/ritten",
			children: "Terug naar ritten"
		})
	})] });
	const route = findRoute(settings.routes, trip.routeId);
	const expected = calculateTrip(settings, trip);
	const actual = calculateActual(settings, trip);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex flex-wrap items-center gap-2 text-sm text-warm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/ritten",
					className: "hover:text-ink",
					children: "Ritten"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-ink",
					children: trip.destination
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 flex flex-wrap items-start justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: trip.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarginBadge, {
						marginPct: expected.marginPct,
						profit: expected.profit
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 text-3xl font-semibold md:text-4xl",
					children: trip.destination
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-warm",
					children: [
						trip.customer,
						" · ",
						routeLabel(route),
						" · ",
						trip.date
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					trip.status === "aanvraag" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						onClick: () => updateTrip(trip.id, { status: "gepland" }),
						children: "Ja zeggen"
					}) : null,
					trip.status !== "afgerond" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "secondary",
						onClick: () => updateTrip(trip.id, {
							status: "afgerond",
							actual: trip.actual ?? seedActuals(trip, expected)
						}),
						children: "Rit afronden"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "secondary",
						onClick: () => {
							loadTripIntoDraft(trip);
							navigate({ to: "/" });
						},
						children: "Opnieuw rekenen"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "danger",
						onClick: () => {
							deleteTrip(trip.id);
							navigate({ to: "/ritten" });
						},
						children: "Verwijderen"
					})
				]
			})]
		}),
		trip.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-8 max-w-2xl text-sm text-warm",
			children: trip.notes
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid items-start gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-lg font-semibold",
				children: "Verwacht, vooraf"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveResult, {
				result: expected,
				destination: trip.destination
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-lg font-semibold",
					children: "Werkelijk, achteraf"
				}),
				trip.status === "afgerond" || trip.actual ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActualEditor, {
					actual: trip.actual ?? seedActuals(trip, expected),
					onChange: (next) => updateTrip(trip.id, {
						actual: next,
						status: "afgerond"
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-sm border border-ink/10 px-5 py-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: "Nog niet gereden"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-warm",
						children: "Rond de rit af om brandstof, tol en dagen te toetsen aan de verwachting."
					})]
				}),
				actual ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 rounded-sm bg-ivoor px-5 py-4 text-diep",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-[0.16em] text-diep/70",
							children: "Verschil"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-3 grid grid-cols-2 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs",
									children: "Winst verwacht"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-semibold tabular-nums",
									children: formatEuro(expected.profit)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs",
									children: "Winst werkelijk"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-semibold tabular-nums",
									children: formatEuro(actual.profit)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs",
									children: "Marge verwacht"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-semibold tabular-nums",
									children: formatPct(expected.marginPct)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs",
									children: "Marge werkelijk"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-semibold tabular-nums",
									children: formatPct(actual.marginPct)
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm",
							children: [
								actual.profit - expected.profit >= 0 ? "Beter dan gedacht: " : "Tegenvaller: ",
								formatEuro(actual.profit - expected.profit),
								" op de winst."
							]
						})
					]
				}) : null
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-8 text-sm text-warm",
			children: [
				"Loon op deze lijn: ",
				daysLabel(route.days),
				" × ",
				formatEuro(settings.driverDayRate),
				". Extra depotdag ",
				formatEuro(settings.depotDayCost),
				"."
			]
		})
	] });
}
function seedActuals(trip, expected) {
	return {
		outboundRevenue: trip.outboundRevenue,
		returnRevenue: trip.returnRevenue,
		fuel: expected.costs.fuel,
		tolls: expected.costs.tolls,
		wageDays: expected.costs.days,
		depotDays: trip.extraDepotDays,
		extraCosts: trip.extraCosts.map((line) => ({ ...line })),
		notes: ""
	};
}
function ActualEditor({ actual, onChange }) {
	const settings = useAppStore((s) => s.settings);
	const [local, setLocal] = (0, import_react.useState)(actual);
	const patch = (partial) => {
		const next = {
			...local,
			...partial
		};
		setLocal(next);
		onChange(next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-sm border border-ink/10 p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
						label: "Omzet heen",
						value: local.outboundRevenue,
						onChange: (value) => patch({ outboundRevenue: value })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
						label: "Retouromzet",
						value: local.returnRevenue,
						onChange: (value) => patch({ returnRevenue: value })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
						label: "Brandstof",
						value: local.fuel,
						onChange: (value) => patch({ fuel: value })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
						label: "Tol",
						value: local.tolls,
						onChange: (value) => patch({ tolls: value })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-semibold",
								children: "Dagen chauffeur"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "mt-2",
								inputMode: "decimal",
								value: local.wageDays || "",
								onChange: (e) => patch({ wageDays: parseAmount(e.target.value) })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-1 block text-xs text-warm",
								children: ["× ", formatEuro(settings.driverDayRate)]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold",
							children: "Depotdagen"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-2",
							inputMode: "decimal",
							value: local.depotDays || "",
							onChange: (e) => patch({ depotDays: parseAmount(e.target.value) })
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Notitie achteraf" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					className: "mt-2",
					rows: 3,
					value: local.notes,
					onChange: (e) => patch({ notes: e.target.value }),
					placeholder: "Werkelijke tankbeurt, files, schade"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Extra kosten werkelijk" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "secondary",
						onClick: () => patch({ extraCosts: [...local.extraCosts, {
							id: uid(),
							label: "",
							amount: 0
						}] }),
						children: "Regel"
					})]
				}), local.extraCosts.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: line.label,
						placeholder: "Omschrijving",
						onChange: (e) => patch({ extraCosts: local.extraCosts.map((item) => item.id === line.id ? {
							...item,
							label: e.target.value
						} : item) })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "w-32",
						inputMode: "decimal",
						value: line.amount || "",
						onChange: (e) => patch({ extraCosts: local.extraCosts.map((item) => item.id === line.id ? {
							...item,
							amount: parseAmount(e.target.value)
						} : item) })
					})]
				}, line.id))]
			})
		]
	});
}
function MoneyField({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-semibold",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mt-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-warm",
				children: "€"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				className: "pl-8",
				inputMode: "decimal",
				defaultValue: value ? String(value) : "",
				onBlur: (e) => onChange(parseAmount(e.target.value))
			})]
		})]
	});
}
//#endregion
export { TripDetail as component };
