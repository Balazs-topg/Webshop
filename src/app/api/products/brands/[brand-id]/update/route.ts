import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import AccountModel from "../../../../models/AccountModel";
import CategoryModel from "@/app/api/models/CategoryModel";
import "../../../../utils/connectToDB";
import { addCategoryRequest } from "../../../categories/add/route";
import BrandModel from "@/app/api/models/BrandModel";
import getUser from "@/app/api/utils/getUser";

export async function PUT(
  request: Request,
  { params }: { params: { "brand-id": string; action: string } }
) {
  const brandId = params["brand-id"]; // 'a', 'b', or 'c'
  const reqBody: addCategoryRequest = await request.json();

  const user = await getUser(request);
  //*Checks if admin
  const isAdmin = user ? user.isAdmin : false;
  if (!isAdmin) return NextResponse.json({}, { status: 401 });

  const category = await BrandModel.findByIdAndUpdate(brandId, reqBody);

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
