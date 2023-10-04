import { NextResponse } from "next/server";
import accountModel from "../../models/accountModel";
import "../../utils/connectToDB";
import bcrypt from "bcrypt";
import { createJwt } from "../../utils/createJwt";

async function isUsernameTaken(model, username) {
  return (await model.countDocuments({ username: username })) > 0;
}
async function isEmailTaken(model, email) {
  return (await model.countDocuments({ email: email })) > 0;
}
function isPasswordWeak(password) {
  return password.length < 5;
}
async function pushToDb(body) {
  const newAccount = new accountModel({
    username: body.username,
    email: body.email,
    password: await bcrypt.hash(body.password, 10),
  });
  await newAccount.save();
}

export async function POST(request, response) {
  const reqBody = await request.json();

  const usernameTaken = await isUsernameTaken(accountModel, reqBody.username);
  const emailTaken = await isEmailTaken(accountModel, reqBody.email);
  const passwordIsWeak = isPasswordWeak(reqBody.password);

  let signupSuccessful = false;
  if (!usernameTaken && !emailTaken && !passwordIsWeak)
    await pushToDb(reqBody).then(() => (signupSuccessful = true));

  let jwt;
  if (signupSuccessful)
    jwt = createJwt(
      await accountModel.findOne({ username: reqBody.username })
    );

  return NextResponse.json(
    {
      usernameIsTaken: usernameTaken,
      emailIsTaken: emailTaken,
      passwordIsWeak: passwordIsWeak,
      jwt: jwt ? jwt : undefined,
      signupIsSuccessful: signupSuccessful,
    },
    { status: 200 }
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
