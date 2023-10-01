import { NextResponse } from "next/server";
import accountModel from "../../models/accountModel";
import "../../utils/connectToDB";
import bcrypt from "bcrypt";
import { createJwt } from "../../utils/createJwt";

export async function POST(request, response) {
  const reqBody = await request.json();

  const user = await accountModel.findOne({ email: reqBody.email });

  const passwordIsCorrect = user
    ? await bcrypt.compare(reqBody.password, user.password)
    : false;

  const jwt = passwordIsCorrect
    ? createJwt(accountModel.findOne({ username: reqBody.username }._id))
    : false;

  return NextResponse.json(
    { loginIsSuccessful: passwordIsCorrect, userFound: Boolean(user) },
    { status: !Boolean(user) || !passwordIsCorrect ? 400 : 200 }
  );
}

//boiler plate
export async function GET(request) {}
export async function HEAD(request) {}
// export async function POST(request) {}
export async function PUT(request) {}
export async function DELETE(request) {}
export async function PATCH(request) {}
export async function OPTIONS(request) {}
