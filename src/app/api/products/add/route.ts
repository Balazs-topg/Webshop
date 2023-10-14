import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import accountModel from "../../models/accountModel";
import productModel from "../../models/productModel";
import "../../utils/connectToDB";

export async function POST(request: NextRequest) {
  console.log("request recived!");

  const formData = await request.formData();
  const reqBody: any = {};

  for (let [key, value] of formData.entries()) {
    if (key.startsWith("img")) {
      const file = value as any;
      const chunks: any[] = [];
      for await (const chunk of file.stream()) {
        chunks.push(chunk);
      }
      const buffer = Buffer.concat(chunks);
      reqBody[key] = buffer.toString("base64");
    } else {
      reqBody[key] = value;
    }
  }

  // Convert img0, img1, img2, etc. to an img array
  const imgArray = [];
  for (let i = 0; reqBody.hasOwnProperty(`img${i}`); i++) {
    imgArray.push(reqBody[`img${i}`]);
    delete reqBody[`img${i}`]; // Remove the img0, img1, etc. properties from the object
  }
  // Add the img array to the object
  reqBody.imgs = imgArray;

  console.log(reqBody);

  const reqJwt = request.headers.get("jwt");

  // Authenticate JWT
  if (!reqJwt) return NextResponse.json({}, { status: 401 });
  const decodedJwt = jwt.decode(reqJwt);
  if (!(decodedJwt && typeof decodedJwt === "object" && "id" in decodedJwt))
    return NextResponse.json({}, { status: 401 });
  const userId = decodedJwt.id;
  if (!userId) return NextResponse.json({}, { status: 401 });
  const user = await accountModel.findById(userId);
  const isAdmin = user ? user.isAdmin : false;
  if (!isAdmin) return NextResponse.json({}, { status: 401 });

  // Check if name already exists
  const name = (await productModel.countDocuments({ name: reqBody.name })) > 0;
  if (name) return NextResponse.json({}, { status: 400 });

  // Push to db
  const newProduct = new productModel({
    name: reqBody.name,
    brand: reqBody.brand,
    category: reqBody.category,
    imgs: reqBody.imgs,
    tags: reqBody.tags,
    price: reqBody.price,
  });
  await newProduct.save();

  return NextResponse.json(
    { message: "successfully added item" },
    { status: 200 }
  );
}

// ... other routes
