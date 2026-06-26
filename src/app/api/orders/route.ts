import { NextRequest, NextResponse } from "next/server";
import { getOrders, addOrder, updateOrderStatus, getOrderStats } from "@/lib/data";
import { getSettings } from "@/lib/data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const stats = searchParams.get("stats");
  if (stats === "true") {
    const orderStats = await getOrderStats();
    return NextResponse.json(orderStats);
  }
  const allOrders = await getOrders();
  return NextResponse.json(allOrders);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  await addOrder(body);
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { password, id, status } = body;
  const settings = await getSettings();
  if (password !== settings.adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await updateOrderStatus(id, status);
  return NextResponse.json({ success: true });
}
