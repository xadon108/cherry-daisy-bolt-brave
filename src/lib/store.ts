import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  DEFAULT_DEPOT_DAY_COST,
  DEFAULT_DRIVER_DAY_RATE,
  DEFAULT_ROUTES,
  DEFAULT_TARGET_MARGIN_PCT,
} from "./catalog";
import { parseAmount } from "./money";
import { uid } from "./utils";
import type { Draft, ExtraCost, Settings, Trip, TripStatus } from "./types";

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export function emptyDraft(routeId = "spanje-lyon"): Draft {
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
    date: todayIso(),
  };
}

const SAMPLE_TRIPS: Trip[] = [
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
    notes: "Eén auto, lege retour. Reken dit na voordat u ja zegt.",
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
      extraCosts: [{ id: "ferry-wait", label: "Wachturen Perpignan", amount: 40 }],
      notes: "Tankbeurt Luxemburg €642.",
    },
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
    notes: "Twee extra dagen op de Spaanse loods.",
  },
];

export const defaultSettings = (): Settings => ({
  driverDayRate: DEFAULT_DRIVER_DAY_RATE,
  depotDayCost: DEFAULT_DEPOT_DAY_COST,
  targetMarginPct: DEFAULT_TARGET_MARGIN_PCT,
  routes: DEFAULT_ROUTES.map((route) => ({
    ...route,
    tolls: route.tolls.map((toll) => ({ ...toll })),
  })),
});

type AppState = {
  trips: Trip[];
  settings: Settings;
  draft: Draft;
  setDraft: (patch: Partial<Draft>) => void;
  resetDraft: () => void;
  loadTripIntoDraft: (trip: Trip) => void;
  addExtraCost: () => void;
  updateExtraCost: (id: string, patch: Partial<ExtraCost>) => void;
  removeExtraCost: (id: string) => void;
  saveDraft: (status?: TripStatus) => string;
  updateTrip: (id: string, patch: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
  setSettings: (patch: Partial<Settings>) => void;
  updateRoute: (id: string, patch: Partial<Settings["routes"][number]>) => void;
  resetSettings: () => void;
  clearSamples: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      trips: SAMPLE_TRIPS,
      settings: defaultSettings(),
      draft: emptyDraft(),
      setDraft: (patch) => set({ draft: { ...get().draft, ...patch } }),
      resetDraft: () => set({ draft: emptyDraft(get().draft.routeId) }),
      loadTripIntoDraft: (trip) =>
        set({
          draft: {
            routeId: trip.routeId,
            destination: trip.destination,
            customer: trip.customer,
            outboundRevenue: trip.outboundRevenue ? String(trip.outboundRevenue) : "",
            returnRevenue: trip.returnRevenue ? String(trip.returnRevenue) : "",
            hasReturn: trip.returnRevenue > 0,
            extraDepotDays: trip.extraDepotDays,
            extraCosts: trip.extraCosts.map((line) => ({ ...line })),
            notes: trip.notes,
            date: trip.date,
          },
        }),
      addExtraCost: () =>
        set({
          draft: {
            ...get().draft,
            extraCosts: [
              ...get().draft.extraCosts,
              { id: uid(), label: "", amount: 0 },
            ],
          },
        }),
      updateExtraCost: (id, patch) =>
        set({
          draft: {
            ...get().draft,
            extraCosts: get().draft.extraCosts.map((line) =>
              line.id === id ? { ...line, ...patch } : line,
            ),
          },
        }),
      removeExtraCost: (id) =>
        set({
          draft: {
            ...get().draft,
            extraCosts: get().draft.extraCosts.filter((line) => line.id !== id),
          },
        }),
      saveDraft: (status = "aanvraag") => {
        const { draft } = get();
        const now = new Date().toISOString();
        const trip: Trip = {
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
          extraCosts: draft.extraCosts.filter(
            (line) => line.label.trim() || line.amount,
          ),
          notes: draft.notes.trim(),
        };
        set({ trips: [trip, ...get().trips], draft: emptyDraft(draft.routeId) });
        return trip.id;
      },
      updateTrip: (id, patch) =>
        set({
          trips: get().trips.map((trip) =>
            trip.id === id
              ? { ...trip, ...patch, updatedAt: new Date().toISOString() }
              : trip,
          ),
        }),
      deleteTrip: (id) =>
        set({ trips: get().trips.filter((trip) => trip.id !== id) }),
      setSettings: (patch) => set({ settings: { ...get().settings, ...patch } }),
      updateRoute: (id, patch) =>
        set({
          settings: {
            ...get().settings,
            routes: get().settings.routes.map((route) =>
              route.id === id ? { ...route, ...patch } : route,
            ),
          },
        }),
      resetSettings: () => set({ settings: defaultSettings() }),
      clearSamples: () =>
        set({
          trips: get().trips.filter((trip) => !trip.id.startsWith("sample-")),
        }),
    }),
    { name: "linea-marge-v1", skipHydration: true },
  ),
);
