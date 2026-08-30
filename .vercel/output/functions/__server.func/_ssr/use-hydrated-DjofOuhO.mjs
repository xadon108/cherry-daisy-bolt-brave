import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { d as useRouterState, v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as ClipboardList, r as Settings2, s as Calculator } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-hydrated-DjofOuhO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid() {
	if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
	return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function BrandMark({ className, size = 40 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/linea-mark.png",
		alt: "",
		width: size,
		height: size,
		className: cn("block rounded-sm object-contain", className)
	});
}
function BrandLockup({ compact = false, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center gap-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { size: compact ? 36 : 44 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "leading-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("wordmark-linea text-ink", compact ? "text-lg" : "text-xl"),
				children: "LINEA"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("wordmark-transport mt-1 text-xs", compact && "text-xs"),
				children: "Transport"
			})]
		})]
	});
}
var NAV = [
	{
		to: "/",
		label: "Rekenen",
		icon: Calculator
	},
	{
		to: "/ritten",
		label: "Ritten",
		icon: ClipboardList
	},
	{
		to: "/kosten",
		label: "Kosten",
		icon: Settings2
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-wit text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-ink/10 bg-wit",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:h-[4.5rem] md:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "md:hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLockup, { compact: true })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden md:block",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLockup, {})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden items-center gap-1 md:flex",
							children: NAV.map((item) => {
								const active = item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: item.to,
									className: cn("inline-flex h-11 items-center gap-2 rounded-sm px-3 text-sm font-semibold transition-colors duration-150", active ? "bg-kobalt text-wit" : "text-ink hover:bg-ink/5"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), item.label]
								}, item.to);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "hidden text-right text-xs text-warm lg:block",
							children: ["Margeplanner", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 block text-ink",
								children: "Uw auto reist. U niet."
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-6xl px-4 pb-28 pt-6 md:px-6 md:pb-16 md:pt-8",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-wit pb-[env(safe-area-inset-bottom)] md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid grid-cols-3",
					children: NAV.map((item) => {
						const active = item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex h-14 flex-col items-center justify-center gap-1 text-xs font-semibold", active ? "text-kobalt" : "text-warm"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-5" }), item.label]
						}) }, item.to);
					})
				})
			})
		]
	});
}
function PageIntro({ kicker, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-8 max-w-2xl",
		children: [
			kicker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.18em] text-warm",
				children: kicker
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-3xl font-semibold text-balance md:text-4xl",
				children: title
			}),
			children ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 text-base text-warm",
				children
			}) : null
		]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-semibold transition-[background-color,color,border-color,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kobalt focus-visible:ring-offset-2 focus-visible:ring-offset-wit disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-kobalt text-wit hover:bg-diep",
			ivory: "bg-ivoor text-diep hover:bg-wit",
			secondary: "bg-wit text-ink ring-1 ring-ink/12 hover:ring-ink/30 hover:bg-ivoor/40",
			ghost: "bg-transparent text-ink hover:bg-ink/5",
			diep: "bg-diep text-ivoor hover:bg-kobalt",
			danger: "bg-wit text-ink ring-1 ring-ink/20 hover:bg-ink hover:text-wit"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-sm",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
/**
* Default cost sheet for a full loop (NL → bestemming → NL).
* Spanje via Lyon is the measured run: tolls, fuel (incl. Luxembourg) and days
* come from the owner's figures. Other lines start from that sheet and can be
* tuned under Kosten.
*/
var DEFAULT_ROUTES = [
	{
		id: "spanje-lyon",
		service: "Linea Spanje",
		via: "Lyon",
		days: 3.5,
		drivingHours: 31.5,
		fuelTotal: 1100,
		fuelLuxembourg: 650,
		tolls: [{
			id: "be",
			label: "Tol België",
			amount: 56.19
		}, {
			id: "fr-lyon",
			label: "Tol Frankrijk (Metz–Lyon–grens)",
			amount: 214.9
		}],
		hint: "Tarragona, Barcelona, Valencia, Málaga"
	},
	{
		id: "spanje-madrid",
		service: "Linea Spanje",
		via: "Madrid",
		days: 3,
		drivingHours: 27,
		fuelTotal: 1100,
		fuelLuxembourg: 650,
		tolls: [{
			id: "be",
			label: "Tol België",
			amount: 56.19
		}, {
			id: "fr-west",
			label: "Tol Frankrijk (west, Bordeaux–Irun)",
			amount: 168.5
		}],
		hint: "Madrid, Sevilla, Alicante, Málaga"
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
			{
				id: "be",
				label: "Tol België",
				amount: 56.19
			},
			{
				id: "fr-west",
				label: "Tol Frankrijk (west)",
				amount: 168.5
			},
			{
				id: "pt",
				label: "Tol Portugal",
				amount: 42
			}
		],
		hint: "Lissabon, Porto, Faro"
	},
	{
		id: "frankrijk",
		service: "Linea Frankrijk",
		via: "Parijs",
		days: 2,
		drivingHours: 16,
		fuelTotal: 480,
		fuelLuxembourg: 0,
		tolls: [{
			id: "be",
			label: "Tol België",
			amount: 56.19
		}, {
			id: "fr",
			label: "Tol Frankrijk",
			amount: 95
		}],
		hint: "Parijs, Lyon, Marseille, Nice"
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
			{
				id: "be",
				label: "Tol België",
				amount: 56.19
			},
			{
				id: "fr",
				label: "Tol Frankrijk",
				amount: 180
			},
			{
				id: "it",
				label: "Tol Italië",
				amount: 85
			}
		],
		hint: "Milaan, Turijn, Rome, Florence"
	},
	{
		id: "duitsland",
		service: "Linea Duitsland",
		via: "Keulen",
		days: 1.5,
		drivingHours: 12,
		fuelTotal: 320,
		fuelLuxembourg: 0,
		tolls: [{
			id: "be",
			label: "Tol België",
			amount: 56.19
		}, {
			id: "de",
			label: "Maut Duitsland",
			amount: 95
		}],
		hint: "Keulen, Frankfurt, München, Hamburg"
	},
	{
		id: "zomerlijn",
		service: "Linea Zomerlijn",
		via: "Lyon",
		days: 3.5,
		drivingHours: 31.5,
		fuelTotal: 1100,
		fuelLuxembourg: 650,
		tolls: [{
			id: "be",
			label: "Tol België",
			amount: 56.19
		}, {
			id: "fr-lyon",
			label: "Tol Frankrijk (Metz–Lyon–grens)",
			amount: 214.9
		}],
		hint: "Seizoenslijn naar de Spaanse en Franse kust"
	},
	{
		id: "assistance",
		service: "Linea Assistance",
		via: "op afroep",
		days: 1,
		drivingHours: 8,
		fuelTotal: 180,
		fuelLuxembourg: 0,
		tolls: [{
			id: "be",
			label: "Tol België",
			amount: 56.19
		}],
		hint: "Pech, depot, extra stilstand"
	}
];
function routeLabel(route) {
	if (route.via === "op afroep") return route.service;
	return `${route.service} · via ${route.via}`;
}
function findRoute(routes, id) {
	return routes.find((route) => route.id === id) ?? routes[0];
}
var euro = new Intl.NumberFormat("nl-NL", {
	style: "currency",
	currency: "EUR",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});
