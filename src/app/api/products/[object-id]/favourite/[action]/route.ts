import { NextResponse, NextRequest } from "next/server";
import "../../../../utils/connectToDB";
import getUser from "@/app/api/utils/getUser";
import mongoose from "mongoose";
import GuestCartModel, { GuestCart } from "@/app/api/models/GuestCartModel";

export async function POST(
  request: Request,
  { params }: { params: { "object-id": string; action: string } },
) {
  console.log("request reciveddd!");

  const objectId = new mongoose.Types.ObjectId(params["object-id"]);
  const action = params.action;

  const isGuest = request.headers.get("isGuest");
  const guestCardId = request.headers.get("guestCartId") as unknown as string;

  if (isGuest === "false") {
    const user = await getUser(request);

    //favourite logic
    if (!user.favourites) user.favourites = [];

    if (action == "un-favourite") {
      user.favourites.splice(user.favourites.indexOf(objectId), 1);
    } else if (action == "favourite") {
      //if its not in favourites
      if (!user.favourites.includes(objectId)) {
        user.favourites.push(objectId);
        user.markModified("favourites");
      }
    }
    await user.save();
  } else {
    const guest = (await GuestCartModel.findById(guestCardId)) as GuestCart;

    //favourite logic
    if (!guest.favourites) guest.favourites = [];

    if (action == "un-favourite") {
      guest.favourites.splice(guest.favourites.indexOf(objectId), 1);
    } else if (action == "favourite") {
      //if its not in favourites
      if (!guest.favourites.includes(objectId)) {
        guest.favourites.push(objectId);
        guest.markModified("favourites");
      }
    }
    await guest.save();
  }

  return NextResponse.json({ status: 200 });
}
