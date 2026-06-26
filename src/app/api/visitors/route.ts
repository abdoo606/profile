import { NextRequest, NextResponse } from "next/server";
import { trackVisitor, getVisitorStats } from "@/lib/data";
import { getSettings } from "@/lib/data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const password = searchParams.get("password");
  const settings = await getSettings();
  if (password !== settings.adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const stats = await getVisitorStats();
  return NextResponse.json(stats);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  await trackVisitor(body.page || "/", body.device, body.referrer);
  return NextResponse.json({ success: true });
}
