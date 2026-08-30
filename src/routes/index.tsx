import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppShell, PageIntro } from "@/components/app-shell";
import { CalculatorForm } from "@/components/calculator-form";
import { KpiRow } from "@/components/kpi-row";
import { LiveResult, MobileLiveBar } from "@/components/live-result";
import { TripTable } from "@/components/trip-table";
import { Button } from "@/components/ui/button";
import { calculateExpected } from "@/lib/calc";
import { parseAmount } from "@/lib/money";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
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
    extraCosts: draft.extraCosts,
  });

  function save(status: "aanvraag" | "gepland") {
    const id = saveDraft(status);
    void navigate({ to: "/ritten/$id", params: { id } });
  }

  return (
    <AppShell>
      <PageIntro kicker="LINEA Marge" title="Reken de rit voordat u ja zegt.">
        Bestemming, omzet, retour. Tol, brandstof en loon gaan eraf. U ziet
        direct wat er overblijft.
      </PageIntro>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem]">
        <section className="rounded-sm border border-ink/10 p-5 md:p-6">
          <h2 className="text-xl font-semibold">Nieuwe aanvraag</h2>
          <p className="mt-1 mb-6 text-sm text-warm">
            Een auto naar Spanje terwijl de klant vliegt. Of een volle lijn. Typ
            de omzet, de rest rekent zichzelf.
          </p>
          <CalculatorForm />
          <div className="mt-8 flex flex-col gap-2 sm:flex-row">
            <Button type="button" onClick={() => save("aanvraag")} className="sm:flex-1">
              Vastleggen als aanvraag
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => save("gepland")}
              className="sm:flex-1"
            >
              Ja zeggen en inplannen
            </Button>
            <Button type="button" variant="ghost" onClick={resetDraft}>
              Wissen
            </Button>
          </div>
        </section>

        <div className="lg:sticky lg:top-24">
          <LiveResult result={result} destination={draft.destination} />
        </div>
      </div>

      <div className="mt-10">
        <KpiRow />
      </div>

      {trips.length > 0 ? (
        <section className="mt-4">
          <div className="mb-4 flex items-end justify-between gap-3">
            <h2 className="text-xl font-semibold">Laatste ritten</h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/ritten">Alles</Link>
            </Button>
          </div>
          <TripTable limit={5} />
        </section>
      ) : null}

      <MobileLiveBar result={result} />
    </AppShell>
  );
}
