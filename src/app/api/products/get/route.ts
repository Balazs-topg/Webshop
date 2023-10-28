import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import productModel from "../../models/productModel";
import accountModel from "../../models/accountModel";
import "../../utils/connectToDB";
import brandModel from "../../models/brandModel";

const getBrandNames = async (products: any[]) => {
  const updatedProducts = await Promise.all(
    products.map(async (product: any) => {
      const frozenProduct = product.toObject(); // Convert Mongoose document to plain object
      const brand = await brandModel.findById("" + product.brand);
      frozenProduct.brandName = brand.name;
      return frozenProduct;
    })
  );
  return updatedProducts;
};

export async function GET(request: NextRequest, response: any) {
  console.log("request recived!");

  // Find all products
  // const products = await productModel.find();
  const products = await getBrandNames(await productModel.find());

  // get user from JWT
  const reqJwt = request.headers.get("jwt");

  const loggedIn = Boolean(reqJwt !== "null");

  let productsWithFavs;
  if (loggedIn) {
    //auth jwt
    const decodedJwt = jwt.decode(reqJwt!);
    if (!(decodedJwt && typeof decodedJwt === "object" && "id" in decodedJwt))
      return NextResponse.json({}, { status: 401 });
    const userId = decodedJwt.id;
    if (!userId) return NextResponse.json({}, { status: 401 });
    const user = await accountModel.findById(userId);

    // get favs
    productsWithFavs = products.map((product) => {
      const frozenProduct = product.toObject
        ? product.toObject()
        : { ...product };
      if (user.favourites.map(String).includes(product._id.toString())) {
        frozenProduct.isFavourite = true;
      } else {
        frozenProduct.isFavourite = false;
      }
      return frozenProduct;
    });
    return NextResponse.json(productsWithFavs, { status: 200 });
  }
  console.log(productsWithFavs);
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
