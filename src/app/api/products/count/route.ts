import { NextResponse, NextRequest } from "next/server";
import ProductModel from "../../models/ProductModel";
import "../../utils/connectToDB";

export async function GET(request: NextRequest, response: any) {
  const count = await ProductModel.count();
  return NextResponse.json({ count: count }, { status: 200 });
}

//boiler plate
// export async function GET(request: Request) {}
export async function HEAD(request: Request) {}
export async function POST(request: Request) {}
export async function PUT(request: Request) {}
export async function DELETE(request: Request) {}
export async function PATCH(request: Request) {}
export async function OPTIONS(request: Request) {}
