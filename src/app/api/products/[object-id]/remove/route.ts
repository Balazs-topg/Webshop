import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import accountModel from "@/app/api/models/accountModel";
import productModel from "@/app/api/models/productModel";
import "../../../utils/connectToDB";

export async function DELETE(
  request: Request,
  { params }: { params: { "object-id": string } }
) {
  console.log("request recived!");

  const objectId = params["object-id"]; // 'a', 'b', or 'c'
  console.log(objectId);

  const reqJwt = request.headers.get("jwt");

  // Authenticate JWT
  if (!reqJwt) return NextResponse.json({}, { status: 401 });
  const decodedJwt = jwt.verify(reqJwt, process.env.JWT_SECRET_KEY!);
  if (!(decodedJwt && typeof decodedJwt === "object" && "id" in decodedJwt))
    return NextResponse.json({}, { status: 401 });
  const userId = decodedJwt.id;
  if (!userId) return NextResponse.json({}, { status: 401 });
  const user = await accountModel.findById(userId);
  const isAdmin = user ? user.isAdmin : false;
  if (!isAdmin) return NextResponse.json({}, { status: 401 });

  // remove from db
  await productModel.findByIdAndDelete(String(objectId));

  return NextResponse.json({ status: 200 });
}

//boiler plate
export async function GET(request: Request) {}
export async function HEAD(request: Request) {}
export async function POST(request: Request) {}
export async function PUT(request: Request) {}
// export async function DELETE(request: Request) {}
export async function PATCH(request: Request) {}
export async function OPTIONS(request: Request) {}
