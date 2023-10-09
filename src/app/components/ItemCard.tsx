"use client";
import { Button } from "@/components/ui/button";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useState } from "react";

type itemCardTypes = {
  brandName: string;
  productName: string;
  image: string;
  isInstock: boolean;
  isFavourite: boolean;
};

export default function ItemCard({
  brandName,
  productName,
  image,
  isInstock = true,
  isFavourite = false,
}: itemCardTypes) {
  const [isLoading, setIsLoading] = useState(false);

  const handleBuy = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
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
            className="mix-blend-multiply transition-all"
            src={image}
            alt=""
          />
        </div>
        <div className="info space-y-2 py-2">
          <div className="font-medium border-b border-stone-100 flex items-center pb-2">
            {brandName}
            <button className="bg-stone-200 ml-auto rounded-full p-1">
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
          <div className="font-bold">{productName}</div>
          <div className="font-medium text-xs uppercase flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            <div>finns i lager</div>
          </div>
        </div>
        <div className="mt-auto flex justify-between items-end">
          <div className="font-bold text-xl">32 kr</div>
          <div className="relative">
            <div className=" flex items-center gap-2">
              <Button
                onClick={handleBuy}
                className="relative bg-sky-800 flex items-center transition-all overflow-hidden rounded-full justify-center px-6 py-2 text-white [&>.dot]:hover:w-20 [&>.dot]:hover:h-20"
              >
                <div className=" z-10 uppercase font-semibold text-sm transition-all">
                  {!isLoading && <div>köp</div>}
                  {isLoading && <div className=""> </div>}
                </div>
                <div className="dot absolute top-1/2 -translate-y-1/2 rounded-full z-0 w-0 h-2 bg-sky-600 transition-all"></div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
