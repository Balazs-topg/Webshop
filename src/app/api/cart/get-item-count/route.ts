import { NextResponse, NextRequest } from "next/server";
import getUser from "../../utils/getUser";
import GuestCartModel, { GuestCart } from "../../models/GuestCartModel";

interface reqBodyCart {
  productId: string;
}

interface cartItemInterface {
  item: string;
  quantity: number;
}

export async function GET(request: NextRequest) {
  console.log("request recived!");
  let userCartCount = 0;

  const isGuest = request.headers.get("isGuest");

  const guestCardId = request.headers.get("guestCartId") as unknown as string;

  if (isGuest === "false") {
    console.log("isGuest was true");
    const user = await getUser(request);
    user.cart.forEach((item) => {
      userCartCount = userCartCount + item.quantity!;
    });
  } else {
    console.log("guestCartID", guestCardId);

    const guest = (await GuestCartModel.findById(guestCardId)) as GuestCart;
    console.log("guest", guest);
    guest.cart.forEach((item) => {
      userCartCount = userCartCount + item.quantity!;
    });
  }

  return NextResponse.json({ itemCount: userCartCount }, { status: 200 });
}
