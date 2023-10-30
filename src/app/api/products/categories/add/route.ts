import { NextResponse, NextRequest } from "next/server";
import CategoryModel from "@/app/api/models/CategoryModel";
import "../../../utils/connectToDB";
import getUser from "@/app/api/utils/getUser";

export type addCategoryRequest = {
  name?: string;
};

export async function POST(request: NextRequest, response: any) {
  console.log("request recived!");

  const reqBody: addCategoryRequest = await request.json();

  const user = await getUser(request);
  const isAdmin = user ? user.isAdmin : false;
  if (!isAdmin) return NextResponse.json({}, { status: 401 });

  //check if it alredy exists
  const category =
    (await CategoryModel.countDocuments({ name: reqBody.name })) > 0;
  if (category) return NextResponse.json({}, { status: 400 });

  //push to db
  const newCategory = new CategoryModel({
    name: reqBody.name,
  });
  await newCategory.save();

  return NextResponse.json({}, { status: 200 });
}

//boiler plate
export async function GET(request: Request) {}
export async function HEAD(request: Request) {}
// export async function POST(request) {}
export async function PUT(request: Request) {}
export async function DELETE(request: Request) {}
export async function PATCH(request: Request) {}
export async function OPTIONS(request: Request) {}
