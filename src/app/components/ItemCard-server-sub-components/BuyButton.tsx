"use client";
import React from "react";
import { Ripples } from "react-ripples-continued";
import { webshopContext } from "@/app/Providers";
import { useContext } from "react";
import { getCookie } from "@/app/(frontend-routes)/utils/manageCookies";

function BuyButton({
  isLoggedIn,
  jwtToken,
  productId,
}: {
  isLoggedIn: boolean;
  jwtToken?: string | boolean;
  productId: string;
}) {
  const [webshopContextState, setWebshopContextState] =
    useContext(webshopContext);
  const cartCount = webshopContextState.cartCount;

  const handleBuy = async () => {
    console.log("handleBuy called");

    setWebshopContextState((prevState: any) => ({
      ...prevState,
      cartCount: prevState.cartCount + 1,
    }));

    try {
      const response = await fetch("http://localhost:3000/api/cart/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          jwt: isLoggedIn ? jwtToken : "",
          isGuest: isLoggedIn ? false : true,
          guestCartId: getCookie("guestCart")
        },
        body: JSON.stringify({ productId: productId }),
      });
      const data = await response.json();
      console.log("handleBuy finished", data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className=" flex items-center gap-2">
      <button
        // onClick={handleBuy}
        className="relative flex items-center justify-center overflow-hidden rounded-full bg-sky-800 px-6 py-2 font-medium uppercase text-white transition-all active:scale-95"
        onClick={handleBuy}
      >
        Köp
        <Ripples opacity={0.5} duration={700} optimize />
      </button>
    </div>
  );
}

export default BuyButton;
