import { NextResponse, NextRequest } from "next/server";
import CategoryModel from "@/app/api/models/CategoryModel";
import "../../../utils/connectToDB";

export async function GET(request: NextRequest, response: any) {
  console.log("request recived!");

  //find all
  const categories = await CategoryModel.find();

  return NextResponse.json(categories, { status: 200 });
}

//boiler plate
// export async function GET(request: Request) {}
export async function HEAD(request: Request) {}
export async function POST(request: Request) {}
export async function PUT(request: Request) {}
export async function DELETE(request: Request) {}
export async function PATCH(request: Request) {}
export async function OPTIONS(request: Request) {}
