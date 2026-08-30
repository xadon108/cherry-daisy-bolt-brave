import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Calculator, ClipboardList, Settings2 } from "lucide-react";
import { BrandLockup } from "@/components/brand-mark";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Rekenen", icon: Calculator },
  { to: "/ritten", label: "Ritten", icon: ClipboardList },
  { to: "/kosten", label: "Kosten", icon: Settings2 },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  useHydrated();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-dvh bg-wit text-ink">
      <header className="sticky top-0 z-30 border-b border-ink/10 bg-wit">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:h-[4.5rem] md:px-6">
          <Link to="/" className="min-w-0">
            <span className="md:hidden">
              <BrandLockup compact />
            </span>
            <span className="hidden md:block">
              <BrandLockup />
            </span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => {
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : pathname === item.to || pathname.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "inline-flex h-11 items-center gap-2 rounded-sm px-3 text-sm font-semibold transition-colors duration-150",
                    active ? "bg-kobalt text-wit" : "text-ink hover:bg-ink/5",
                  )}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <p className="hidden text-right text-xs text-warm lg:block">
            Margeplanner
            <span className="mt-0.5 block text-ink">Uw auto reist. U niet.</span>
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 pb-36 pt-6 md:px-6 md:pb-16 md:pt-8">
        {children}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-wit pb-[env(safe-area-inset-bottom)] md:hidden">
        <ul className="grid grid-cols-3">
          {NAV.map((item) => {
            const active =
              item.to === "/"
                ? pathname === "/"
                : pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "flex h-14 flex-col items-center justify-center gap-1 text-xs font-semibold",
                    active ? "text-kobalt" : "text-warm",
                  )}
                >
                  <item.icon className="size-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export function PageIntro({
  kicker,
  title,
  children,
}: {
  kicker?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-8 max-w-2xl">
      {kicker ? (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-warm">{kicker}</p>
      ) : null}
      <h1 className="mt-2 text-3xl font-semibold text-balance md:text-4xl">{title}</h1>
      {children ? <div className="mt-3 text-base text-warm">{children}</div> : null}
    </div>
  );
}


