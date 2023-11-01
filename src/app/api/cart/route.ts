import { NextResponse, NextRequest } from "next/server";
import ProductModel, { Product } from "../models/ProductModel";
import BrandModel from "../models/BrandModel";
import { ProductType } from "@/app/types/ProductType";
import "../utils/connectToDB";
import getUser from "../utils/getUser";
import mongoose from "mongoose";
import getBrandNames from "../utils/getBrandNames";
import getFavs from "../utils/getFavs";
import { Account } from "../models/AccountModel";
import { ProductToPlainObject } from "../models/ProductModel";

interface reqBodyCart {
  productId: string;
}

interface cartItemInterface {
  item: string;
  quantity: number;
}
type ProductTypeWithInfo = ProductType & { quantity: number };

export async function POST(request: NextRequest) {
  console.log("recived POST request!");

  const reqBody: reqBodyCart = await request.json();

  const user = await getUser(request);

  // addToCart
  if (!user.cart) user.cart = [];

  if (
    // if item is alredy in cart
    user.cart.some((itemObject) => {
      return String(itemObject.item) === reqBody.productId;
    })
  ) {
    user.cart.forEach((itemObject) => {
      if (String(itemObject.item) === reqBody.productId) {
        itemObject.quantity!++;
      }
    });
  } else {
    // if item isn't in cart
    user.cart.push({
      item: new mongoose.Types.ObjectId(reqBody.productId),
      quantity: 1,
    });
  }
  user.save();

  return NextResponse.json(
    { message: "successfully added to cart" },
    { status: 200 },
  );
}

const addProductInfoToCart = async (userCart: any[], user: Account) => {
  const productPromises = userCart.map(
    async (itemObject: cartItemInterface) => {
      return await ProductModel.findById(String(itemObject.item));
    },
  );
  const productInfo: Product[] = await Promise.all(productPromises);

  //* remove null from array, (they could be there because the product has been removed from the db, but the cart still holds on to the objectId)
  const productInfoFilteredNull = productInfo.filter(
    (product: Product) => product,
  );

  const productInfoWithQqt = productInfoFilteredNull.map(
    (product: Product, i) => {
      let plainObject = product.toObject();
      return {
        ...plainObject,
        quantity: userCart[i].quantity,
      };
    },
  ) as unknown as ProductToPlainObject[];

  return getFavs(await getBrandNames(productInfoWithQqt), user);
};

export async function GET(request: NextRequest) {
  console.log("request recived!");

  const user = await getUser(request);

  const userCart = user.cart;
  const userCartWInfo = await addProductInfoToCart(userCart, user);

  return NextResponse.json(userCartWInfo, { status: 200 });
}

//set new qqt
interface setNewQqt {
  itemId: string;
  newQuantity: number;
}

export async function PUT(request: NextRequest) {
  console.log("request recived!");

  const reqBody: setNewQqt = await request.json();

  // Authenticate JWT
  const user = await getUser(request);

  const theItemWereUpdating = user.cart.find(
    (item: any) => String(item.item) === reqBody.itemId,
  );

  if (theItemWereUpdating) {
    theItemWereUpdating.quantity = reqBody.newQuantity;
  }

  user.cart = user.cart.map((item: any) => {
    if (String(theItemWereUpdating!.item) === String(item.item)) {
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

  const reqBody: deleteItemFromCart = await request.json();

  const user = await getUser(request);

  const theItemWereUpdating = user.cart.find(
    (item: any) => String(item.item) === reqBody.itemId,
  );

  const indexOfItemThatWeWillRemove = user.cart.indexOf(theItemWereUpdating!);
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
