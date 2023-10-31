// import { NextResponse } from "next/server";
// import AccountModel from "@/app/api/models/AccountModel";
// import "../../utils/connectToDB";
// import bcrypt from "bcrypt";

// import nodemailer from "nodemailer";
// type LoginRequest = {
//   email: string;
// };

// export async function POST(request: Request, response: any) {
//   const reqBody: LoginRequest = await request.json();

//   const user = await AccountModel.findOne({ email: reqBody.email });
//   console.log("user: ", user);

//   return NextResponse.json({}, { status: 200 });
// }
