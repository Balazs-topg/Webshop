import { NextResponse, NextRequest } from "next/server";
import ProductModel from "../../models/ProductModel";
import "../../utils/connectToDB";
import BrandModel from "../../models/BrandModel";
import getUser from "../../utils/getUser";
import getIsLoggedIn from "../../utils/getIsLoggedIn";

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

export async function GET(request: NextRequest, response: any) {
  console.log("request recived!");

  // Find all products
  // const products = await productModel.find();
  const products = await getBrandNames(await ProductModel.find());

  const loggedIn = getIsLoggedIn(request);
  let productsWithFavs;
  if (loggedIn) {
    //auth jwt
    const user = await getUser(request);

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
