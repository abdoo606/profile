import { db } from "@/db";
import {
  siteSettings,
  templates,
  portfolioItems,
  orders,
  visitors,
} from "@/db/schema";
import { eq, desc, sql, gte } from "drizzle-orm";
import { defaultSettings, type SiteSettingsData } from "@/db/defaults";
import { seedIfEmpty } from "@/db/seed";

export async function getSettings(): Promise<SiteSettingsData> {
  await seedIfEmpty();
  const rows = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.key, "main"))
    .limit(1);
  if (rows.length === 0) return defaultSettings;
  try {
    return { ...defaultSettings, ...JSON.parse(rows[0].value) };
  } catch {
    return defaultSettings;
  }
}

export async function updateSettings(
  data: Partial<SiteSettingsData>
): Promise<void> {
  const current = await getSettings();
  const merged = { ...current, ...data };
  const existing = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.key, "main"))
    .limit(1);
  if (existing.length === 0) {
    await db.insert(siteSettings).values({
      key: "main",
      value: JSON.stringify(merged),
    });
  } else {
    await db
      .update(siteSettings)
      .set({ value: JSON.stringify(merged) })
      .where(eq(siteSettings.key, "main"));
  }
}

export async function getTemplates() {
  await seedIfEmpty();
  return db.select().from(templates).orderBy(templates.id);
}

export async function getPortfolio() {
  await seedIfEmpty();
  return db.select().from(portfolioItems).orderBy(portfolioItems.id);
}

export async function getOrders() {
  return db.select().from(orders).orderBy(desc(orders.createdAt));
}

export async function addOrder(data: {
  templateId: string;
  templateName: string;
  email: string;
  txHash: string;
  amount: number;
}) {
  const externalId =
    Date.now().toString(36) + Math.random().toString(36).substring(2);
  await db.insert(orders).values({
    externalId,
    templateId: data.templateId,
    templateName: data.templateName,
    email: data.email,
    txHash: data.txHash,
    amount: data.amount,
    status: "pending",
  });
}

export async function updateOrderStatus(
  orderId: number,
  status: string
) {
  const updateData: Record<string, unknown> = { status };
  if (status === "completed") {
    updateData.completedAt = new Date();
  }
  await db.update(orders).set(updateData).where(eq(orders.id, orderId));
}

export async function trackVisitor(
  page: string,
  device?: string,
  referrer?: string
) {
  await db.insert(visitors).values({ page, device, referrer });
}

export async function getVisitorStats() {
  const now = new Date();
  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const weekAgo = new Date(todayStart.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(todayStart.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [totalResult] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(visitors);
  const [todayResult] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(visitors)
    .where(gte(visitors.createdAt, todayStart));
  const [weekResult] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(visitors)
    .where(gte(visitors.createdAt, weekAgo));
  const [monthResult] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(visitors)
    .where(gte(visitors.createdAt, monthAgo));

  const recent = await db
    .select()
    .from(visitors)
    .orderBy(desc(visitors.createdAt))
    .limit(50);

  return {
    total: totalResult.count,
    today: todayResult.count,
    week: weekResult.count,
    month: monthResult.count,
    recentVisitors: recent,
  };
}

export async function getOrderStats() {
  const allOrders = await db.select().from(orders);
  return {
    total: allOrders.length,
    pending: allOrders.filter((o) => o.status === "pending").length,
    completed: allOrders.filter((o) => o.status === "completed").length,
    rejected: allOrders.filter((o) => o.status === "rejected").length,
    revenue: allOrders
      .filter((o) => o.status === "completed")
      .reduce((sum, o) => sum + o.amount, 0),
  };
}

// Template CRUD
export async function addTemplate(data: {
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  previewUrl: string;
  features: string[];
}) {
  const externalId =
    Date.now().toString(36) + Math.random().toString(36).substring(2);
  await db.insert(templates).values({
    externalId,
    ...data,
  });
}

export async function updateTemplate(
  id: number,
  data: Partial<{
    name: string;
    description: string;
    image: string;
    category: string;
    price: number;
    previewUrl: string;
    features: string[];
  }>
) {
  await db.update(templates).set(data).where(eq(templates.id, id));
}

export async function deleteTemplate(id: number) {
  await db.delete(templates).where(eq(templates.id, id));
}

// Portfolio CRUD
export async function addPortfolioItem(data: {
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
}) {
  const externalId =
    Date.now().toString(36) + Math.random().toString(36).substring(2);
  await db.insert(portfolioItems).values({
    externalId,
    ...data,
  });
}

export async function updatePortfolioItem(
  id: number,
  data: Partial<{
    title: string;
    description: string;
    image: string;
    category: string;
    link: string;
  }>
) {
  await db
    .update(portfolioItems)
    .set(data)
    .where(eq(portfolioItems.id, id));
}

export async function deletePortfolioItem(id: number) {
  await db.delete(portfolioItems).where(eq(portfolioItems.id, id));
}
