import { motion } from "motion/react";
import { BookOpen, Database, Cpu, Shield } from "lucide-react";

export function ResearchPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm mb-4">
          <BookOpen className="w-4 h-4" />
          Research & methodology
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-4">
          Evidence-led donor intelligence
        </h1>
        <p className="text-slate-400 text-lg">
          How Donor360 AI ranks interventions, where data originates, and how we communicate uncertainty to
          funders and public-sector partners.
        </p>
      </motion.div>

      <section className="space-y-10 text-slate-300 leading-relaxed">
        <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="text-xl text-white font-semibold mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            Problem statement
          </h2>
          <p>
            Philanthropic capital often misses high-leverage windows because information is fragmented across NGOs,
            climate observatories, and women&apos;s economic empowerment programs. Donor360 AI aggregates structured
            program signals—impact, urgency, reach, and budget fit—to surface defensible matches for institutional and
            retail donors.
          </p>
        </article>

        <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="text-xl text-white font-semibold mb-3 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            AI &amp; ranking methodology
          </h2>
          <p className="mb-4">
            The recommendation engine is <span className="text-white">deterministic and auditable</span>: for each
            project we compute a composite score:
          </p>
          <pre className="text-sm bg-slate-950/80 border border-white/10 rounded-xl p-4 text-cyan-200 overflow-x-auto mb-4">
            score = 0.5 × impactScore + 0.3 × priorityAxis + 0.2 × budgetCompatibility
          </pre>
          <p className="mb-2">
            <span className="text-white">Priority axis</span> depends on donor choice: Maximum Reach uses{" "}
            <code className="text-cyan-300">scaleScore</code>, Urgent Needs uses{" "}
            <code className="text-cyan-300">urgencyScore</code>, Long-Term Impact doubles down on{" "}
            <code className="text-cyan-300">impactScore</code> for the priority term.
          </p>
          <p>
            Budget compatibility maps your stated budget against each program&apos;s minimum viable envelope—programs
            remain visible with transparent scoring rather than silent exclusion, so donors can see trade-offs.
          </p>
        </article>

        <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="text-xl text-white font-semibold mb-3 flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            Data sources
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="text-white">She360</span> — women&apos;s health, education, and economic empowerment
              interventions ingested as curated project records.
            </li>
            <li>
              <span className="text-white">Resilience360</span> — climate adaptation, early warning, and infrastructure
              resilience programs with comparable scoring dimensions.
            </li>
            <li>
              <span className="text-white">Internal / blended</span> — cross-cutting programs where both gender and
              climate resilience co-benefits are material.
            </li>
          </ul>
          <p className="mt-4 text-sm text-slate-500">
            Production deployments should attach provenance IDs, M&amp;E PDFs, and API sync timestamps per project row.
            This repository ships representative structured records for demonstration and UX validation.
          </p>
        </article>

        <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="text-xl text-white font-semibold mb-3">Impact model (simulation layer)</h2>
          <p>
            The donation simulator translates contribution amounts into <span className="text-white">modelled</span>{" "}
            beneficiary touchpoints using each project&apos;s <code className="text-cyan-300">impactPerThousandUsd</code>{" "}
            and <code className="text-cyan-300">impactScore</code> uplift. Figures are indicative for allocation
            conversations—not audited outcome guarantees. Full deployments should wire to longitudinal outcome APIs.
          </p>
        </article>
      </section>
    </div>
  );
}
