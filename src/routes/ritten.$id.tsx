import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppShell, PageIntro } from "@/components/app-shell";
import { LiveResult } from "@/components/live-result";
import { MarginBadge, StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { calculateActual, calculateTrip } from "@/lib/calc";
import { findRoute, routeLabel } from "@/lib/catalog";
import { daysLabel, formatEuro, formatPct, parseAmount } from "@/lib/money";
import { useAppStore } from "@/lib/store";
import type { Actuals, ExtraCost } from "@/lib/types";
import { uid } from "@/lib/utils";
import { useState } from "react";

export const Route = createFileRoute("/ritten/$id")({ component: TripDetail });

function TripDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const trip = useAppStore((s) => s.trips.find((item) => item.id === id));
  const settings = useAppStore((s) => s.settings);
  const updateTrip = useAppStore((s) => s.updateTrip);
  const deleteTrip = useAppStore((s) => s.deleteTrip);
  const loadTripIntoDraft = useAppStore((s) => s.loadTripIntoDraft);

  if (!trip) {
    return (
      <AppShell>
        <PageIntro title="Deze rit staat niet in het boek.">
          Hij is verwijderd of het adres klopt niet.
        </PageIntro>
        <Button asChild>
          <Link to="/ritten">Terug naar ritten</Link>
        </Button>
      </AppShell>
    );
  }

  const route = findRoute(settings.routes, trip.routeId);
  const expected = calculateTrip(settings, trip);
  const actual = calculateActual(settings, trip);

  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-warm">
        <Link to="/ritten" className="hover:text-ink">
          Ritten
        </Link>
        <span>/</span>
        <span className="text-ink">{trip.destination}</span>
      </div>

      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={trip.status} />
            <MarginBadge marginPct={expected.marginPct} profit={expected.profit} />
          </div>
          <h1 className="mt-3 text-3xl font-semibold md:text-4xl">{trip.destination}</h1>
          <p className="mt-2 text-warm">
            {trip.customer} · {routeLabel(route)} · {trip.date}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {trip.status === "aanvraag" ? (
            <Button type="button" onClick={() => updateTrip(trip.id, { status: "gepland" })}>
              Ja zeggen
            </Button>
          ) : null}
          {trip.status !== "afgerond" ? (
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                updateTrip(trip.id, {
                  status: "afgerond",
                  actual: trip.actual ?? seedActuals(trip, expected),
                })
              }
            >
              Rit afronden
            </Button>
          ) : null}
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              loadTripIntoDraft(trip);
              void navigate({ to: "/" });
            }}
          >
            Opnieuw rekenen
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={() => {
              deleteTrip(trip.id);
              void navigate({ to: "/ritten" });
            }}
          >
            Verwijderen
          </Button>
        </div>
      </div>

      {trip.notes ? (
        <p className="mb-8 max-w-2xl text-sm text-warm">{trip.notes}</p>
      ) : null}

      <div className="grid items-start gap-6 lg:grid-cols-2">
        <section>
          <h2 className="mb-3 text-lg font-semibold">Verwacht, vooraf</h2>
          <LiveResult result={expected} destination={trip.destination} />
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold">Werkelijk, achteraf</h2>
          {trip.status === "afgerond" || trip.actual ? (
            <ActualEditor
              actual={
                trip.actual ?? seedActuals(trip, expected)
              }
              onChange={(next) => updateTrip(trip.id, { actual: next, status: "afgerond" })}
            />
          ) : (
            <div className="rounded-sm border border-ink/10 px-5 py-8">
              <p className="font-semibold">Nog niet gereden</p>
              <p className="mt-1 text-sm text-warm">
                Rond de rit af om brandstof, tol en dagen te toetsen aan de
                verwachting.
              </p>
            </div>
          )}
          {actual ? (
            <div className="mt-4 rounded-sm bg-ivoor px-5 py-4 text-diep">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-diep/70">
                Verschil
              </p>
              <dl className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <dt className="text-xs">Winst verwacht</dt>
                  <dd className="font-semibold tabular-nums">{formatEuro(expected.profit)}</dd>
                </div>
                <div>
                  <dt className="text-xs">Winst werkelijk</dt>
                  <dd className="font-semibold tabular-nums">{formatEuro(actual.profit)}</dd>
                </div>
                <div>
                  <dt className="text-xs">Marge verwacht</dt>
                  <dd className="font-semibold tabular-nums">{formatPct(expected.marginPct)}</dd>
                </div>
                <div>
                  <dt className="text-xs">Marge werkelijk</dt>
                  <dd className="font-semibold tabular-nums">{formatPct(actual.marginPct)}</dd>
                </div>
              </dl>
              <p className="mt-3 text-sm">
                {actual.profit - expected.profit >= 0 ? "Beter dan gedacht: " : "Tegenvaller: "}
                {formatEuro(actual.profit - expected.profit)} op de winst.
              </p>
            </div>
          ) : null}
        </section>
      </div>

      <p className="mt-8 text-sm text-warm">
        Loon op deze lijn: {daysLabel(route.days)} × {formatEuro(settings.driverDayRate)}. Extra
        depotdag {formatEuro(settings.depotDayCost)}.
      </p>
    </AppShell>
  );
}

