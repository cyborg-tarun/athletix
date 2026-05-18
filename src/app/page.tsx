import { Hero } from "@/components/home/hero";
import { StatsStrip } from "@/components/home/stats";
import { SportsGrid } from "@/components/home/sports-grid";
import { FeaturedVenues } from "@/components/home/featured-venues";
import { HowItWorks } from "@/components/home/how-it-works";
import { CitiesMarquee } from "@/components/home/cities-marquee";
import { Testimonials } from "@/components/home/testimonials";
import { EventsSection } from "@/components/home/events-section";
import { AIFeatures } from "@/components/home/ai-features";
import { CTA } from "@/components/home/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <SportsGrid />
      <FeaturedVenues />
      <HowItWorks />
      <CitiesMarquee />
      <AIFeatures />
      <Testimonials />
      <EventsSection />
      <CTA />
    </>
  );
}
