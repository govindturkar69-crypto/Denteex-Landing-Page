import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";

const OdontogramPlayground = dynamic(() =>
  import("@/components/sections/odontogram-playground").then(
    (m) => m.OdontogramPlayground
  )
);
const Features = dynamic(() =>
  import("@/components/sections/features").then((m) => m.Features)
);
const ProductShowcase = dynamic(() =>
  import("@/components/sections/product-showcase").then(
    (m) => m.ProductShowcase
  )
);
const BeforeAfter = dynamic(() =>
  import("@/components/sections/before-after").then((m) => m.BeforeAfter)
);
const AIXrayHighlight = dynamic(() =>
  import("@/components/sections/ai-xray-highlight").then(
    (m) => m.AIXrayHighlight
  )
);
const ROICalculator = dynamic(() =>
  import("@/components/sections/roi-calculator").then((m) => m.ROICalculator)
);
const Stats = dynamic(() =>
  import("@/components/sections/stats").then((m) => m.Stats)
);
const Testimonials = dynamic(() =>
  import("@/components/sections/testimonials").then((m) => m.Testimonials)
);
const Pricing = dynamic(() =>
  import("@/components/sections/pricing").then((m) => m.Pricing)
);
const FAQ = dynamic(() =>
  import("@/components/sections/faq").then((m) => m.FAQ)
);
const CTABanner = dynamic(() =>
  import("@/components/sections/cta-banner").then((m) => m.CTABanner)
);

export default function Home() {
  return (
    <>
      <Hero />
      <OdontogramPlayground />
      <Features />
      <ProductShowcase />
      <BeforeAfter />
      <AIXrayHighlight />
      <ROICalculator />
      <Stats />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTABanner />
    </>
  );
}
