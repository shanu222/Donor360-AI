import { useCallback, useState } from "react";
import { HeroSection } from "@/app/components/HeroSection";
import { DonorInputPanel } from "@/app/components/DonorInputPanel";
import { AIResults } from "@/app/components/AIResults";
import { ImpactDashboard } from "@/app/components/ImpactDashboard";
import { TrustSection } from "@/app/components/TrustSection";
import { IntegrationSection } from "@/app/components/IntegrationSection";
import { CTASection } from "@/app/components/CTASection";
import { Footer } from "@/app/components/Footer";
import { postRecommend, type DonorPreferences, type RecommendationItem } from "@/lib/api";
import { toast } from "sonner";

export function HomePage() {
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [lastPrefs, setLastPrefs] = useState<DonorPreferences | null>(null);

  const handleGenerate = useCallback(async (prefs: DonorPreferences) => {
    setLoading(true);
    setError(null);
    setShowResults(true);
    setLastPrefs(prefs);
    try {
      const items = await postRecommend(prefs);
      setRecommendations(items);
      toast.success("Recommendations ready", { description: `${items.length} high-impact matches from the API.` });
      requestAnimationFrame(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      });
    } catch (e) {
      setRecommendations([]);
      setError(e instanceof Error ? e.message : "Could not load recommendations");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <div id="finder">
        <DonorInputPanel onGenerateRecommendations={handleGenerate} loading={loading} error={error} />
      </div>
      <div id="results">
        <AIResults
          isVisible={showResults}
          loading={loading}
          error={error}
          recommendations={recommendations}
        />
        <ImpactDashboard
          isVisible={showResults && !loading && recommendations.length > 0}
          recommendations={recommendations}
          budget={lastPrefs?.budget}
        />
      </div>
      <TrustSection />
      <div id="ecosystem">
        <IntegrationSection />
      </div>
      <CTASection />
      <Footer />
    </div>
  );
}
