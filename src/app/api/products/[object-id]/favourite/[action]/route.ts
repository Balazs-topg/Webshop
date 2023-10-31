import { NextResponse, NextRequest } from "next/server";
import "../../../../utils/connectToDB";
import getUser from "@/app/api/utils/getUser";
import mongoose from "mongoose";

export async function POST(
  request: Request,
  { params }: { params: { "object-id": string; action: string } },
) {
  console.log("request reciveddd!");

  const objectId = new mongoose.Types.ObjectId(params["object-id"]);
  const action = params.action;

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

  return NextResponse.json({ status: 200 });
}

//boiler plate
export async function GET(request: Request) {}
export async function HEAD(request: Request) {}
// export async function POST(request: Request) {}
export async function PUT(request: Request) {}
export async function DELETE(request: Request) {}
export async function PATCH(request: Request) {}
export async function OPTIONS(request: Request) {}
