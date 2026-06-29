import { NextRequest, NextResponse } from "next/server";
import { getPortfolio, addPortfolioItem, updatePortfolioItem, deletePortfolioItem } from "@/lib/data";
import { getSettings } from "@/lib/data";

export async function GET() {
  const items = await getPortfolio();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { password, ...data } = body;
  const settings = await getSettings();
  if (password !== settings.adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await addPortfolioItem(data);
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { password, id, ...data } = body;
  const settings = await getSettings();
  if (password !== settings.adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await updatePortfolioItem(id, data);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { password, id } = body;
  const settings = await getSettings();
  if (password !== settings.adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await deletePortfolioItem(id);
  return NextResponse.json({ success: true });
}
