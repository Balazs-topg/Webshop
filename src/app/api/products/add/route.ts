import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

import accountModel from "../../models/accountModel";
import productModel from "../../models/productModel";

import "../../utils/connectToDB";

type AddItemType = {
  brand: string;
  category: string;
  imgs: File[];
  name: string;
  tags: string[];
  price: number;
};

export async function POST(request: NextRequest, response: any) {
  console.log("request recived!");

  const reqBody: AddItemType = await request.json();

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

  //check if name alredy exists
  const name = (await productModel.countDocuments({ name: reqBody.name })) > 0;
  if (name) return NextResponse.json({}, { status: 400 });

  //push to db

  //chat

  const newProduct = new productModel({
    name: reqBody.name,
    brand: reqBody.brand,
    category: reqBody.category,
    imgs: "",
    tags: reqBody.tags,
    price: reqBody.price,
  });
  await newProduct.save();

  return NextResponse.json(
    { message: "successfully added item" },
    { status: 200 }
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
