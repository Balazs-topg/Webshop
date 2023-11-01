"use client";
import React, {
  ReactEventHandler,
  use,
  useEffect,
  useMemo,
  useState,
} from "react";
import WebsiteHeader from "@/app/components/WebsiteHeader";
import WebsiteFooter from "@/app/components/WebsiteFooter";
import addSpacesForPrice from "../utils/addSpacesForPrice";
import adminIcons from "../admin/adminIcons";
import { getCookie } from "../utils/manageCookies";

import { Ripples } from "react-ripples-continued";
import { ProductType } from "@/app/types/ProductType";

interface CartItemInterface {
  name: string;
  price: number;
  img: string;
  brand: string;
  count: number;
  id: string;
  updateQuantity: Function;
  removeItemFromCart: Function;
  isFavouriteProp: boolean;
}

function CartItem({
  name,
  price,
  img,
  brand,
  count,
  id,
  updateQuantity,
  removeItemFromCart,
  isFavouriteProp,
}: CartItemInterface) {
  const [productCount, setProductCount] = useState(count);
  const [isFavourite, setIsFavourite] = useState(isFavouriteProp);

  const handleFavourite = async () => {
    setIsFavourite(!isFavourite);
    const response = await fetch(
      `/api/products/${id}/favourite/${
        isFavourite ? "un-favourite" : "favourite"
      }`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          jwt: getCookie("jwt")!, //! TODO it acutally can be null tho, if the user isn't logged it, it will be null
        },
      },
    );
    const data = await response.json();
  };

  const handleDecrement = () => {
    let newQuantity = productCount - 1;
    if (newQuantity <= 0) newQuantity = 1;
    setProductCount(newQuantity);
    setNewQQt(newQuantity);
    updateQuantity(id, newQuantity);
  };
  const handleIncrement = () => {
    let newQuantity = productCount + 1;
    if (newQuantity <= 0) newQuantity = 1;
    setProductCount(newQuantity);
    setNewQQt(newQuantity);
    updateQuantity(id, newQuantity);
  };

  const [timeOutId, setTimeOutId] = useState<any>(count);
  const setNewQQt = async (qqt = 0) => {
    const callApi = async () => {
      const response = await fetch("/api/cart", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          jwt: getCookie("jwt")!,
        },
        body: JSON.stringify({
          itemId: id,
          newQuantity: qqt,
        }),
      });
      const data = await response.json();
    };

    // Clear the previous timeout if it exists
    if (timeOutId) {
      clearTimeout(timeOutId);
    }

    // Set a new timeout
    const newTimeoutID = setTimeout(async () => {
      callApi();
    }, 200); // 1 second delay

    setTimeOutId(newTimeoutID);
  };
  return (
    <div className="flex gap-2 rounded-lg border-b-2 border-stone-100 px-2 pb-2">
      <div className="flex aspect-square w-24 justify-center overflow-hidden rounded-sm bg-stone-100">
        <img src={img} alt="" />
      </div>
      <div className="flex flex-col">
        <strong className="text-sm font-semibold text-sky-800">{brand}</strong>
        <strong className="mb-auto font-medium">{name}</strong>
        <strong className="font-bold text-sky-800">
          {addSpacesForPrice(price * count)} kr
        </strong>
      </div>
      <div className="ml-auto flex flex-col items-end">
        <div className="mb-auto flex gap-1">
          <button
            onClick={() => {
              removeItemFromCart(id);
            }}
            className="relative flex items-center justify-center overflow-hidden rounded-full bg-stone-100 p-1 transition-all active:scale-95"
          >
            {adminIcons.trash}
            <Ripples fillAndHold color="gray" opacity={0.5} optimize />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleFavourite}
            className={
              isFavourite
                ? "relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-amber-300 p-1 transition-all active:scale-95"
                : "relative flex h-8 w-8 items-center justify-center overflow-hidden  rounded-full bg-stone-100 p-1 transition-all active:scale-95"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
            <Ripples fillAndHold color="gray" opacity={0.5} optimize />
          </button>
          <div className="ml-auto flex gap-1 rounded-full bg-stone-100 p-1 text-lg font-semibold">
            <button
              onClick={handleDecrement}
              className="relative flex h-8 w-8 select-none items-center justify-center overflow-hidden rounded-full bg-white transition-all hover:shadow active:scale-95"
            >
              -
              <Ripples fillAndHold color="gray" opacity={0.5} optimize />
            </button>
            <input
              type="number"
              className="flex w-10 justify-center bg-stone-100 text-center outline-none"
              step={1}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                let intValue = Math.floor(+e.currentTarget.value);
                if (intValue <= 0) {
                  intValue = 1; // Set to default value of 1
                }
                e.currentTarget.value = String(intValue); // Update the input value to be the integer value
                setProductCount(+e.currentTarget.value);
                setNewQQt(+e.currentTarget.value);
                updateQuantity(id, +e.currentTarget.value);
              }}
              value={productCount}
            />
            <button
              onClick={handleIncrement}
              className="relative flex h-8 w-8 select-none items-center justify-center overflow-hidden rounded-full bg-white transition-all hover:shadow active:scale-95"
            >
              +
              <Ripples fillAndHold color="gray" opacity={0.5} optimize />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const updateCartItemQuantity = (itemId: string, newQuantity: number) => {
    setCartItems((prevItems: any) =>
      prevItems.map((item: any) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  useMemo(() => {
    let totalPrice = 0;
    cartItems.forEach((product: ProductType) => {
      totalPrice = totalPrice + +product.price * product.quantity!;
    });
    console.log(totalPrice);
    setTotalPrice(totalPrice);
  }, [cartItems]);

  const totalItemsCount = (cartItems: ProductType[]) => {
    let cartItemsCount = 0;
    cartItems.forEach((cartItem: any) => {
      cartItemsCount = cartItemsCount + cartItem.quantity;
    });
    return cartItemsCount;
  };

  const removeItemFromCart = async (id: string) => {
    setCartItems(
      cartItems.filter((item: any) => (item._id !== id ? true : false)),
    );
    const response = await fetch("/api/cart", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        jwt: getCookie("jwt")!,
      },
      body: JSON.stringify({
        itemId: id,
      }),
    });
    const data = await response.json();
  };

  const getCartItems = async () => {
    const response = await fetch("/api/cart", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        jwt: getCookie("jwt")!,
      },
    });
    const data = await response.json();
    setCartItems(data);
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      <div className="mx-auto min-h-screen max-w-lg space-y-4 p-6">
        <h1 className="flex text-3xl font-semibold text-sky-800">
          Kundvagn{" "}
          <span className="ml-auto opacity-50">
            ({totalItemsCount(cartItems)})
          </span>
        </h1>
        <div className="mt-4 flex flex-col gap-2 rounded-lg">
          {cartItems &&
            cartItems.map((cartItem: any) => {
              return (
                <CartItem
                  isFavouriteProp={cartItem.isFavourite}
                  removeItemFromCart={removeItemFromCart}
                  updateQuantity={updateCartItemQuantity}
                  id={cartItem._id}
                  key={cartItem._id}
                  name={cartItem.name}
                  price={cartItem.price}
                  img={cartItem.imgs[0]}
                  brand={cartItem.brandName}
                  count={cartItem.quantity}
                />
              );
            })}
          <div className="mt-2 flex justify-between gap-2 border-stone-100 px-2 font-semibold">
            Total summa:
            <span>{addSpacesForPrice(totalPrice)} kr</span>
          </div>
        </div>
        <button className="relative w-full overflow-hidden rounded-sm bg-sky-800 p-3 text-white outline-offset-4 transition-all active:scale-[0.97]">
          Till kassan
          <Ripples duration={1000} fillAndHold opacity={0.4} optimize />
        </button>
      </div>
    </>
  );
}

export default Cart;
