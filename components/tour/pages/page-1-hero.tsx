import { HeroScene } from "@/components/three/hero-scene";
import { page1Hero } from "@/lib/tour-content";

export function Page1Hero() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 py-16 text-center sm:min-h-[75vh]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-glow/15 blur-[120px] sm:h-[28rem] sm:w-[28rem]" />
      </div>

      <div className="relative mx-auto h-56 w-56 sm:h-72 sm:w-72">
        <HeroScene />
      </div>

      <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        {page1Hero.eyebrow}
      </span>
      <h1 className="text-gradient mt-4 font-heading text-5xl font-bold tracking-tight sm:text-6xl">
        {page1Hero.brand}
      </h1>
      <p className="mt-3 max-w-2xl text-xl font-medium text-foreground/90 sm:text-2xl">
        {page1Hero.headline}
      </p>
      <p className="mt-4 max-w-xl text-pretty text-muted-foreground">
        {page1Hero.body}
      </p>
    </div>
  );
}
