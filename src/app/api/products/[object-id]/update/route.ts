import { NextResponse, NextRequest } from "next/server";
import ProductModel from "@/app/api/models/ProductModel";
import "../../../utils/connectToDB";
import getUser from "@/app/api/utils/getUser";

export async function PUT(
  request: Request,
  { params }: { params: { "object-id": string; action: string } },
) {
  const reqBody: any = await request.json();
  const objectId = params["object-id"]; // 'a', 'b', or 'c'

  const user = await getUser(request);
  //*Checks if admin
  const isAdmin = user ? user.isAdmin : false;
  if (!isAdmin) return NextResponse.json({ status: 401 });

  await ProductModel.findByIdAndUpdate(objectId, reqBody);

  return NextResponse.json(
    { message: "successfully updated item" },
    { status: 200 },
  );
}

//boiler plate
export async function GET(request: Request) {}
export async function HEAD(request: Request) {}
export async function POST(request: Request) {}
// export async function PUT(request: Request) {}
export async function DELETE(request: Request) {}
export async function PATCH(request: Request) {}
export async function OPTIONS(request: Request) {}
