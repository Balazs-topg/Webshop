import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import productModel from "../../models/productModel";
import "../../utils/connectToDB";

export async function GET(request: NextRequest, response: any) {
  console.log("request recived!");

  // Find all products
  const products = await productModel.find();

  // Convert image buffers to Base64 strings for each product
  const modifiedProducts = products.map(product => {
    const productObj = product.toObject(); // Convert the Mongoose document to a plain JavaScript object
    productObj.imgs = productObj.imgs.map((imgBuffer: Buffer) => imgBuffer.toString('base64'));
    return productObj;
  });

  return NextResponse.json(modifiedProducts, { status: 200 });
}

//boiler plate
// export async function GET(request: Request) {}
export async function HEAD(request: Request) {}
export async function POST(request: Request) {}
export async function PUT(request: Request) {}
export async function DELETE(request: Request) {}
export async function PATCH(request: Request) {}
export async function OPTIONS(request: Request) {}
