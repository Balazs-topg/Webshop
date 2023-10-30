import { NextResponse, NextRequest } from "next/server";
import BrandModel from "@/app/api/models/BrandModel";
import "../../../utils/connectToDB";
import getUser from "@/app/api/utils/getUser";

export async function GET(request: NextRequest, response: any) {
  console.log("request recived!");

  const user = await getUser(request);
  //*Checks if admin
  const isAdmin = user ? user.isAdmin : false;
  if (!isAdmin) return NextResponse.json({}, { status: 401 });

  //find all
  const brands = await BrandModel.find();

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
