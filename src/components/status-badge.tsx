import { cn } from "@/lib/utils";
import type { TripStatus } from "@/lib/types";
import { marginLabel, marginTone } from "@/lib/calc";

const STATUS: Record<TripStatus, string> = {
  aanvraag: "Aanvraag",
  gepland: "Gepland",
  afgerond: "Afgerond",
};

export function StatusBadge({ status }: { status: TripStatus }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-sm px-2 text-xs font-semibold",
        status === "aanvraag" && "bg-ivoor text-diep",
        status === "gepland" && "bg-kobalt text-wit",
        status === "afgerond" && "bg-diep text-ivoor",
      )}
    >
      {STATUS[status]}
    </span>
  );
}

export function MarginBadge({
  marginPct,
  profit,
}: {
  marginPct: number | null;
  profit: number;
}) {
  const tone = marginTone(marginPct, profit);
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-sm px-2 text-xs font-semibold",
        tone === "loss" && "bg-diep text-ivoor",
        tone === "tight" && "bg-ivoor text-diep",
        tone === "ok" && "bg-ivoor text-ink",
        tone === "healthy" && "bg-kobalt text-wit",
        tone === "neutral" && "bg-ink/5 text-warm",
      )}
    >
      {marginLabel(tone)}
    </span>
  );
}
