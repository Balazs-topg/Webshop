import { NextResponse, NextRequest } from "next/server";
import ProductModel, { Product } from "../../models/ProductModel";
import "../../utils/connectToDB";
import getUser from "../../utils/getUser";
import getIsLoggedIn from "../../utils/getIsLoggedIn";
import getBrandNames from "../../utils/getBrandNames";
import getFavs from "../../utils/getFavs";
import GuestCartModel, { GuestCart } from "../../models/GuestCartModel";
import { Account } from "../../models/AccountModel";

export async function GET(request: NextRequest, response: any) {
  console.log("request recived!");

  // Find all products
  // const products = await productModel.find();
  const products: Product[] = await ProductModel.find();
  const productsToPlainObjects = products.map((item) => {
    return item.toObject();
  });

  const isGuest = request.headers.get("isGuest") as unknown as boolean;
  const guestCardId = request.headers.get("guestCartId") as unknown as string;

  if (!isGuest) {
    const user = await getUser(request);
    const productsWithFavs = await getFavs(productsToPlainObjects, user);
    const productsWFavsAndWBrandNames = await getBrandNames(productsWithFavs);
    return NextResponse.json(productsWFavsAndWBrandNames, { status: 200 });
  } else {
    const guestCart = (await GuestCartModel.findById(guestCardId)) as GuestCart;
    const productsWithFavs = await getFavs(
      productsToPlainObjects,
      guestCart as Account,
    );
    const productsWFavsAndWBrandNames = await getBrandNames(productsWithFavs);
    return NextResponse.json(productsWFavsAndWBrandNames, { status: 200 });
  }

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
