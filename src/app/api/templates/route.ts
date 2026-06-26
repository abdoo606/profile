import { NextRequest, NextResponse } from "next/server";
import {
  getTemplates,
  addTemplate,
  updateTemplate,
  deleteTemplate,
} from "@/lib/data";
import { getSettings } from "@/lib/data";

export async function GET() {
  const templates = await getTemplates();
  return NextResponse.json(templates);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { password, ...data } = body;
  const settings = await getSettings();
  if (password !== settings.adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await addTemplate(data);
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { password, id, ...data } = body;
  const settings = await getSettings();
  if (password !== settings.adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await updateTemplate(id, data);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { password, id } = body;
  const settings = await getSettings();
  if (password !== settings.adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await deleteTemplate(id);
  return NextResponse.json({ success: true });
}
