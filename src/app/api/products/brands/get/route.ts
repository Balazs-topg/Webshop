import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import accountModel from "../../../models/accountModel";
import brandModel from "@/app/api/models/brandModel";
import "../../../utils/connectToDB";

export async function GET(request: NextRequest, response: any) {
  console.log("request recived!");

  const reqJwt = request.headers.get("jwt");

  //authenticate jwt - if invalid then return 40
  if (!reqJwt) return NextResponse.json({}, { status: 401 });
  const decodedJwt = jwt.verify(reqJwt, process.env.JWT_SECRET_KEY!);
  if (!(decodedJwt && typeof decodedJwt === "object" && "id" in decodedJwt))
    return NextResponse.json({}, { status: 401 });
  const userId = decodedJwt.id;
  if (!userId) return false;
  const user = await accountModel.findById(userId);
  const isAdmin = user ? user.isAdmin : false;
  if (!isAdmin) return NextResponse.json({}, { status: 401 });

  //find all
  const brands = await brandModel.find();

  return NextResponse.json(brands, { status: 200 });
}

//boiler plate
// export async function GET(request: Request) {}
export async function HEAD(request: Request) {}
export async function POST(request: Request) {}
export async function PUT(request: Request) {}
export async function DELETE(request: Request) {}
export async function PATCH(request: Request) {}
export async function OPTIONS(request: Request) {}
