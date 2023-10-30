import { NextResponse, NextRequest } from "next/server";
import TagModel from "@/app/api/models/TagModel";

import "../../../utils/connectToDB";
import getUser from "@/app/api/utils/getUser";

type addCategoryRequest = {
  name?: string;
};

export async function POST(request: NextRequest, response: any) {
  console.log("request recived!");

  const reqBody: addCategoryRequest = await request.json();

  const user = await getUser(request);
  const isAdmin = user ? user.isAdmin : false;
  if (!isAdmin) return NextResponse.json({}, { status: 401 });

  //check if it alredy exists
  const tag = (await TagModel.countDocuments({ name: reqBody.name })) > 0;
  if (tag) return NextResponse.json({}, { status: 400 });

  //push to db
  const newTag = new TagModel({
    name: reqBody.name,
  });
  await newTag.save();

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
