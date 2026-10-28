import { AO, BR, CV, EU, GQ, GW, MO, MZ, PT, ST, TL, US } from "country-flag-icons/react/3x2";
import { cn } from "@/lib/cn";

const flags = { ao: AO, br: BR, eu: EU, cv: CV, gq: GQ, gw: GW, mo: MO, mz: MZ, pt: PT, st: ST, tl: TL, us: US } as const;

export function Flag({ code, className, title }: { code: string; className?: string; title?: string }) {
  const Cmp = flags[code as keyof typeof flags];
  if (!Cmp) return null;
  return (
    <Cmp
      title={title}
      aria-hidden={title ? undefined : true}
      className={cn("block h-auto overflow-hidden rounded-[4px] shadow-[0_0_0_1px_rgb(0_0_0/0.08)]", className)}
    />
  );
}
