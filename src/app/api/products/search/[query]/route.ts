import { NextResponse, NextRequest } from "next/server";
import ProductModel, { Product } from "@/app/api/models/ProductModel";
import "../../../utils/connectToDB";
import BrandModel from "@/app/api/models/BrandModel";
import TagModel from "@/app/api/models/TagModel";
import CategoryModel from "@/app/api/models/CategoryModel";
import getBrandNames from "@/app/api/utils/getBrandNames";
import getUser from "@/app/api/utils/getUser";
import getFavs from "@/app/api/utils/getFavs";
import GuestCartModel, { GuestCart } from "@/app/api/models/GuestCartModel";
import { Account } from "@/app/api/models/AccountModel";

//takes a keyword an returns a promise that queries the database
const keywordToResults = async (keyword: RegExp): Promise<Product[]> => {
  //search for all matching tags, brands, categories
  const matchingTags = await TagModel.find({ name: keyword }).select("_id");
  const matchingBrands = await BrandModel.find({ name: keyword }).select("_id");
  const matchingCategories = await CategoryModel.find({ name: keyword }).select(
    "_id",
  );

  //get just the ids from them
  const tagIds = matchingTags.map((tag) => tag._id);
  const brandIds = matchingBrands.map((brand) => brand._id);
  const categoryIds = matchingCategories.map((category) => category._id);

  //preform search
  const queryResult: Product[] = await ProductModel.find({
    $or: [
      { name: keyword },
      { brand: { $in: brandIds } },
      { tags: { $in: tagIds } },
      { category: { $in: categoryIds } },
    ],
  });
  return queryResult;
};

//takes an array of arrays containing products.
function removeTheDiff(array: Product[][]): Product[] {
  // If there are no arrays or the first array is empty, return an empty array
  if (array.length === 0 || array[0].length === 0) {
    return [];
  }

  const referenceArray = array[0];
  const results = [];

  for (const product of referenceArray) {
    if (
      array.every((array) =>
        array.some((p) => p._id.toString() === product._id.toString()),
      )
    ) {
      results.push(product);
    }
  }

  return results;
}

export async function GET(
  request: Request,
  { params }: { params: { query: string; action: string } },
) {
  //init
  const query: string = params["query"];
  console.log(`search request recived! ${query}`);

  const isGuest = request.headers.get("isGuest") as unknown as boolean;
  const guestCardId = request.headers.get("guestCartId") as unknown as string;
  let result;

  if (!isGuest) {
    const user = await getUser(request);
    //query
    const queryArr = query.split(" ");
    const resultOfqueries = queryArr.map(
      async (query) => await keywordToResults(new RegExp(query, "i")),
    );
    const resultOfQueriesArr = await Promise.all(resultOfqueries); //an array consisting of arrays

    const removedDiff = removeTheDiff(resultOfQueriesArr);
    const removedDiffPlainObj = removedDiff.map((item) => {
      return item.toObject();
    });
    const removedDiffWBrandNames = await getBrandNames(removedDiffPlainObj);
    result = await getFavs(removedDiffWBrandNames, user);
  } else {
    const guestCard = (await GuestCartModel.findById(guestCardId)) as GuestCart;
    //query
    const queryArr = query.split(" ");
    const resultOfqueries = queryArr.map(
      async (query) => await keywordToResults(new RegExp(query, "i")),
    );
    const resultOfQueriesArr = await Promise.all(resultOfqueries); //an array consisting of arrays

    const removedDiff = removeTheDiff(resultOfQueriesArr);
    const removedDiffPlainObj = removedDiff.map((item) => {
      return item.toObject();
    });
    const removedDiffWBrandNames = await getBrandNames(removedDiffPlainObj);
    result = await getFavs(removedDiffWBrandNames, guestCard as Account);
  }

  return NextResponse.json(result, { status: 200 });
}

//boiler plate
// export async function GET(request: Request) {}
export async function HEAD(request: Request) {}
export async function POST(request: Request) {}
export async function PUT(request: Request) {}
export async function DELETE(request: Request) {}
export async function PATCH(request: Request) {}
export async function OPTIONS(request: Request) {}
