import { calculateActual, calculateTrip } from "@/lib/calc";
import { formatEuro, formatPct } from "@/lib/money";
import { useAppStore } from "@/lib/store";
import type { Trip } from "@/lib/types";

function resultFor(trip: Trip, settings: ReturnType<typeof useAppStore.getState>["settings"]) {
  const actual = calculateActual(settings, trip);
  return actual ?? calculateTrip(settings, trip);
}

export function KpiRow() {
  const trips = useAppStore((s) => s.trips);
  const settings = useAppStore((s) => s.settings);

  const totals = trips.reduce(
    (acc, trip) => {
      const result = resultFor(trip, settings);
      acc.revenue += result.revenue;
      acc.costs += result.costs.total;
      acc.profit += result.profit;
      return acc;
    },
    { revenue: 0, costs: 0, profit: 0 },
  );
  const margin = totals.revenue > 0 ? (totals.profit / totals.revenue) * 100 : null;
  const open = trips.filter((trip) => trip.status !== "afgerond").length;

  const items = [
    { label: "Opbrengst in het boek", value: formatEuro(totals.revenue) },
    { label: "Kosten", value: formatEuro(totals.costs) },
    { label: "Netto winst", value: formatEuro(totals.profit) },
    { label: "Gemiddelde marge", value: formatPct(margin) },
  ];

  return (
    <section className="mb-8">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-ink/10 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="bg-wit px-4 py-4 md:px-5">
            <div className="text-xs text-warm">{item.label}</div>
            <div className="mt-1 text-xl font-semibold tabular-nums tracking-tight md:text-2xl">
              {item.value}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-warm">
        {trips.length === 0
          ? "Nog geen ritten vastgelegd."
          : `${trips.length} ritten in het boek, waarvan ${open} nog open.`}
      </p>
    </section>
  );
}
