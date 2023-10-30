import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import AccountModel from "../../../../models/AccountModel";
import BrandModel from "@/app/api/models/BrandModel";
import "../../../../utils/connectToDB";
import getUser from "@/app/api/utils/getUser";

export async function DELETE(
  request: Request,
  { params }: { params: { "brand-id": string; action: string } }
) {
  console.log("request recived!");

  const brandId = params["brand-id"]; // 'a', 'b', or 'c'

  const user = await getUser(request);
  const isAdmin = user ? user.isAdmin : false;
  //*Checks if admin
  if (!isAdmin) return NextResponse.json({}, { status: 401 });

  const brand = await BrandModel.findByIdAndDelete(brandId);

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
