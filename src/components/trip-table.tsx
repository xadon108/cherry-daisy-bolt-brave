import { Link } from "@tanstack/react-router";
import { calculateActual, calculateTrip } from "@/lib/calc";
import { findRoute, routeLabel } from "@/lib/catalog";
import { formatEuro, formatPct } from "@/lib/money";
import { useAppStore } from "@/lib/store";
import { MarginBadge, StatusBadge } from "@/components/status-badge";
import type { Trip, TripStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

function formatDate(iso: string) {
  if (!iso) return "—";
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "short",
  }).format(date);
}

export function TripTable({
  limit,
  status,
}: {
  limit?: number;
  status?: TripStatus | "alle";
}) {
  const all = useAppStore((s) => s.trips);
  const settings = useAppStore((s) => s.settings);
  const filtered: Trip[] =
    !status || status === "alle" ? all : all.filter((trip) => trip.status === status);
  const rows = limit ? filtered.slice(0, limit) : filtered;

  if (rows.length === 0) {
    return (
      <div className="rounded-sm border border-ink/10 px-5 py-10 text-center">
        <p className="font-semibold">Nog geen ritten</p>
        <p className="mt-1 text-sm text-warm">Leg een aanvraag vast vanaf de rekenpagina.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-sm border border-ink/10">
      <ul className="divide-y divide-ink/10">
        {rows.map((trip) => {
          const expected = calculateTrip(settings, trip);
          const actual = calculateActual(settings, trip);
          const shown = actual ?? expected;
          const route = findRoute(settings.routes, trip.routeId);
          return (
            <li key={trip.id}>
              <Link
                to="/ritten/$id"
                params={{ id: trip.id }}
                className="flex flex-col gap-3 px-4 py-4 transition-colors duration-150 hover:bg-ivoor/40 md:flex-row md:items-center md:gap-6 md:px-5"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">{trip.destination}</span>
                    <StatusBadge status={trip.status} />
                    <MarginBadge marginPct={shown.marginPct} profit={shown.profit} />
                  </div>
                  <p className="mt-1 truncate text-sm text-warm">
                    {trip.customer} · {routeLabel(route)} · {formatDate(trip.date)}
                  </p>
                </div>
                <dl className="grid grid-cols-3 gap-4 text-right md:w-[22rem]">
                  <div>
                    <dt className="text-xs text-warm">Opbrengst</dt>
                    <dd className="font-semibold tabular-nums">{formatEuro(shown.revenue)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-warm">Winst</dt>
                    <dd
                      className={cn(
                        "font-semibold tabular-nums",
                        shown.profit < 0 ? "text-diep" : "text-ink",
                      )}
                    >
                      {formatEuro(shown.profit)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-warm">Marge</dt>
                    <dd className="font-semibold tabular-nums">{formatPct(shown.marginPct)}</dd>
                  </div>
                </dl>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