function seedActuals(
  trip: {
    outboundRevenue: number;
    returnRevenue: number;
    extraDepotDays: number;
    extraCosts: ExtraCost[];
  },
  expected: { costs: { fuel: number; tolls: number; days: number } },
): Actuals {
  return {
    outboundRevenue: trip.outboundRevenue,
    returnRevenue: trip.returnRevenue,
    fuel: expected.costs.fuel,
    tolls: expected.costs.tolls,
    wageDays: expected.costs.days,
    depotDays: trip.extraDepotDays,
    extraCosts: trip.extraCosts.map((line) => ({ ...line })),
    notes: "",
  };
}

function ActualEditor({
  actual,
  onChange,
}: {
  actual: Actuals;
  onChange: (next: Actuals) => void;
}) {
  const settings = useAppStore((s) => s.settings);
  const [local, setLocal] = useState(actual);

  const patch = (partial: Partial<Actuals>) => {
    const next = { ...local, ...partial };
    setLocal(next);
    onChange(next);
  };

  return (
    <div className="rounded-sm border border-ink/10 p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <MoneyField
          label="Omzet heen"
          value={local.outboundRevenue}
          onChange={(value) => patch({ outboundRevenue: value })}
        />
        <MoneyField
          label="Retouromzet"
          value={local.returnRevenue}
          onChange={(value) => patch({ returnRevenue: value })}
        />
        <MoneyField
          label="Brandstof"
          value={local.fuel}
          onChange={(value) => patch({ fuel: value })}
        />
        <MoneyField
          label="Tol"
          value={local.tolls}
          onChange={(value) => patch({ tolls: value })}
        />
        <label className="block">
          <span className="text-sm font-semibold">Dagen chauffeur</span>
          <Input
            className="mt-2"
            inputMode="decimal"
            value={local.wageDays || ""}
            onChange={(e) => patch({ wageDays: parseAmount(e.target.value) })}
          />
          <span className="mt-1 block text-xs text-warm">
            × {formatEuro(settings.driverDayRate)}
          </span>
        </label>
        <label className="block">
          <span className="text-sm font-semibold">Depotdagen</span>
          <Input
            className="mt-2"
            inputMode="decimal"
            value={local.depotDays || ""}
            onChange={(e) => patch({ depotDays: parseAmount(e.target.value) })}
          />
        </label>
      </div>
      <div className="mt-4">
        <Label>Notitie achteraf</Label>
        <Textarea
          className="mt-2"
          rows={3}
          value={local.notes}
          onChange={(e) => patch({ notes: e.target.value })}
          placeholder="Werkelijke tankbeurt, files, schade"
        />
      </div>
      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between">
          <Label>Extra kosten werkelijk</Label>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() =>
              patch({
                extraCosts: [...local.extraCosts, { id: uid(), label: "", amount: 0 }],
              })
            }
          >
            Regel
          </Button>
        </div>
        {local.extraCosts.map((line) => (
          <div key={line.id} className="mb-2 flex gap-2">
            <Input
              value={line.label}
              placeholder="Omschrijving"
              onChange={(e) =>
                patch({
                  extraCosts: local.extraCosts.map((item) =>
                    item.id === line.id ? { ...item, label: e.target.value } : item,
                  ),
                })
              }
            />
            <Input
              className="w-32"
              inputMode="decimal"
              value={line.amount || ""}
              onChange={(e) =>
                patch({
                  extraCosts: local.extraCosts.map((item) =>
                    item.id === line.id
                      ? { ...item, amount: parseAmount(e.target.value) }
                      : item,
                  ),
                })
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function MoneyField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      <div className="relative mt-2">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-warm">
          €
        </span>
        <Input
          className="pl-8"
          inputMode="decimal"
          defaultValue={value ? String(value) : ""}
          onBlur={(e) => onChange(parseAmount(e.target.value))}
        />
      </div>
    </label>
  );
}
