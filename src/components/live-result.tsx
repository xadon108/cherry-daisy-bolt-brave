import { daysLabel, formatEuro, formatPct } from "@/lib/money";
import { marginLabel, marginTone } from "@/lib/calc";
import type { MarginResult } from "@/lib/types";
import { cn } from "@/lib/utils";

function Row({
  label,
  value,
  hint,
  muted,
}: {
  label: string;
  value: string;
  hint?: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5">
      <div className="min-w-0">
        <div className={cn("text-sm", muted ? "text-ivoor/70" : "text-ivoor")}>{label}</div>
        {hint ? <div className="text-xs text-ivoor/55">{hint}</div> : null}
      </div>
      <div className="shrink-0 tabular-nums text-sm font-semibold text-ivoor">{value}</div>
    </div>
  );
}

function formatNumberHours(hours: number) {
  const formatted = new Intl.NumberFormat("nl-NL", {
    minimumFractionDigits: hours % 1 === 0 ? 0 : 1,
    maximumFractionDigits: 1,
  }).format(hours);
  return `${formatted} uur`;
}

export function LiveResult({
  result,
  destination,
  compact,
}: {
  result: MarginResult;
  destination?: string;
  compact?: boolean;
}) {
  const tone = marginTone(result.marginPct, result.profit);
  const width = Math.min(100, Math.max(0, result.marginPct ?? 0));
  const loss = result.profit < 0;
  const title = destination?.trim()
    ? `Marge naar ${destination.trim()}`
    : "Live winst en marge";

  return (
    <aside className="rounded-sm bg-diep p-5 text-ivoor">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ivoor/60">
        Onder aan de streep
      </p>
      <h2 className="mt-1 text-lg font-semibold text-balance text-ivoor">{title}</h2>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Metric label="Opbrengst" value={formatEuro(result.revenue)} />
        <Metric label="Kosten" value={formatEuro(result.costs.total)} />
        <Metric label="Netto winst" value={formatEuro(result.profit)} large />
        <Metric label="Winstmarge" value={formatPct(result.marginPct)} large />
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-sm bg-wit/10">
          <div
            className="h-full rounded-sm bg-ivoor transition-[width] duration-200 ease-out"
            style={{ width: loss ? "0%" : `${width}%` }}
          />
        </div>
        <span className="inline-flex h-7 shrink-0 items-center rounded-sm bg-ivoor px-2 text-xs font-semibold text-diep">
          {marginLabel(tone)}
        </span>
      </div>

      {compact ? <Insight result={result} /> : (
        <>
          <div className="mt-5 border-t border-ivoor/15 pt-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-ivoor/55">
              Kosten onder water
            </p>
            <Row
              label="Brandstof"
              value={formatEuro(result.costs.fuel)}
              hint={
                result.costs.fuelLuxembourg > 0
                  ? `Inclusief tankbeurt Luxemburg ${formatEuro(result.costs.fuelLuxembourg)}`
                  : undefined
              }
            />
            {result.costs.tollLines.map((toll) => (
              <Row key={toll.id} label={toll.label} value={formatEuro(toll.amount)} muted />
            ))}
            <Row
              label="Loonkosten chauffeur"
              value={formatEuro(result.costs.wage)}
              hint={`${daysLabel(result.costs.days)} · ${formatEuro(result.costs.driverDayRate)} per dag · ${formatNumberHours(result.costs.drivingHours)} rijden`}
            />
            {result.costs.depot > 0 ? (
              <Row
                label="Extra depotdagen"
                value={formatEuro(result.costs.depot)}
                hint={`${daysLabel(result.costs.depot / (result.depotDayImpact || 1))} op de loods`}
              />
            ) : null}
            {result.costs.extraLines.map((line) =>
              line.amount ? (
                <Row
                  key={line.id}
                  label={line.label || "Extra kosten"}
                  value={formatEuro(line.amount)}
                  muted
                />
              ) : null,
            )}
          </div>
          <Insight result={result} />
        </>
      )}
    </aside>
  );
}

function Metric({
  label,
  value,
  large,
}: {
  label: string;
  value: string;
  large?: boolean;
}) {
  return (
    <div className="rounded-sm bg-wit/6 px-3 py-2.5">
      <div className="text-xs text-ivoor/60">{label}</div>
      <div
        className={cn(
          "mt-0.5 font-semibold tabular-nums tracking-tight text-ivoor",
          large ? "text-xl md:text-2xl" : "text-base",
        )}
      >
        {value}
      </div>
    </div>
  );
}

export function MobileLiveBar({ result }: { result: MarginResult }) {
  return (
    <div className="fixed inset-x-0 bottom-14 z-20 border-t border-ivoor/15 bg-diep px-3 py-2 text-ivoor md:hidden">
      <dl className="grid grid-cols-4 gap-2 text-center">
        <div>
          <dt className="text-xs text-ivoor/60">Opbrengst</dt>
          <dd className="truncate text-xs font-semibold tabular-nums">{formatEuro(result.revenue)}</dd>
        </div>
        <div>
          <dt className="text-xs text-ivoor/60">Kosten</dt>
          <dd className="truncate text-xs font-semibold tabular-nums">{formatEuro(result.costs.total)}</dd>
        </div>
        <div>
          <dt className="text-xs text-ivoor/60">Winst</dt>
          <dd className="truncate text-xs font-semibold tabular-nums">{formatEuro(result.profit)}</dd>
        </div>
        <div>
          <dt className="text-xs text-ivoor/60">Marge</dt>
          <dd className="truncate text-xs font-semibold tabular-nums">{formatPct(result.marginPct)}</dd>
        </div>
      </dl>
    </div>
  );
}

function Insight({ result }: { result: MarginResult }) {
  const target = result.targetMarginPct;
  const needed = result.returnForTarget;

  if (result.revenue === 0) {
    return (
      <p className="mt-4 text-sm leading-relaxed text-ivoor/80">
        Vul de omzet van de klant in. De kosten van de lijn staan al klaar.
      </p>
    );
  }

  if (result.profit < 0 && result.returnRevenue === 0) {
    return (
      <p className="mt-4 text-sm leading-relaxed text-ivoor/80">
        Lege retour: deze rit staat op {formatEuro(result.profit)}. Voor{" "}
        {formatPct(target)} marge is {formatEuro(needed)} retouromzet nodig.
      </p>
    );
  }

  if (result.profit < 0) {
    return (
      <p className="mt-4 text-sm leading-relaxed text-ivoor/80">
        De kosten liggen {formatEuro(Math.abs(result.profit))} boven de opbrengst.
        Break-even zit op {formatEuro(result.breakEvenRevenue)}.
      </p>
    );
  }

  if ((result.marginPct ?? 0) < target && result.returnRevenue === 0) {
    return (
      <p className="mt-4 text-sm leading-relaxed text-ivoor/80">
        Heen alleen houdt {formatEuro(result.profit)} over. Nog {formatEuro(needed)}{" "}
        retour brengt u op {formatPct(target)} marge.
      </p>
    );
  }

  if ((result.marginPct ?? 0) < target) {
    return (
      <p className="mt-4 text-sm leading-relaxed text-ivoor/80">
        Winst {formatEuro(result.profit)}, onder uw streefmarge van {formatPct(target)}.
        Break-even was {formatEuro(result.breakEvenRevenue)}.
      </p>
    );
  }

  return (
    <p className="mt-4 text-sm leading-relaxed text-ivoor/80">
      Deze rit houdt {formatEuro(result.profit)} over, {formatPct(result.marginPct)}{" "}
      marge. Streefmarge {formatPct(target)} is gehaald.
    </p>
  );
}
