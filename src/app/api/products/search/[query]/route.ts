import { NextResponse, NextRequest } from "next/server";
import ProductModel from "@/app/api/models/ProductModel";
import "../../../utils/connectToDB";
import BrandModel from "@/app/api/models/BrandModel";
import TagModel from "@/app/api/models/TagModel";
import CategoryModel from "@/app/api/models/CategoryModel";
import AccountModel from "@/app/api/models/AccountModel";
import { ProductType } from "@/app/types/ProductType";
import jwt from "jsonwebtoken";

const getBrandNames = async (products: any[]) => {
  const updatedProducts = await Promise.all(
    products.map(async (product: any) => {
      const frozenProduct = product.toObject(); // Convert Mongoose document to plain object
      const brand = await BrandModel.findById("" + product.brand);
      frozenProduct.brandName = brand && brand.name;
      return frozenProduct;
    })
  );
  return updatedProducts;
};

//takes a keyword an returns a promise that queries the database
const keywordToResults = async (keyword: RegExp) => {
  //search for all matching tags, brands, categories
  const matchingTags = await TagModel.find({ name: keyword }).select("_id");
  const matchingBrands = await BrandModel.find({ name: keyword }).select("_id");
  const matchingCategories = await CategoryModel.find({ name: keyword }).select(
    "_id"
  );

  //get just the ids from them
  const tagIds = matchingTags.map((tag) => tag._id);
  const brandIds = matchingBrands.map((brand) => brand._id);
  const categoryIds = matchingCategories.map((category) => category._id);

  //preform search
  const queryResult = await ProductModel.find({
    $or: [
      { name: keyword },
      { brand: { $in: brandIds } },
      { tags: { $in: tagIds } },
      { category: { $in: categoryIds } },
    ],
  });
  return queryResult;
};

const getFavs = async (products: ProductType[], reqJwt: string | null) => {
  if (!reqJwt) return products;

  //auth jwt
  const decodedJwt = jwt.verify(reqJwt, process.env.JWT_SECRET_KEY!);
  if (!(decodedJwt && typeof decodedJwt === "object" && "id" in decodedJwt))
    return products;
  const userId = decodedJwt.id;
  if (!userId) return products;
  const user = await AccountModel.findById(userId);

  // get favs
  let productsWithFavs = products.map((product: ProductType) => {
    const frozenProduct = product ? product : { ...(product as ProductType) };
    if (user.favourites.map(String).includes(product._id.toString())) {
      frozenProduct.isFavourite = true;
    } else {
      frozenProduct.isFavourite = false;
    }
    return frozenProduct;
  });
  return productsWithFavs;
};

//takes an array of arrays containing products.
function removeTheDiff(array: ProductType[][]): ProductType[] {
  // If there are no arrays or the first array is empty, return an empty array
  if (array.length === 0 || array[0].length === 0) {
    return [];
  }

  const referenceArray = array[0];
  const results: ProductType[] = [];

  for (const product of referenceArray) {
    if (
      array.every((array) =>
        array.some((p) => p._id.toString() === product._id.toString())
      )
    ) {
      results.push(product);
    }
  }

  return results;
}

export async function GET(
  request: Request,
  { params }: { params: { query: string; action: string } }
) {
  //init
  const query: string = params["query"];
  console.log(`search request recived! ${query}`);
  const reqJwt = request.headers.get("jwt");

  //query
  const queryArr = query.split(" ");
  const resultOfqueries = queryArr.map(
    async (query) => await keywordToResults(new RegExp(query, "i"))
  );
  const resultOfQueriesArr = await Promise.all(resultOfqueries); //an array consisting of arrays
  console.log(resultOfQueriesArr);

  const removedDiff = removeTheDiff(resultOfQueriesArr);
  const removedDiffWBrandNames = await getBrandNames(removedDiff);
  const removedDiffWBrandNamesWFavs = await getFavs(
    removedDiffWBrandNames,
    reqJwt
  );

  return NextResponse.json(removedDiffWBrandNamesWFavs, { status: 200 });
}

//boiler plate
// export async function GET(request: Request) {}
export async function HEAD(request: Request) {}
export async function POST(request: Request) {}
export async function PUT(request: Request) {}
export async function DELETE(request: Request) {}
export async function PATCH(request: Request) {}
export async function OPTIONS(request: Request) {}
