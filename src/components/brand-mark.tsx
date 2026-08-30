import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <img
      src="/linea-mark.png"
      alt=""
      width={size}
      height={size}
      className={cn("block rounded-sm object-contain", className)}
    />
  );
}

export function BrandLockup({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <BrandMark size={compact ? 36 : 44} />
      <div className="leading-none">
        <div className={cn("wordmark-linea text-ink", compact ? "text-lg" : "text-xl")}>
          LINEA
        </div>
        <div className={cn("wordmark-transport mt-1 text-xs", compact && "text-xs")}>
          Transport
        </div>
      </div>
    </div>
  );
}
