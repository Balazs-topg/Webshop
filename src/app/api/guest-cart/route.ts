import { NextResponse, NextRequest } from "next/server";
import "../utils/connectToDB";
import GuestCartModel from "../models/GuestCartModel";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  console.log("recived POST request to make new cart!");

  const newAGuestCart = await new GuestCartModel({});
  await newAGuestCart.save();
  const newAGuestCartId = newAGuestCart.id;

  return NextResponse.json(
    { message: "successfully created new cart", cartId: newAGuestCartId },
    { status: 200 },
  );
}
