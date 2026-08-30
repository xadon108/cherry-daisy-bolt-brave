import type { ReactNode } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { chipLabel, routeLabel } from "@/lib/catalog";
import { daysLabel, formatEuro } from "@/lib/money";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function CalculatorForm() {
  const draft = useAppStore((s) => s.draft);
  const settings = useAppStore((s) => s.settings);
  const setDraft = useAppStore((s) => s.setDraft);
  const addExtraCost = useAppStore((s) => s.addExtraCost);
  const updateExtraCost = useAppStore((s) => s.updateExtraCost);
  const removeExtraCost = useAppStore((s) => s.removeExtraCost);
  const route = settings.routes.find((item) => item.id === draft.routeId) ?? settings.routes[0];

  return (
    <div className="flex flex-col gap-6">
      <section>
        <Label>Bestemming</Label>
        <p className="mt-1 mb-3 text-sm text-warm">Kies de lijn. De kosten vullen zichzelf in.</p>
        <div className="flex flex-wrap gap-2">
          {settings.routes.map((item) => {
            const active = item.id === draft.routeId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setDraft({ routeId: item.id })}
                className={cn(
                  "h-10 rounded-sm px-3 text-sm font-semibold transition-colors duration-150",
                  active ? "bg-kobalt text-wit" : "bg-wit text-ink ring-1 ring-ink/12 hover:ring-ink/30",
                )}
              >
                {chipLabel(item)}
              </button>
            );
          })}
        </div>
        {route ? (
          <p className="mt-3 text-sm text-warm">
            {routeLabel(route)} · {daysLabel(route.days)} · {route.drivingHours} uur rijden · brandstof{" "}
            {formatEuro(route.fuelTotal)}
            {route.hint ? ` · ${route.hint}` : ""}
          </p>
        ) : null}
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Field label="Plaats" hint="Waar de auto naartoe moet">
          <Input
            value={draft.destination}
            onChange={(e) => setDraft({ destination: e.target.value })}
            placeholder="Tarragona"
            autoComplete="off"
          />
        </Field>
        <Field label="Klant of kenmerk">
          <Input
            value={draft.customer}
            onChange={(e) => setDraft({ customer: e.target.value })}
            placeholder="Naam of kenteken"
            autoComplete="off"
          />
        </Field>
        <Field label="Datum rit">
          <Input
            type="date"
            value={draft.date}
            onChange={(e) => setDraft({ date: e.target.value })}
          />
        </Field>
        <Field label="Wat de klant betaalt" hint="Omzet heen">
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-warm">
              €
            </span>
            <Input
              inputMode="decimal"
              className="pl-8"
              value={draft.outboundRevenue}
              onChange={(e) => setDraft({ outboundRevenue: e.target.value })}
              placeholder="0,00"
            />
          </div>
        </Field>
      </section>

      <section>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Label>Retour</Label>
            <p className="mt-1 text-sm text-warm">Enkele reis, of iets mee terug.</p>
          </div>
          <div className="flex rounded-sm ring-1 ring-ink/12">
            <button
              type="button"
              onClick={() => setDraft({ hasReturn: false, returnRevenue: "" })}
              className={cn(
                "h-11 px-4 text-sm font-semibold",
                !draft.hasReturn ? "bg-kobalt text-wit" : "bg-wit text-ink",
              )}
            >
              Enkele reis
            </button>
            <button
              type="button"
              onClick={() => setDraft({ hasReturn: true })}
              className={cn(
                "h-11 px-4 text-sm font-semibold",
                draft.hasReturn ? "bg-kobalt text-wit" : "bg-wit text-ink",
              )}
            >
              Met retour
            </button>
          </div>
        </div>
        {draft.hasReturn ? (
          <div className="mt-4 max-w-sm">
            <Field label="Retouromzet" hint="Wat u terug verdient op dezelfde rit">
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-warm">
                  €
                </span>
                <Input
                  inputMode="decimal"
                  className="pl-8"
                  value={draft.returnRevenue}
                  onChange={(e) => setDraft({ returnRevenue: e.target.value })}
                  placeholder="0,00"
                />
              </div>
            </Field>
          </div>
        ) : null}
      </section>

      <section>
        <Label>Extra dagen op het depot</Label>
        <p className="mt-1 mb-3 text-sm text-warm">
          Depannage of wachten. Elke dag kost {formatEuro(settings.depotDayCost)}.
        </p>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            aria-label="Een dag minder"
            onClick={() =>
              setDraft({ extraDepotDays: Math.max(0, draft.extraDepotDays - 1) })
            }
          >
            <Minus />
          </Button>
          <div className="min-w-16 text-center">
            <div className="text-2xl font-semibold tabular-nums">{draft.extraDepotDays}</div>
            <div className="text-xs text-warm">dagen</div>
          </div>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            aria-label="Een dag extra"
            onClick={() => setDraft({ extraDepotDays: draft.extraDepotDays + 1 })}
          >
            <Plus />
          </Button>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between gap-3">
          <div>
            <Label>Overige kosten</Label>
            <p className="mt-1 text-sm text-warm">Wachturen, veer, extra chauffeur.</p>
          </div>
          <Button type="button" variant="secondary" size="sm" onClick={addExtraCost}>
            <Plus />
            Regel
          </Button>
        </div>
        {draft.extraCosts.length > 0 ? (
          <ul className="mt-3 flex flex-col gap-2">
            {draft.extraCosts.map((line) => (
              <li key={line.id} className="flex gap-2">
                <Input
                  className="flex-1"
                  placeholder="Omschrijving"
                  value={line.label}
                  onChange={(e) => updateExtraCost(line.id, { label: e.target.value })}
                />
                <div className="relative w-32 shrink-0">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-warm">
                    €
                  </span>
                  <Input
                    inputMode="decimal"
                    className="pl-8"
                    value={line.amount ? String(line.amount) : ""}
                    onChange={(e) =>
                      updateExtraCost(line.id, {
                        amount: Number.parseFloat(e.target.value.replace(",", ".")) || 0,
                      })
                    }
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Regel verwijderen"
                  onClick={() => removeExtraCost(line.id)}
                >
                  <Trash2 />
                </Button>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      <section>
        <Field label="Notitie">
          <Textarea
            value={draft.notes}
            onChange={(e) => setDraft({ notes: e.target.value })}
            placeholder="Kenteken, ophaaladres, bijzonderheden"
            rows={3}
          />
        </Field>
      </section>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      {hint ? <span className="mt-0.5 block text-sm text-warm">{hint}</span> : null}
      <div className="mt-2">{children}</div>
    </label>
  );
}
