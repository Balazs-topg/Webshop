"use client";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Ripples } from "react-ripples-continued";
import Link from "next/link";
import { getCookie } from "../(frontend-routes)/utils/manageCookies";
import { useRouter } from "next/navigation";

type itemCardTypes = {
  brandName: string;
  productName: string;
  price: number;
  imageSrc: string;
  isInstock: boolean;
  isFavourite: boolean;
  id: string;
};

export default function ItemCard({
  brandName,
  productName,
  imageSrc,
  price,
  isInstock = true,
  isFavourite = false,
  id,
}: itemCardTypes) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFavouriteState, setIsFavouriteState] = useState(isFavourite);

  const handleBuy = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
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
          jwt: getCookie("jwt")!, //! it acutally can be null tho, if the user isn't logged it, it will be null
        },
      }
    );
    const data = await response.json();
  };

  return (
    <motion.div
      whileInView={{ opacity: [0, 1], translateY: [25, 0] }}
      initial={{ opacity: 0 }}
      transition={{
        duration: 0.2,
      }}
    >
      <div className="shrink-0 flex flex-col text-sky-900 p-5 w-[16rem] h-[28rem] rounded-3xl hover:shadow-md [&>div>img]:hover:scale-110 [&>div]:hover:max-h-56 [&>.img-cont]:hover:shadow-inner hover:-translate-y-2 transition-all">
        <div className="img-cont relative bg-stone-100 p-4 max-h-60 h-full transition-all rounded-xl flex justify-center items-center overflow-hidden">
          <img
            onClick={() => {
              router.push(`product/${productName}`);
            }}
            className="mix-blend-multiply transition-all cursor-pointer"
            src={imageSrc}
            alt=""
          />
        </div>
        <div className="info space-y-2 py-2">
          <div className="font-medium border-b border-stone-100 flex items-center pb-2">
            {brandName}
            <button
              className={
                isFavouriteState
                  ? "relative overflow-hidden bg-amber-300 ml-auto rounded-full p-1"
                  : "relative overflow-hidden bg-stone-200 ml-auto rounded-full p-1"
              }
              onClick={handleFavourite}
            >
              <Ripples opacity={0.5} duration={700} optimize />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-4 h-4"
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
          <div className="font-medium text-xs uppercase flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            <div>finns i lager</div>
          </div>
        </div>
        <div className="mt-auto flex justify-between items-end">
          <div className="font-bold text-xl">{price} kr</div>
          <div className="relative">
            <div className=" flex items-center gap-2">
              <button
                onClick={handleBuy}
                className="active:scale-95 relative overflow-hidden font-medium uppercase bg-sky-800 flex items-center transition-all rounded-full justify-center px-6 py-2 text-white"
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
