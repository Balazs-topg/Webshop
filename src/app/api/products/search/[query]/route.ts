import { NextResponse, NextRequest } from "next/server";
import productModel from "@/app/api/models/productModel";
import "../../../utils/connectToDB";

export async function GET(
  request: Request,
  { params }: { params: { query: string; action: string } }
) {
  console.log("request recived!");
  const query = params["query"]; // 'a', 'b', or 'c'

  // Find all products
  // const products = await productModel.find();
  // productModel.find({ name: new RegExp(query, "i") }, (err, products) => {
  //   if (err) {
  //     console.error("Error querying the database:", err);
  //     return;
  //   }
  //   console.log(products);
  //   queryResult = products;
  // });
  const queryResult = await productModel.find({ name: new RegExp(query, "i") });

  return NextResponse.json(queryResult, { status: 200 });
}

//boiler plate
// export async function GET(request: Request) {}
export async function HEAD(request: Request) {}
export async function POST(request: Request) {}
export async function PUT(request: Request) {}
export async function DELETE(request: Request) {}
export async function PATCH(request: Request) {}
export async function OPTIONS(request: Request) {}
