/**
 * Mock integration feeds — She360 (women / health / empowerment) and Resilience360 (climate).
 * Used by the API recommendation builder and available to the frontend for previews.
 */

export const she360WomenPrograms = [
  {
    title: "Women Health Program — Punjab",
    baseImpact: 92,
    region: "Pakistan",
    description: "AI-matched high-impact maternal and reproductive health outreach in peri-urban Punjab.",
    sdg: "SDG 3",
    tags: ["women", "healthcare"],
  },
  {
    title: "She360 Economic Circles — Karachi",
    baseImpact: 87,
    region: "Pakistan",
    description: "Microfinance literacy and safe digital payments for women-led MSMEs in Korangi.",
    sdg: "SDG 5",
    tags: ["women"],
  },
  {
    title: "Girls' STEM Bridge — Lahore",
    baseImpact: 84,
    region: "Pakistan",
    description: "Secondary STEM coaching and safe transport stipends to reduce female dropout.",
    sdg: "SDG 4",
    tags: ["women", "education"],
  },
  {
    title: "Rural CHW Supervision — Swabi",
    baseImpact: 89,
    region: "Pakistan",
    description: "Community health worker supervision and family planning counselling in underserved tehsils.",
    sdg: "SDG 3",
    tags: ["women", "healthcare"],
  },
];

export const resilience360ClimatePrograms = [
  {
    title: "Climate Flood Resilience — Indus Basin",
    baseImpact: 88,
    region: "South Asia",
    description: "Climate adaptation program: early warning, evacuation drills, and PDMA-aligned alert trees.",
    sdg: "SDG 13",
    tags: ["climate"],
  },
  {
    title: "Thar Water Safety & Solar RO",
    baseImpact: 86,
    region: "Pakistan",
    description: "Household water safety mapping and solar-powered reverse-osmosis kiosks in Tharparkar.",
    sdg: "SDG 6",
    tags: ["climate"],
  },
  {
    title: "Urban Heat Resilience — Multan",
    baseImpact: 83,
    region: "Pakistan",
    description: "Cool roofs, hydration points, and heat-stress training for frontline health workers.",
    sdg: "SDG 13",
    tags: ["climate"],
  },
  {
    title: "Mangrove & Coastal Livelihoods — Badin",
    baseImpact: 85,
    region: "Pakistan",
    description: "Community nurseries and women-led ecotourism pilots along the Sindh coast.",
    sdg: "SDG 14",
    tags: ["climate"],
  },
];

export const crossCutPrograms = [
  {
    title: "Integrated WASH & Nutrition — Quetta",
    baseImpact: 81,
    region: "Pakistan",
    description: "Cross-sector program linking malnutrition protocols with resilient water access.",
    sdg: "SDG 2",
    tags: ["healthcare", "climate"],
  },
];
