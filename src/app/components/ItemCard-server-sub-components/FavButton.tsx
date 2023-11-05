"use client";
import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Ripples } from "react-ripples-continued";
import { getCookie } from "@/app/(frontend-routes)/utils/manageCookies";

function FavButton({
  id,
  isFavourite = false,
  isLoggedIn,
}: {
  id: string;
  isFavourite: boolean;
  isLoggedIn: boolean;
}) {
  const [isFavouriteState, setIsFavouriteState] = useState(isFavourite);

  const handleFavourite = async () => {
    setIsFavouriteState(!isFavouriteState);
    const response = await fetch(
      `/api/products/${id}/favourite/${
        isFavouriteState ? "un-favourite" : "favourite"
      }`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          jwt: isLoggedIn ? getCookie("jwt") : "",
          isGuest: isLoggedIn ? false : true,
          guestCartId: getCookie("guestCart"),
        },
      },
    );
    const data = await response.json();
  };

  return (
    <button
      className={
        isFavouriteState
          ? "focus-visible:out relative ml-auto overflow-hidden rounded-full bg-amber-300 p-1 outline-2 outline-offset-2 outline-sky-800"
          : "focus-visible:out relative ml-auto overflow-hidden rounded-full bg-stone-200 p-1 outline-2 outline-offset-2 outline-sky-800"
      }
      onClick={handleFavourite}
    >
      {isFavouriteState ? (
        <Ripples fillAndHold opacity={0.6} color="rgb(231 229 228)" />
      ) : (
        <Ripples fillAndHold opacity={0.6} color="rgb(252 211 77)" />
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        className="h-4 w-4"
      >
        <path
          fillRule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}

export default FavButton;
