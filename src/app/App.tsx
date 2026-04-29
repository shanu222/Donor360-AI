import { useState } from "react";
import { HeroSection } from "./components/HeroSection";
import { DonorInputPanel } from "./components/DonorInputPanel";
import { AIResults } from "./components/AIResults";
import { ImpactDashboard } from "./components/ImpactDashboard";
import { TrustSection } from "./components/TrustSection";
import { IntegrationSection } from "./components/IntegrationSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";

export default function App() {
  const [showResults, setShowResults] = useState(false);

  const handleGenerateRecommendations = () => {
    setShowResults(true);
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <HeroSection />
      <DonorInputPanel onGenerateRecommendations={handleGenerateRecommendations} />
      <div id="results">
        <AIResults isVisible={showResults} />
        <ImpactDashboard isVisible={showResults} />
      </div>
      <TrustSection />
      <IntegrationSection />
      <CTASection />
      <Footer />
    </div>
  );
}