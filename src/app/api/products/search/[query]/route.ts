import { NextResponse, NextRequest } from "next/server";
import productModel from "@/app/api/models/productModel";
import "../../../utils/connectToDB";
import brandModel from "@/app/api/models/brandModel";

const getBrandNames = async (products: any[]) => {
  const updatedProducts = await Promise.all(
    products.map(async (product: any) => {
      const frozenProduct = product.toObject(); // Convert Mongoose document to plain object
      const brand = await brandModel.findById("" + product.brand);
      frozenProduct.brandName = brand && brand.name;
      return frozenProduct;
    })
  );
  return updatedProducts;
};

export async function GET(
  request: Request,
  { params }: { params: { query: string; action: string } }
) {
  console.log("request recived!");
  const query = params["query"]; // 'a', 'b', or 'c'

  const queryResult = await productModel.find({ name: new RegExp(query, "i") });
  const queryResultWithBrandNames = await getBrandNames(queryResult);

  return NextResponse.json(queryResultWithBrandNames, { status: 200 });
}

//boiler plate
// export async function GET(request: Request) {}
export async function HEAD(request: Request) {}
export async function POST(request: Request) {}
export async function PUT(request: Request) {}
export async function DELETE(request: Request) {}
export async function PATCH(request: Request) {}
export async function OPTIONS(request: Request) {}
