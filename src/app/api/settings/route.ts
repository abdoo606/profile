import { NextRequest, NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/data";

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { password, ...data } = body;

  // Verify admin password
  const settings = await getSettings();
  if (password !== settings.adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await updateSettings(data);
  return NextResponse.json({ success: true });
}
