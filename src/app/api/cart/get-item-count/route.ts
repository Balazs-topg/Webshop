import { NextResponse, NextRequest } from "next/server";
import getUser from "../../utils/getUser";

interface reqBodyCart {
  productId: string;
}

interface cartItemInterface {
  item: string;
  quantity: number;
}

export async function GET(request: NextRequest) {
  console.log("request recived____!");

  const user = await getUser(request);
  let userCartCount = 0;
  user.cart.forEach((item) => {
    userCartCount = userCartCount + item.quantity!;
  });

  return NextResponse.json({ itemCount: userCartCount }, { status: 200 });
}
