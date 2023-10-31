import { NextResponse, NextRequest } from "next/server";
import TagModel from "@/app/api/models/TagModel";
import "../../../../utils/connectToDB";
import getUser from "@/app/api/utils/getUser";

export async function DELETE(
  request: Request,
  { params }: { params: { "tag-id": string; action: string } },
) {
  console.log("request recived for delete!");

  const reqJwt = request.headers.get("jwt");
  const tagId = params["tag-id"];

  const user = await getUser(request);
  const isAdmin = user ? user.isAdmin : false;
  if (!isAdmin) return NextResponse.json({}, { status: 401 });

  const tag = await TagModel.findByIdAndDelete(tagId);

  return NextResponse.json({ status: 200 });
}
