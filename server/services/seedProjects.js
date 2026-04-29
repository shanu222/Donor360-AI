import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Project } from "../models/Project.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function resolveProjectsPath() {
  const fromServer = path.join(__dirname, "..", "..", "public", "data", "projects.json");
  if (fs.existsSync(fromServer)) return fromServer;
  return path.join(process.cwd(), "public", "data", "projects.json");
}

export async function seedProjectsFromFile() {
  const filePath = resolveProjectsPath();
  if (!fs.existsSync(filePath)) {
    console.warn("seedProjectsFromFile: missing file", filePath);
    return;
  }
  const raw = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const items = Array.isArray(raw) ? raw : raw.projects;
  if (!items?.length) return;

  for (const row of items) {
    await Project.updateOne(
      { slug: row.slug },
      {
        $set: {
          slug: row.slug,
          title: row.title,
          category: row.category,
          location: row.location,
          impactScore: row.impactScore,
          urgencyScore: row.urgencyScore,
          scaleScore: row.scaleScore,
          minBudget: row.minBudget,
          dataSource: row.dataSource,
          description: row.description,
          beneficiaryEstimate: row.beneficiaryEstimate ?? 1500,
          impactPerThousandUsd: row.impactPerThousandUsd ?? 18,
        },
      },
      { upsert: true }
    );
  }
  console.log(`Projects seed synced (${items.length} definitions)`);
}
