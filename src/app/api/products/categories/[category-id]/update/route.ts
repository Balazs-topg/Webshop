import { NextResponse, NextRequest } from "next/server";
import CategoryModel from "@/app/api/models/CategoryModel";
import "../../../../utils/connectToDB";
import { addCategoryRequest } from "../../add/route";
import getUser from "@/app/api/utils/getUser";

export async function PUT(
  request: Request,
  { params }: { params: { "category-id": string; action: string } },
) {
  console.log("request recived for delete!");

  const reqJwt = request.headers.get("jwt");
  const categoryId = params["category-id"]; // 'a', 'b', or 'c'
  const reqBody: addCategoryRequest = await request.json();

  const user = await getUser(request);
  const isAdmin = user ? user.isAdmin : false;
  if (!isAdmin) return NextResponse.json({}, { status: 401 });

  await CategoryModel.findByIdAndUpdate(categoryId, reqBody);

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
