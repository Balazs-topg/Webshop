import { NextResponse } from "next/server";

export async function POST() {
  console.log("api called");
  return NextResponse.json({ success: true }, { status: 200 });
}
