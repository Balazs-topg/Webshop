import { NextResponse, NextRequest } from "next/server";
import BrandModel from "@/app/api/models/BrandModel";
import "../../../utils/connectToDB";

import getUser from "@/app/api/utils/getUser";

type addBrandRequest = {
  name?: string;
};

export async function POST(request: NextRequest, response: any) {
  console.log("request recived!");

  const reqBody: addBrandRequest = await request.json();

  const user = await getUser(request);
  //*Checks if admin
  const isAdmin = user ? user.isAdmin : false;
  if (!isAdmin) return NextResponse.json({}, { status: 401 });

  //check if it alredy exists
  const brand = (await BrandModel.countDocuments({ name: reqBody.name })) > 0;
  if (brand) return NextResponse.json({}, { status: 400 });

  //push to db
  const newBrand = new BrandModel({
    name: reqBody.name,
  });
  await newBrand.save();

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
