import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import accountModel from "../models/accountModel";
import productModel from "../models/productModel";
import brandModel from "../models/brandModel";
import { ProductType } from "@/app/types/ProductType";
import "../utils/connectToDB";
import { CoinsIcon, CopySlash } from "lucide-react";

interface reqBodyCart {
  productId: string;
}

interface cartItemInterface {
  item: string;
  quantity: number;
}
type ProductTypeWithInfo = ProductType & { quantity: number };

export async function POST(request: NextRequest) {
  console.log("request recived!");

  const reqBody: reqBodyCart = await request.json();
  const reqJwt = request.headers.get("jwt");

  // Authenticate JWT
  if (!reqJwt) return NextResponse.json({}, { status: 401 });
  const decodedJwt = jwt.verify(reqJwt, process.env.JWT_SECRET_KEY!);
  if (!(decodedJwt && typeof decodedJwt === "object" && "id" in decodedJwt))
    return NextResponse.json({}, { status: 401 });
  const userId = decodedJwt.id;
  if (!userId) return NextResponse.json({}, { status: 401 });
  const user = await accountModel.findById(userId);

  // addToCart
  if (!user.cart) user.cart = [];

  // if item is alredy in cart
  if (
    user.cart.some((itemObject: cartItemInterface) => {
      return String(itemObject.item) === reqBody.productId;
    })
  ) {
    user.cart.forEach((itemObject: cartItemInterface) => {
      if (String(itemObject.item) === reqBody.productId) {
        itemObject.quantity++;
      }
    });
  } else {
    user.cart.push({ item: reqBody.productId, quantity: 1 });
  }
  user.save();

  return NextResponse.json(
    { message: "successfully added to cart" },
    { status: 200 }
  );
}

const getBrandNames = async (products: any[]) => {
  const updatedProducts = await Promise.all(
    products.map(async (product: any) => {
      const frozenProduct = product;
      const brand = await brandModel.findById("" + product.brand);
      frozenProduct.brandName = brand && brand.name;
      return frozenProduct;
    })
  );
  return updatedProducts;
};

const addProductInfoToCart = async (userCart: any[]) => {
  const productPromises = userCart.map(
    async (itemObject: cartItemInterface) => {
      return await productModel.findById(String(itemObject.item));
    }
  );
  const productInfo = await Promise.all(productPromises);

  const productInfoWithQqt = productInfo.map((product: any, i) => {
    let productWcartInfo: ProductTypeWithInfo = {
      ...product.toObject(),
      quantity: userCart[i].quantity,
    };
    return productWcartInfo;
  }) as ProductType[];

  return getBrandNames(productInfoWithQqt);
};

export async function GET(request: NextRequest) {
  console.log("request recived!");

  const reqJwt = request.headers.get("jwt");

  // Authenticate JWT
  if (!reqJwt) return NextResponse.json({}, { status: 401 });
  const decodedJwt = jwt.verify(reqJwt, process.env.JWT_SECRET_KEY!);
  if (!(decodedJwt && typeof decodedJwt === "object" && "id" in decodedJwt))
    return NextResponse.json({}, { status: 401 });
  const userId = decodedJwt.id;
  if (!userId) return NextResponse.json({}, { status: 401 });
  const user = await accountModel.findById(userId);

  const userCart = user.cart.toObject();
  const userCartWInfo = await addProductInfoToCart(userCart);

  return NextResponse.json(userCartWInfo, { status: 200 });
}

//set new qqt

interface setNewQqt {
  itemId: string;
  newQuantity: number;
}

export async function PUT(request: NextRequest) {
  console.log("request recived!");

  const reqJwt = request.headers.get("jwt");
  const reqBody: setNewQqt = await request.json();

  // Authenticate JWT
  if (!reqJwt) return NextResponse.json({}, { status: 401 });
  const decodedJwt = jwt.verify(reqJwt, process.env.JWT_SECRET_KEY!);
  if (!(decodedJwt && typeof decodedJwt === "object" && "id" in decodedJwt))
    return NextResponse.json({}, { status: 401 });
  const userId = decodedJwt.id;
  if (!userId) return NextResponse.json({}, { status: 401 });
  const user = await accountModel.findById(userId);

  const theItemWereUpdating = user.cart.find(
    (item: any) => String(item.item) === reqBody.itemId
  );

  if (theItemWereUpdating) {
    theItemWereUpdating.quantity = reqBody.newQuantity;
  }

  user.cart = user.cart.map((item: any) => {
    if (String(theItemWereUpdating.item) === String(item.item)) {
      return theItemWereUpdating;
    } else {
      return item;
    }
  });

  await user.save();

  return NextResponse.json({ status: 200 }, { status: 200 });
}
interface deleteItemFromCart {
  itemId: string;
}

export async function DELETE(request: NextRequest) {
  console.log("request recived!");

  const reqJwt = request.headers.get("jwt");
  const reqBody: deleteItemFromCart = await request.json();

  // Authenticate JWT
  if (!reqJwt) return NextResponse.json({}, { status: 401 });
  const decodedJwt = jwt.verify(reqJwt, process.env.JWT_SECRET_KEY!);
  if (!(decodedJwt && typeof decodedJwt === "object" && "id" in decodedJwt))
    return NextResponse.json({}, { status: 401 });
  const userId = decodedJwt.id;
  if (!userId) return NextResponse.json({}, { status: 401 });
  const user = await accountModel.findById(userId);

  const theItemWereUpdating = user.cart.find(
    (item: any) => String(item.item) === reqBody.itemId
  );

  const indexOfItemThatWeWillRemove = user.cart.indexOf(theItemWereUpdating);
  user.cart.splice(indexOfItemThatWeWillRemove, 1);
  await user.save();

  return NextResponse.json({ status: 200 }, { status: 200 });
}

//boiler plate
// export async function GET(request: Request) {}
export async function HEAD(request: Request) {}
// export async function POST(request: Request) {}
// export async function PUT(request: Request) {}
// export async function DELETE(request: Request) {}
export async function PATCH(request: Request) {}
export async function OPTIONS(request: Request) {}
