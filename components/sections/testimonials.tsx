import { Quote, Star } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { testimonial } from "@/lib/content";

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <RevealOnScroll className="glass glow-ring relative rounded-3xl p-8 text-center sm:p-12">
          <Quote className="mx-auto size-8 text-primary/40" aria-hidden="true" />
          <p className="mt-4 text-balance font-heading text-xl font-medium sm:text-2xl">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <div className="mt-6 flex items-center justify-center gap-1 text-coral-glow">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-current" />
            ))}
          </div>
          <div className="mt-3">
            <p className="text-sm font-semibold">{testimonial.author}</p>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
