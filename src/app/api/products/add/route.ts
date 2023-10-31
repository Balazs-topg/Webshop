import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import AccountModel from "../../models/AccountModel";
import ProductModel from "../../models/ProductModel";
import "../../utils/connectToDB";
import getUser from "../../utils/getUser";

export async function POST(request: NextRequest) {
  console.log("request recived!");

  const reqBody: any = await request.json();

  const reqJwt = request.headers.get("jwt");

  const user = await getUser(request);
  //*Checks if admin
  const isAdmin = user ? user.isAdmin : false;
  if (!isAdmin) return NextResponse.json({}, { status: 401 });

  // Check if name already exists
  const name = (await ProductModel.countDocuments({ name: reqBody.name })) > 0;
  if (name) return NextResponse.json({}, { status: 400 });

  // Push to db
  const newProduct = new ProductModel({
    name: reqBody.name,
    brand: reqBody.brand,
    category: reqBody.category,
    imgs: reqBody.imgs,
    tags: reqBody.tags,
    price: reqBody.price,
  });
  await newProduct.save();

  return NextResponse.json(
    { message: "successfully added item" },
    { status: 200 },
  );
}

//boiler plate
export async function GET(request: Request) {}
export async function HEAD(request: Request) {}
// export async function POST(request) {}
export async function PUT(request: Request) {}
export async function DELETE(request: Request) {}
export async function PATCH(request: Request) {}
export async function OPTIONS(request: Request) {}
