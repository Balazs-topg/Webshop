"use client";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Ripples } from "react-ripples-continued";
import Link from "next/link";
import { getCookie } from "../(frontend-routes)/utils/manageCookies";
import { useRouter } from "next/navigation";
import addSpacesForPrice from "../(frontend-routes)/utils/addSpacesForPrice";
import { useContext } from "react";
import { webshopContext } from "../Providers";

type itemCardTypes = {
  brandName?: string;
  productName?: string;
  price?: number;
  imageSrc?: string;
  isInstock?: boolean;
  isFavourite?: boolean;
  id?: string;
  isSkeleton?: boolean;
};

export default function ItemCard({
  brandName,
  productName,
  imageSrc,
  price,
  isInstock = true,
  isFavourite = false,
  id,
  isSkeleton = false,
}: itemCardTypes) {
  const router = useRouter();
  // const [isLoading, setIsLoading] = useState(false);
  const [isFavouriteState, setIsFavouriteState] = useState(isFavourite);
  const [isBeingClicked, setIsBeingClicked] = useState(false); // for styles, not for functionallity
  let isLoggedIn: boolean;
  if (!!getCookie("jwt")) isLoggedIn = true;

  const [webshopContextState, setWebshopContextState] =
    useContext(webshopContext);

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
          guestCartId: getCookie("guestCart"),
        },
        body: JSON.stringify({ productId: productId }),
      });
      const data = await response.json();
      console.log("handleBuy finished", data);
    } catch (e) {
      console.error(e);
    }
  };

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

  if (isSkeleton) {
    return (
      <div
        className={
          !isBeingClicked
            ? "flex h-[28rem] w-[16rem] shrink-0 flex-col rounded-3xl p-5 text-sky-900 transition-all hover:-translate-y-2 hover:shadow-md [&>.img-cont]:hover:shadow-inner [&>div>img]:hover:scale-110 [&>div]:hover:max-h-56"
            : "flex h-[28rem] w-[16rem] shrink-0 scale-95 flex-col rounded-3xl p-5 text-sky-900 transition-all hover:-translate-y-2 hover:shadow-md [&>.img-cont]:hover:shadow-inner [&>div>img]:hover:scale-110 [&>div]:hover:max-h-56"
        }
      >
        <div className="img-cont relative flex h-full max-h-60 animate-pulse cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-stone-200 p-4 transition-all"></div>
        <div className="info space-y-2 py-2">
          <div className="flex items-center border-b border-stone-100 pb-2 font-medium">
            <div className="animate-pulse rounded-md bg-stone-200">
              <div className=" opacity-0">loading</div>
            </div>
            <div className="relative ml-auto animate-pulse overflow-hidden rounded-full bg-stone-200 p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="h-4 w-4 opacity-0"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="w-fit animate-pulse rounded-md bg-stone-200">
            <div className=" opacity-0">loading loading</div>
          </div>
          <div className="w-fit animate-pulse rounded-md bg-stone-200">
            <div className="flex items-center gap-2 text-xs font-medium uppercase opacity-0">
              loading loading
            </div>
          </div>
        </div>
        <div className="mt-auto flex items-end justify-between">
          <div className="animate-pulse rounded-md bg-stone-200">
            <div className=" text-xl font-bold opacity-0">loading</div>
          </div>
          <div className="relative">
            <div className=" flex animate-pulse items-center gap-2 rounded-full bg-stone-200">
              <div className="relative flex items-center justify-center overflow-hidden rounded-full bg-sky-800 px-6 py-2 font-medium uppercase text-white opacity-0 transition-all active:scale-95">
                Köp
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      whileInView={{ opacity: [0, 1], translateY: [25, 0] }}
      initial={{ opacity: 0 }}
      transition={{
        duration: 0.2,
      }}
    >
      <div
        className={
          !isBeingClicked
            ? "flex h-[28rem] w-[16rem] shrink-0 flex-col rounded-3xl p-5 text-sky-900 transition-all hover:-translate-y-2 hover:shadow-md [&>.img-cont]:hover:shadow-inner [&>div>img]:hover:scale-110 [&>div]:hover:max-h-56"
            : "flex h-[28rem] w-[16rem] shrink-0 scale-95 flex-col rounded-3xl p-5 text-sky-900 transition-all hover:-translate-y-2 hover:shadow-md [&>.img-cont]:hover:shadow-inner [&>div>img]:hover:scale-110 [&>div]:hover:max-h-56"
        }
      >
        <div
          className="img-cont relative flex h-full max-h-60 cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-stone-100 p-4 transition-all"
          onClick={() => {
            router.push(`product/${productName}`);
          }}
          onMouseDown={() => {
            setIsBeingClicked(true);
          }}
          onMouseLeave={() => {
            setIsBeingClicked(false);
          }}
        >
          <Image
            className="mix-blend-multiply transition-all"
            src={imageSrc!}
            width={200}
            height={0}
            alt=""
          />
        </div>
        <div className="info space-y-2 py-2">
          <div className="flex items-center border-b border-stone-100 pb-2 font-medium">
            {brandName}
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
          </div>
          <Link href={`/product/${productName}`} className="font-bold">
            {productName}
          </Link>
          <div className="flex items-center gap-2 text-xs font-medium uppercase">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
            <div>finns i lager</div>
          </div>
        </div>
        <div className="mt-auto flex items-end justify-between">
          <div className="text-xl font-bold">
            {addSpacesForPrice(price!)} kr
          </div>
          <div className="relative">
            <div className=" flex items-center gap-2">
              <button
                onClick={handleBuy}
                className="relative flex items-center justify-center overflow-hidden rounded-full bg-sky-800 px-6 py-2 font-medium uppercase text-white transition-all active:scale-95"
              >
                Köp
                <Ripples opacity={0.5} duration={700} optimize />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
