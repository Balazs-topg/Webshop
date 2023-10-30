import { NextResponse } from "next/server";
import AccountModel from "@/app/api/models/AccountModel";
import "../../utils/connectToDB";
import bcrypt from "bcrypt";

import nodemailer from "nodemailer";
type LoginRequest = {
  email: string;
};

export async function POST(request: Request, response: any) {
  const reqBody: LoginRequest = await request.json();

  const user = await AccountModel.findOne({ email: reqBody.email });
  console.log("user: ", user);

  return NextResponse.json({}, { status: 200 });
}

//boiler plate
export async function GET(request: Request) {}
export async function HEAD(request: Request) {}
// export async function POST(request) {}
export async function PUT(request: Request) {}
export async function DELETE(request: Request) {}
export async function PATCH(request: Request) {}
export async function OPTIONS(request: Request) {}
