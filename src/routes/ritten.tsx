import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageIntro } from "@/components/app-shell";
import { TripTable } from "@/components/trip-table";
import { Button } from "@/components/ui/button";
import { calculateActual, calculateTrip } from "@/lib/calc";
import { formatEuro, formatPct } from "@/lib/money";
import { useAppStore } from "@/lib/store";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/ritten")({ component: RittenPage });

type Filter = "alle" | "aanvraag" | "gepland" | "afgerond";

function RittenPage() {
  const trips = useAppStore((s) => s.trips);
  const settings = useAppStore((s) => s.settings);
  const [filter, setFilter] = useState<Filter>("alle");

  const visible = trips.filter((trip) => (filter === "alle" ? true : trip.status === filter));

  const chart = useMemo(
    () =>
      [...trips]
        .slice()
        .reverse()
        .map((trip) => {
          const shown = calculateActual(settings, trip) ?? calculateTrip(settings, trip);
          return {
            name: trip.destination.slice(0, 10),
            marge: Number((shown.marginPct ?? 0).toFixed(1)),
            winst: Math.round(shown.profit),
          };
        }),
    [trips, settings],
  );

  const afgerond = trips.filter((t) => t.status === "afgerond");
  const actualTotals = afgerond.reduce(
    (acc, trip) => {
      const actual = calculateActual(settings, trip);
      const expected = calculateTrip(settings, trip);
      if (actual) {
        acc.actual += actual.profit;
        acc.expected += expected.profit;
      }
      return acc;
    },
    { actual: 0, expected: 0 },
  );

  return (
    <AppShell>
      <PageIntro kicker="Boek" title="Ritten, vooraf en achteraf.">
        Elke aanvraag blijft staan. Na de rit vult u de werkelijke kosten in en
        ziet u of de marge hield.
      </PageIntro>

      {afgerond.length > 0 ? (
        <p className="mb-6 text-sm text-warm">
          Op {afgerond.length} afgeronde ritten was de verwachte winst{" "}
          <span className="font-semibold text-ink tabular-nums">
            {formatEuro(actualTotals.expected)}
          </span>
          , werkelijk{" "}
          <span className="font-semibold text-ink tabular-nums">
            {formatEuro(actualTotals.actual)}
          </span>
          . Verschil {formatEuro(actualTotals.actual - actualTotals.expected)}.
        </p>
      ) : null}

      {chart.length > 0 ? (
        <div className="mb-8 h-56 rounded-sm border border-ink/10 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-warm">
            Marge per rit
          </p>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={chart} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="color-mix(in srgb, var(--color-ink) 8%, transparent)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "var(--color-warm)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fill: "var(--color-warm)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                unit="%"
                width={36}
              />
              <Tooltip
                cursor={{ fill: "color-mix(in srgb, var(--color-kobalt) 8%, transparent)" }}
                contentStyle={{
                  border: "1px solid color-mix(in srgb, var(--color-ink) 12%, transparent)",
                  borderRadius: 8,
                  fontFamily: "Archivo, sans-serif",
                  fontSize: 12,
                }}
                formatter={(value, name) =>
                  name === "marge"
                    ? [`${formatPct(Number(value))}`, "Marge"]
                    : [formatEuro(Number(value)), "Winst"]
                }
              />
              <Bar dataKey="marge" fill="var(--color-kobalt)" radius={[2, 2, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : null}

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1 rounded-sm ring-1 ring-ink/12 p-1">
          {(
            [
              ["alle", "Alle"],
              ["aanvraag", "Aanvraag"],
              ["gepland", "Gepland"],
              ["afgerond", "Afgerond"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={
                filter === key
                  ? "h-9 rounded-sm bg-kobalt px-3 text-sm font-semibold text-wit"
                  : "h-9 rounded-sm px-3 text-sm font-semibold text-ink"
              }
            >
              {label}
            </button>
          ))}
        </div>
        <Button asChild>
          <Link to="/">Nieuwe rit</Link>
        </Button>
      </div>

      <p className="mb-3 text-sm text-warm">
        {visible.length} {visible.length === 1 ? "rit" : "ritten"}
      </p>
      <TripTable status={filter} />
    </AppShell>
  );
}
