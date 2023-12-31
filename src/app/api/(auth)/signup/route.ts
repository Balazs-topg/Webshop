import { NextResponse } from "next/server";
import AccountModel from "../../models/AccountModel";
import "../../utils/connectToDB";
import bcrypt from "bcrypt";
import { createJwt } from "../../utils/createJwt";

type SignupRequestBody = {
  username: string;
  email: string;
  password: string;
};

async function isUsernameTaken(model: typeof AccountModel, username: string) {
  return (await model.countDocuments({ username: username })) > 0;
}
async function isEmailTaken(model: typeof AccountModel, email: string) {
  return (await model.countDocuments({ email: email })) > 0;
}
function isPasswordWeak(password: string) {
  return password.length < 5;
}
async function pushToDb(body: SignupRequestBody) {
  const newAccount = new AccountModel({
    username: body.username,
    email: body.email,
    password: await bcrypt.hash(body.password, 10),
  });
  await newAccount.save();
}

export async function POST(request: Request, response: any) {
  const reqBody = await request.json();

  const usernameTaken = await isUsernameTaken(AccountModel, reqBody.username);
  const emailTaken = await isEmailTaken(AccountModel, reqBody.email);
  const passwordIsWeak = isPasswordWeak(reqBody.password);

  let signupSuccessful = false;
  if (!usernameTaken && !emailTaken && !passwordIsWeak)
    await pushToDb(reqBody).then(() => (signupSuccessful = true));

  let jwt;
  if (signupSuccessful)
    jwt = createJwt(await AccountModel.findOne({ username: reqBody.username }));

  const recentlyCreateduser = await AccountModel.findOne({
    username: reqBody.username,
  });

  return NextResponse.json(
    {
      usernameIsTaken: usernameTaken,
      emailIsTaken: emailTaken,
      passwordIsWeak: passwordIsWeak,
      jwt: jwt ? jwt : undefined,
      id: recentlyCreateduser._id,
      signupIsSuccessful: signupSuccessful,
    },
    { status: 200 },
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
