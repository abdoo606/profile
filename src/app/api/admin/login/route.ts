import { NextRequest, NextResponse } from "next/server";
import { getSettings } from "@/lib/data";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const settings = await getSettings();
  if (password === settings.adminPassword) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: "Wrong password" }, { status: 401 });
}
