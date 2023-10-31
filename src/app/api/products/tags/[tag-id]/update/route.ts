import { NextResponse, NextRequest } from "next/server";
import "../../../../utils/connectToDB";
import { addCategoryRequest } from "../../../categories/add/route";
import TagModel from "@/app/api/models/TagModel";
import getUser from "@/app/api/utils/getUser";

export async function PUT(
  request: Request,
  { params }: { params: { "tag-id": string; action: string } },
) {
  console.log("request recived for delete!");

  const reqJwt = request.headers.get("jwt");
  const tagId = params["tag-id"]; // 'a', 'b', or 'c'
  const reqBody: addCategoryRequest = await request.json();

  const user = await getUser(request);
  const isAdmin = user ? user.isAdmin : false;
  if (!isAdmin) return NextResponse.json({}, { status: 401 });

  const tag = await TagModel.findByIdAndUpdate(tagId, reqBody);

  return NextResponse.json({ status: 200 });
}