new Intl.NumberFormat("nl-NL", {
	style: "currency",
	currency: "EUR",
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
});
var pct = new Intl.NumberFormat("nl-NL", {
	minimumFractionDigits: 1,
	maximumFractionDigits: 1
});
new Intl.NumberFormat("nl-NL", {
	minimumFractionDigits: 0,
	maximumFractionDigits: 2
});
function formatEuro(value) {
	if (!Number.isFinite(value)) return "€\xA00,00";
	return euro.format(value);
}
function formatPct(value) {
	if (value === null || !Number.isFinite(value)) return "—";
	return `${pct.format(value)}%`;
}
/** Parse Dutch or plain numeric input: 1.650,50 / 1650.50 / 1650 */
function parseAmount(raw) {
	const trimmed = raw.trim();
	if (!trimmed) return 0;
	const hasComma = trimmed.includes(",");
	const hasDot = trimmed.includes(".");
	let normalized = trimmed.replace(/[^\d,.-]/g, "");
	if (hasComma && hasDot) normalized = normalized.replace(/\./g, "").replace(",", ".");
	else if (hasComma) normalized = normalized.replace(",", ".");
	const value = Number.parseFloat(normalized);
	return Number.isFinite(value) ? value : 0;
}
function daysLabel(days) {
	const formatted = new Intl.NumberFormat("nl-NL", {
		minimumFractionDigits: days % 1 === 0 ? 0 : 1,
		maximumFractionDigits: 1
	}).format(days);
	return days === 1 ? "1 dag" : `${formatted} dagen`;
}
function todayIso() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function emptyDraft(routeId = "spanje-lyon") {
	return {
		routeId,
		destination: "",
		customer: "",
		outboundRevenue: "",
		returnRevenue: "",
		hasReturn: false,
		extraDepotDays: 0,
		extraCosts: [],
		notes: "",
		date: todayIso()
	};
}
var SAMPLE_TRIPS = [
	{
		id: "sample-tarragona",
		createdAt: "2026-08-28T08:12:00.000Z",
		updatedAt: "2026-08-28T08:12:00.000Z",
		date: "2026-08-28",
		status: "aanvraag",
		routeId: "spanje-lyon",
		destination: "Tarragona",
		customer: "Aanvraag — klant vliegt",
		outboundRevenue: 1650,
		returnRevenue: 0,
		extraDepotDays: 0,
		extraCosts: [],
		notes: "Eén auto, lege retour. Reken dit na voordat u ja zegt."
	},
	{
		id: "sample-barcelona",
		createdAt: "2026-08-12T09:00:00.000Z",
		updatedAt: "2026-08-16T18:40:00.000Z",
		date: "2026-08-12",
		status: "afgerond",
		routeId: "spanje-lyon",
		destination: "Barcelona",
		customer: "Volle lijn heen en terug",
		outboundRevenue: 4200,
		returnRevenue: 3100,
		extraDepotDays: 0,
		extraCosts: [],
		notes: "Heen vier auto's, retour drie auto's.",
		actual: {
			outboundRevenue: 4200,
			returnRevenue: 3050,
			fuel: 1084,
			tolls: 271.09,
			wageDays: 3.5,
			depotDays: 0,
			extraCosts: [{
				id: "ferry-wait",
				label: "Wachturen Perpignan",
				amount: 40
			}],
			notes: "Tankbeurt Luxemburg €642."
		}
	},
	{
		id: "sample-malaga",
		createdAt: "2026-08-20T10:00:00.000Z",
		updatedAt: "2026-08-20T10:00:00.000Z",
		date: "2026-08-22",
		status: "gepland",
		routeId: "spanje-madrid",
		destination: "Málaga",
		customer: "Depannage op de loods",
		outboundRevenue: 2800,
		returnRevenue: 1900,
		extraDepotDays: 2,
		extraCosts: [],
		notes: "Twee extra dagen op de Spaanse loods."
	}
];
var defaultSettings = () => ({
	driverDayRate: 280,
	depotDayCost: 80,
	targetMarginPct: 20,
	routes: DEFAULT_ROUTES.map((route) => ({
		...route,
		tolls: route.tolls.map((toll) => ({ ...toll }))
	}))
});
var useAppStore = create()(persist((set, get) => ({
	trips: SAMPLE_TRIPS,
	settings: defaultSettings(),
	draft: emptyDraft(),
	setDraft: (patch) => set({ draft: {
		...get().draft,
		...patch
	} }),
	resetDraft: () => set({ draft: emptyDraft(get().draft.routeId) }),
	loadTripIntoDraft: (trip) => set({ draft: {
		routeId: trip.routeId,
		destination: trip.destination,
		customer: trip.customer,
		outboundRevenue: trip.outboundRevenue ? String(trip.outboundRevenue) : "",
		returnRevenue: trip.returnRevenue ? String(trip.returnRevenue) : "",
		hasReturn: trip.returnRevenue > 0,
		extraDepotDays: trip.extraDepotDays,
		extraCosts: trip.extraCosts.map((line) => ({ ...line })),
		notes: trip.notes,
		date: trip.date
	} }),
	addExtraCost: () => set({ draft: {
		...get().draft,
		extraCosts: [...get().draft.extraCosts, {
			id: uid(),
			label: "",
			amount: 0
		}]
	} }),
	updateExtraCost: (id, patch) => set({ draft: {
		...get().draft,
		extraCosts: get().draft.extraCosts.map((line) => line.id === id ? {
			...line,
			...patch
		} : line)
	} }),
	removeExtraCost: (id) => set({ draft: {
		...get().draft,
		extraCosts: get().draft.extraCosts.filter((line) => line.id !== id)
	} }),
	saveDraft: (status = "aanvraag") => {
		const { draft } = get();
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const trip = {
			id: uid(),
			createdAt: now,
			updatedAt: now,
			date: draft.date || todayIso(),
			status,
			routeId: draft.routeId,
			destination: draft.destination.trim() || "Onbekende bestemming",
			customer: draft.customer.trim() || "Zonder naam",
			outboundRevenue: parseAmount(draft.outboundRevenue),
			returnRevenue: draft.hasReturn ? parseAmount(draft.returnRevenue) : 0,
			extraDepotDays: draft.extraDepotDays,
			extraCosts: draft.extraCosts.filter((line) => line.label.trim() || line.amount),
			notes: draft.notes.trim()
		};
		set({
			trips: [trip, ...get().trips],
			draft: emptyDraft(draft.routeId)
		});
		return trip.id;
	},
	updateTrip: (id, patch) => set({ trips: get().trips.map((trip) => trip.id === id ? {
		...trip,
		...patch,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	} : trip) }),
	deleteTrip: (id) => set({ trips: get().trips.filter((trip) => trip.id !== id) }),
	setSettings: (patch) => set({ settings: {
		...get().settings,
		...patch
	} }),
	updateRoute: (id, patch) => set({ settings: {
		...get().settings,
		routes: get().settings.routes.map((route) => route.id === id ? {
			...route,
			...patch
		} : route)
	} }),
	resetSettings: () => set({ settings: defaultSettings() }),
	clearSamples: () => set({ trips: get().trips.filter((trip) => !trip.id.startsWith("sample-")) })
}), {
	name: "linea-marge-v1",
	skipHydration: true
}));
function useHydrated() {
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		useAppStore.persist.rehydrate().then(() => {
			if (!cancelled) setHydrated(true);
		});
		return () => {
			cancelled = true;
		};
	}, []);
	return hydrated;
}
//#endregion
export { daysLabel as a, formatPct as c, uid as d, useAppStore as f, cn as i, parseAmount as l, Button as n, findRoute as o, useHydrated as p, PageIntro as r, formatEuro as s, AppShell as t, routeLabel as u };
