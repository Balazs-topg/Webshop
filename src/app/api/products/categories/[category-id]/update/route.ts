import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import accountModel from "../../../../models/accountModel";
import categoryModel from "@/app/api/models/categoryModel";
import "../../../../utils/connectToDB";
import { addCategoryRequest } from "../../add/route";

export async function PUT(
  request: Request,
  { params }: { params: { "category-id": string; action: string } }
) {
  console.log("request recived for delete!");

  const reqJwt = request.headers.get("jwt");
  const categoryId = params["category-id"]; // 'a', 'b', or 'c'
  const reqBody: addCategoryRequest = await request.json();

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

  const category = await categoryModel.findByIdAndUpdate(categoryId, reqBody);

  return NextResponse.json({ status: 200 });
}

//boiler plate
export async function GET(request: Request) {}
export async function HEAD(request: Request) {}
export async function POST(request: Request) {}
// export async function PUT(request: Request) {}
export async function DELETE(request: Request) {}
export async function PATCH(request: Request) {}
export async function OPTIONS(request: Request) {}
