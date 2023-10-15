import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import productModel from "../../models/productModel";
import "../../utils/connectToDB";

export async function GET(request: NextRequest, response: any) {
  console.log("request recived!");

  // Find all products
  const products = await productModel.find();

  return NextResponse.json(products, { status: 200 });
}

//boiler plate
// export async function GET(request: Request) {}
export async function HEAD(request: Request) {}
export async function POST(request: Request) {}
export async function PUT(request: Request) {}
export async function DELETE(request: Request) {}
export async function PATCH(request: Request) {}
export async function OPTIONS(request: Request) {}
