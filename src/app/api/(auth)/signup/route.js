import { NextResponse } from "next/server";

export default async function POST(requests, response) {
  console.log("api called");
  return NextResponse.json({ error: "Internal Server Error" }, { status: 200 });
}
