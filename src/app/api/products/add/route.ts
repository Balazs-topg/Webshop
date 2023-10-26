import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import accountModel from "../../models/accountModel";
import productModel from "../../models/productModel";
import "../../utils/connectToDB";

export async function POST(request: NextRequest) {
  console.log("request recived!");

  const reqBody: any = await request.json();

  const reqJwt = request.headers.get("jwt");

  // Authenticate JWT
  if (!reqJwt) return NextResponse.json({}, { status: 401 });
  const decodedJwt = jwt.verify(reqJwt, process.env.JWT_SECRET_KEY!);
  if (!(decodedJwt && typeof decodedJwt === "object" && "id" in decodedJwt))
    return NextResponse.json({}, { status: 401 });
  const userId = decodedJwt.id;
  if (!userId) return NextResponse.json({}, { status: 401 });
  const user = await accountModel.findById(userId);
  const isAdmin = user ? user.isAdmin : false;
  if (!isAdmin) return NextResponse.json({}, { status: 401 });

  // Check if name already exists
  const name = (await productModel.countDocuments({ name: reqBody.name })) > 0;
  if (name) return NextResponse.json({}, { status: 400 });

  // Push to db
  const newProduct = new productModel({
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
