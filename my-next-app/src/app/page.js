import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import PortfolioPreview from '@/components/home/PortfolioPreview';
import ServicesSection from '@/components/home/ArchitecturalDesignPage';
import ContactSection from '@/components/home/ContactSection';
import ArchitecturalDesignPage from '@/components/home/ArchitecturalDesignPage';
import UrbanPlanningPage from '@/components/home/UrbanPlanningPage';
import InteriorDesignPage from '@/components/home/InteriorDesignPage';

export default function Home() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <AboutSection />
      <PortfolioPreview />
      <ArchitecturalDesignPage />
      <UrbanPlanningPage />
      <InteriorDesignPage />
      <ContactSection />
    </main>
  );
}
