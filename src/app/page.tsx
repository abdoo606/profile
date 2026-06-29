import { getSettings, getTemplates, getPortfolio } from "@/lib/data";
import ClientApp from "@/components/ClientApp";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, rawTemplates, rawPortfolio] = await Promise.all([
    getSettings(),
    getTemplates(),
    getPortfolio(),
  ]);

  const templates = rawTemplates.map((t) => ({
    ...t,
    createdAt: t.createdAt ? t.createdAt.toISOString() : null,
  }));

  const portfolio = rawPortfolio.map((p) => ({
    ...p,
    createdAt: p.createdAt ? p.createdAt.toISOString() : null,
  }));

  return (
    <ClientApp
      initialSettings={settings}
      initialTemplates={templates}
      initialPortfolio={portfolio}
    />
  );
}
