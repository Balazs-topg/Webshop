import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import accountModel from "../../models/accountModel";
import "../../utils/connectToDB";

export async function GET(
  request: Request,
  { params }: { params: { "user-id": string } }
) {
  console.log("request recived!");

  const userId = params["user-id"]; // 'a', 'b', or 'c'
  console.log(userId);

  const reqJwt = request.headers.get("jwt");

  const userData = await accountModel.findById(userId);

  return NextResponse.json(userData, { status: 200 });
}

//boiler plate
// export async function GET(request: Request) {}
export async function HEAD(request: Request) {}
export async function POST(request: Request) {}
export async function PUT(request: Request) {}
export async function DELETE(request: Request) {}
export async function PATCH(request: Request) {}
export async function OPTIONS(request: Request) {}
