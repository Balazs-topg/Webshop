import { NextResponse, NextRequest } from "next/server";
import productModel from "@/app/api/models/productModel";
import "../../../utils/connectToDB";
import brandModel from "@/app/api/models/brandModel";
import tagModel from "@/app/api/models/tagModel";
import categoryModel from "@/app/api/models/categoryModel";

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
  const query = new RegExp(params["query"], "i");

  //search for all matching tags, brands, categories
  const matchingTags = await tagModel.find({ name: query }).select("_id");
  const matchingBrands = await brandModel.find({ name: query }).select("_id");
  const matchingCategories = await categoryModel
    .find({ name: query })
    .select("_id");

  //get just the ids from them
  const tagIds = matchingTags.map((tag) => tag._id);
  const brandIds = matchingBrands.map((brand) => brand._id);
  const categoryIds = matchingCategories.map((category) => category._id);

  //preform search
  const queryResult = await productModel.find({
    $or: [
      { name: query },
      { brand: { $in: brandIds } },
      { tags: { $in: tagIds } },
      { category: { $in: categoryIds } },
    ],
  });

  const queryResultWithBrandNames = await getBrandNames(queryResult);
  console.log("queryResultWithBrandNames", queryResultWithBrandNames);

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
