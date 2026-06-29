import { db } from "@/db";
import { siteSettings, templates, portfolioItems } from "@/db/schema";
import { defaultSettings, defaultTemplates, defaultPortfolio } from "@/db/defaults";

export async function seedIfEmpty() {
  const existing = await db.select().from(siteSettings).limit(1);
  if (existing.length > 0) return;

  await db.insert(siteSettings).values({
    key: "main",
    value: JSON.stringify(defaultSettings),
  });

  for (const t of defaultTemplates) {
    await db.insert(templates).values({
      externalId: t.id,
      name: t.name,
      description: t.description,
      image: t.image,
      category: t.category,
      price: t.price,
      previewUrl: t.previewUrl,
      features: t.features,
    });
  }

  for (const p of defaultPortfolio) {
    await db.insert(portfolioItems).values({
      externalId: p.id,
      title: p.title,
      description: p.description,
      image: p.image,
      category: p.category,
      link: p.link,
    });
  }
}
