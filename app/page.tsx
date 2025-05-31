
import { About } from "@/components/landing/About";
import { CTASection } from "@/components/landing/CTASection";
import { Testimonials } from "@/components/landing/Testimonials";
import { Features } from "@/components/landing/Features";
import { Stats } from "@/components/landing/Stats";
import { HeroSection } from "@/components/landing/HeroSection";
import { FAQ } from "@/components/landing/FAQ";
import { Layout } from "@/components/landing/Layout";
import { Pricing } from "@/components/landing/Pricing";

export default function LandingPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <Stats />

      {/* Features Section */}
      <Features />

      {/* Pricing Section */}
      <Pricing />

      {/* Testimonials */}
      <Testimonials />

      {/* About Section */}
      <About />

      {/* FAQ Section */}
      <FAQ />
      {/* CTA Section */}
      <CTASection />
    </Layout>
  );
}
