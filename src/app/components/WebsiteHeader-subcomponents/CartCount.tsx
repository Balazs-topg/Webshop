import React from "react";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

async function CartCount({
  isLoggedIn,
  cookieStore,
  jwt,
}: {
  isLoggedIn: boolean;
  cookieStore: ReadonlyRequestCookies;
  jwt: RequestCookie | undefined;
}) {
  async function fetchCartCount() {
    // revalidatePath("/");
    try {
      const response = await fetch(
        "http://localhost:3000/api/cart/get-item-count",
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            jwt: isLoggedIn ? jwt!.value : "",
            isGuest: isLoggedIn ? false : true,
            guestCartId: cookieStore.get("guestCart"),
          },
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.itemCount;
    } catch (error) {
      console.error("Failed to fetch cart count:", error);
      return 0; // Return a default value or handle the error as appropriate
    }
  }
  const cartCount = await fetchCartCount();

  return (
    <div className="absolute bottom-0 left-0 flex h-5 w-5 -translate-x-1 translate-y-1 items-center justify-center rounded-full bg-red-500 text-xs font-light text-white">
      {cartCount}
    </div>
  );
}

export default CartCount;
