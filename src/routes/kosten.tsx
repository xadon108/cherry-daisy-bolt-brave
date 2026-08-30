import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageIntro } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { routeLabel } from "@/lib/catalog";
import { formatEuro, parseAmount } from "@/lib/money";
import { useAppStore } from "@/lib/store";
import type { RouteDef, Toll } from "@/lib/types";
import { uid } from "@/lib/utils";

export const Route = createFileRoute("/kosten")({ component: KostenPage });

function KostenPage() {
  const settings = useAppStore((s) => s.settings);
  const setSettings = useAppStore((s) => s.setSettings);
  const updateRoute = useAppStore((s) => s.updateRoute);
  const resetSettings = useAppStore((s) => s.resetSettings);
  const clearSamples = useAppStore((s) => s.clearSamples);
  const trips = useAppStore((s) => s.trips);
  const hasSamples = trips.some((trip) => trip.id.startsWith("sample-"));

  return (
    <AppShell>
      <PageIntro kicker="Onder water" title="Vaste kosten per lijn.">
        Tol België, tol Frankrijk, tankbeurt Luxemburg, dagen op de weg. Deze
        cijfers trekt de rekenmachine van elke aanvraag af. Pas ze hier aan als
        de werkelijkheid verschuift.
      </PageIntro>

      <section className="mb-10 grid gap-4 sm:grid-cols-3">
        <NumberCard
          label="Dagtarief chauffeur"
          hint="Loonkosten per dag, inclusief lasten"
          value={settings.driverDayRate}
          onChange={(driverDayRate) => setSettings({ driverDayRate })}
        />
        <NumberCard
          label="Depotdag"
          hint="Extra stilstand op de loods"
          value={settings.depotDayCost}
          onChange={(depotDayCost) => setSettings({ depotDayCost })}
        />
        <NumberCard
          label="Streefmarge"
          hint="Percentage waarop de tool u wijst"
          value={settings.targetMarginPct}
          suffix="%"
          onChange={(targetMarginPct) => setSettings({ targetMarginPct })}
        />
      </section>

      <section className="flex flex-col gap-4">
        {settings.routes.map((route) => (
          <RouteCard key={route.id} route={route} onChange={(patch) => updateRoute(route.id, patch)} />
        ))}
      </section>

      <div className="mt-10 flex flex-wrap gap-2">
        <Button type="button" variant="secondary" onClick={resetSettings}>
          Kostenblad terugzetten
        </Button>
        {hasSamples ? (
          <Button type="button" variant="ghost" onClick={clearSamples}>
            Voorbeeldritten wissen
          </Button>
        ) : null}
      </div>
      <p className="mt-4 max-w-xl text-sm text-warm">
        Spanje via Lyon staat op de gemeten waarden: {formatEuro(56.19)} België,{" "}
        {formatEuro(214.9)} Frankrijk Metz–Lyon–grens, {formatEuro(1100)} brandstof
        waarvan {formatEuro(650)} Luxemburg, 3,5 dag en 31,5 uur rijden.
      </p>
    </AppShell>
  );
}

function NumberCard({
  label,
  hint,
  value,
  suffix,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block rounded-sm border border-ink/10 p-4">
      <span className="text-sm font-semibold">{label}</span>
      <span className="mt-1 block text-sm text-warm">{hint}</span>
      <div className="relative mt-3">
        {suffix ? null : (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-warm">
            €
          </span>
        )}
        <Input
          className={suffix ? "" : "pl-8"}
          inputMode="decimal"
          defaultValue={String(value)}
          onBlur={(e) => onChange(parseAmount(e.target.value))}
        />
        {suffix ? (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-warm">
            {suffix}
          </span>
        ) : null}
      </div>
    </label>
  );
}

function RouteCard({
  route,
  onChange,
}: {
  route: RouteDef;
  onChange: (patch: Partial<RouteDef>) => void;
}) {
  const setToll = (id: string, patch: Partial<Toll>) => {
    onChange({
      tolls: route.tolls.map((toll) => (toll.id === id ? { ...toll, ...patch } : toll)),
    });
  };

  return (
    <article className="rounded-sm border border-ink/10 p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-semibold">{routeLabel(route)}</h2>
        <p className="text-sm text-warm">{route.hint}</p>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Mini
          label="Dagen"
          value={route.days}
          onChange={(days) => onChange({ days })}
        />
        <Mini
          label="Rij-uren"
          value={route.drivingHours}
          onChange={(drivingHours) => onChange({ drivingHours })}
        />
        <Mini
          label="Brandstof totaal"
          money
          value={route.fuelTotal}
          onChange={(fuelTotal) => onChange({ fuelTotal })}
        />
        <Mini
          label="Waarvan Luxemburg"
          money
          value={route.fuelLuxembourg}
          onChange={(fuelLuxembourg) => onChange({ fuelLuxembourg })}
        />
      </div>
      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between">
          <Label>Tol</Label>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() =>
              onChange({
                tolls: [...route.tolls, { id: uid(), label: "Tol", amount: 0 }],
              })
            }
          >
            Tolregel
          </Button>
        </div>
        <ul className="flex flex-col gap-2">
          {route.tolls.map((toll) => (
            <li key={toll.id} className="flex gap-2">
              <Input
                value={toll.label}
                onChange={(e) => setToll(toll.id, { label: e.target.value })}
              />
              <div className="relative w-36 shrink-0">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-warm">
                  €
                </span>
                <Input
                  className="pl-8"
                  inputMode="decimal"
                  defaultValue={String(toll.amount)}
                  onBlur={(e) => setToll(toll.id, { amount: parseAmount(e.target.value) })}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function Mini({
  label,
  value,
  money,
  onChange,
}: {
  label: string;
  value: number;
  money?: boolean;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-warm">{label}</span>
      <div className="relative mt-1">
        {money ? (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-warm">
            €
          </span>
        ) : null}
        <Input
          className={money ? "pl-8" : ""}
          inputMode="decimal"
          defaultValue={String(value)}
          onBlur={(e) => onChange(parseAmount(e.target.value))}
        />
      </div>
    </label>
  );
}
