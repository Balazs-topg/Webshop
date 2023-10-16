import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import accountModel from "@/app/api/models/accountModel";
import productModel from "@/app/api/models/productModel";
import "../../../../utils/connectToDB";

export async function POST(
  request: Request,
  { params }: { params: { "object-id": string; action: string } }
) {
  console.log("request reciveddd!");

  const objectId = params["object-id"]; // 'a', 'b', or 'c'
  const action = params.action;

  // get user from JWT
  const reqJwt = request.headers.get("jwt");
  if (!reqJwt) return NextResponse.json({}, { status: 401 });
  const decodedJwt = jwt.decode(reqJwt);
  if (!(decodedJwt && typeof decodedJwt === "object" && "id" in decodedJwt))
    return NextResponse.json({}, { status: 401 });
  const userId = decodedJwt.id;
  if (!userId) return NextResponse.json({}, { status: 401 });
  const user = await accountModel.findById(userId);

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