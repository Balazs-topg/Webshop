import Image from "next/image";
import { Ripples } from "react-ripples-continued";
import Link from "next/link";
import addSpacesForPrice from "../(frontend-routes)/utils/addSpacesForPrice";
import { cookies } from "next/headers";

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
  // const router = useRouter();
  const cookieStore = cookies();
  const jwtToken = cookieStore.get("jwt")!.value; //! could be undef if user is not logged in TODO

  // const [isFavouriteState, setIsFavouriteState] = useState(isFavourite);
  let isFavouriteState = false;
  // const [isBeingClicked, setIsBeingClicked] = useState(false);
  let isBeingClicked = false;

  const handleBuy = async () => {
    const response = await fetch("/api/cart", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        jwt: jwtToken,
      },
      body: JSON.stringify({ productId: id }),
    });
  };

  const handleFavourite = async () => {
    isFavouriteState = !isFavouriteState;
    const response = await fetch(
      `/api/products/${id}/favourite/${
        isFavouriteState ? "un-favourite" : "favourite"
      }`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          jwt: jwtToken,
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
    <>
      <div
        className={
          !isBeingClicked
            ? "flex h-[28rem] w-[16rem] shrink-0 flex-col rounded-3xl p-5 text-sky-900 transition-all hover:-translate-y-2 hover:shadow-md [&>.img-cont]:hover:shadow-inner [&>div>a>img]:hover:scale-110 [&>div]:hover:max-h-56"
            : "flex h-[28rem] w-[16rem] shrink-0 scale-95 flex-col rounded-3xl p-5 text-sky-900 transition-all hover:-translate-y-2 hover:shadow-md [&>.img-cont]:hover:shadow-inner [&>div>a>img]:hover:scale-110 [&>div]:hover:max-h-56"
        }
      >
        <div className="img-cont relative flex h-full max-h-60 cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-stone-100 transition-all">
          <Link
            href={`product/${productName}`}
            className=" flex h-full w-full items-center justify-center p-4"
          >
            <Image
              className="mix-blend-multiply transition-all"
              src={imageSrc!}
              width={200}
              height={0}
              alt=""
            />
          </Link>
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
              // onClick={handleFavourite}
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
                // onClick={handleBuy}
                className="relative flex items-center justify-center overflow-hidden rounded-full bg-sky-800 px-6 py-2 font-medium uppercase text-white transition-all active:scale-95"
              >
                Köp
                <Ripples opacity={0.5} duration={700} optimize />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
