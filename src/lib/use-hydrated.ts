import { useEffect } from "react";
import { useAppStore } from "./store";

/** Rehydrate persisted ritten once on the client. First paint uses defaults (SSR-safe). */
export function useHydrated() {
  useEffect(() => {
    void Promise.resolve(useAppStore.persist.rehydrate());
  }, []);
  return true;
}
