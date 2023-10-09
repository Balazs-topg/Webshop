import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

import accountModel from "../../../models/accountModel";
import tagModel from "@/app/api/models/tagModel";

import "../../../utils/connectToDB";
import bcrypt from "bcrypt";
import { createJwt } from "../../../utils/createJwt";

type addCategoryRequest = {
  name?: string;
};

export async function POST(request: NextRequest, response: any) {
  console.log("request recived!");

  const reqBody: addCategoryRequest = await request.json();
  const reqJwt = request.headers.get("jwt");

  //authenticate jwt - if invalid then return 40
  if (!reqJwt) return NextResponse.json({}, { status: 401 });
  const decodedJwt = jwt.decode(reqJwt);
  if (!(decodedJwt && typeof decodedJwt === "object" && "id" in decodedJwt))
    return NextResponse.json({}, { status: 401 });
  const userId = decodedJwt.id;
  if (!userId) return false;
  const user = await accountModel.findById(userId);
  const isAdmin = user ? user.isAdmin : false;
  if (!isAdmin) return NextResponse.json({}, { status: 401 });

  //check if it alredy exists
  const tag = (await tagModel.countDocuments({ name: reqBody.name })) > 0;
  if (tag) return NextResponse.json({}, { status: 400 });

  //push to db
  const newTag = new tagModel({
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
