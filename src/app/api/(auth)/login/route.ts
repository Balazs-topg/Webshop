import { NextResponse } from "next/server";
import AccountModel from "../../models/AccountModel";
import "../../utils/connectToDB";
import bcrypt from "bcrypt";
import { createJwt } from "../../utils/createJwt";

type LoginRequest = {
  email: string;
  password: string;
};

export async function POST(request: Request, response: any) {
  const reqBody: LoginRequest = await request.json();

  const user = await AccountModel.findOne({ email: reqBody.email });
  console.log("user: ", user);

  const passwordIsCorrect = user
    ? await bcrypt.compare(reqBody.password, user.password)
    : false;

  const jwt = passwordIsCorrect
    ? createJwt(await AccountModel.findOne({ email: reqBody.email }))
    : undefined;

  return NextResponse.json(
    {
      loginIsSuccessful: passwordIsCorrect,
      username: user ? user.username : undefined,
      id: user ? user._id : undefined,
      userFound: Boolean(user),
      jwt: jwt,
    },
    { status: !Boolean(user) || !passwordIsCorrect ? 400 : 200 },
  );
}

//boiler plate
export async function GET(request: Request) {}
export async function HEAD(request: Request) {}
// export async function POST(request) {}
export async function PUT(request: Request) {}
export async function DELETE(request: Request) {}
export async function PATCH(request: Request) {}
export async function OPTIONS(request: Request) {}
