import ItemCard from "../components/ItemCard-server-component";
import WebsiteHeader from "../components/WebsiteHeader";
import WebsiteFooter from "../components/WebsiteFooter";
import Image from "next/image";

import { Ripples } from "react-ripples-continued";
import { cookies } from "next/headers";
import { ProductType } from "../types/ProductType";
import { TagOrCategoryOrBrand } from "./admin/products/components/EditOrAddProduct";
import getIsLoggedInFrontEndServerSide from "./utils/getIsLoggedInFrontEndServerSide";
import { revalidatePath } from "next/cache";

async function CategoryBtn({
  title,
  isSkeleton,
}: {
  title?: string;
  isSkeleton?: boolean;
}) {
  if (isSkeleton) {
    return (
      <button className=" relative select-none overflow-hidden rounded-md bg-white px-4 py-1 text-sm font-medium shadow transition-all active:scale-95">
        <div className=" absolute left-0 top-0 h-full w-full animate-pulse bg-stone-300"></div>
        <div className="opacity-0">loading...</div>
      </button>
    );
  }
  return (
    <button className="relative select-none overflow-hidden whitespace-nowrap rounded-md bg-white px-4 py-1 text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow">
      {title}
      <Ripples fillAndHold color="gray" opacity={0.5} optimize />
    </button>
  );
}

function MainCategories({ title, bgUrl }: { title: string; bgUrl: string }) {
  return (
    <div className=" relative flex flex-1 grow items-center justify-center overflow-hidden rounded-xl bg-stone-800 uppercase transition-all hover:-translate-y-2 hover:shadow-lg">
      <div className="relative z-10 font-semibold tracking-widest text-white drop-shadow">
        {title}
      </div>
      <Image
        className="absolute left-0 top-0 z-0 min-h-full w-full opacity-70"
        width={100}
        height={100}
        src={bgUrl}
        alt=""
      />
    </div>
  );
}

export default async function Home() {
  const cookieStore = cookies();
  const isLoggedIn = getIsLoggedInFrontEndServerSide(cookieStore);

  let category: TagOrCategoryOrBrand[] = [];
  async function getBrandsList() {
    const response = await fetch(
      "http://localhost:3000/api/products/categories/get",
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "force-cache",
      },
    );
    const data = await response.json();
    category = data;
  }

  let products: ProductType[] = [];
  async function getProducts() {
    const response = await fetch("http://localhost:3000/api/products/get", {
      method: "get",
      headers: {
        "Contentk-Type": "application/json",
        jwt: isLoggedIn ? cookieStore.get("jwt")!.value : "",
        isGuest: isLoggedIn ? false : true,
        guestCartId: cookieStore.get("guestCart")!.value,
      },
    });

    const data = await response.json();
    products = data;
  }

  await getBrandsList();
  await getProducts();

  return (
    <>
      <div className="px-10 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className=" text-4xl font-bold tracking-tight">
            Hälsa i Harmoni <i className=" font-semibold">– Rena Produkter</i>
          </h1>
          <p className="my-3">
            Endokrina störare är osynliga hot som kan störa vår hormonella
            balans och påverka allt från vår metabolism till reproduktion. Vårt
            engagemang är att erbjuda ett sortiment utan dessa skadliga ämnen,
            för att du ska kunna leva ett friskare och mer harmoniskt liv.
          </p>
        </div>
        <div className="mx-auto mt-10 flex h-80 max-w-7xl gap-4">
          <MainCategories
            title="kläder"
            bgUrl="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <MainCategories
            title="kosmetik"
            bgUrl="https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=2187&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <MainCategories
            title="mat/vatten"
            bgUrl="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=2187&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
      </div>

      <div className="min-h-screen font-poppins">
        <div className=" space-y-4 overflow-auto rounded-3xl bg-stone-100 px-4 py-6">
          <h4 className="text-center font-medium uppercase">
            populära kategorier
          </h4>
          <div className="flex justify-center gap-2 ">
            {category.length > 0 ? (
              category.map((category: TagOrCategoryOrBrand) => {
                return (
                  <div key={category._id}>
                    <CategoryBtn title={category.name} />
                  </div>
                );
              })
            ) : (
              <>
                <CategoryBtn isSkeleton />
                <CategoryBtn isSkeleton />
                <CategoryBtn isSkeleton />
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 overflow-scroll p-4 selection:bg-sky-200">
          {products.length > 0 ? (
            products!.map((product: ProductType) => {
              return (
                <ItemCard
                  isLoggedIn={isLoggedIn}
                  key={product._id}
                  id={product._id}
                  brandName={product.brandName}
                  productName={product.name}
                  imageSrc={product.imgs[0]}
                  price={product.price}
                  isFavourite={product.isFavourite}
                  isInstock={true}
                />
              );
            })
          ) : (
            <>
              <ItemCard isSkeleton />
              <ItemCard isSkeleton />
              <ItemCard isSkeleton />
            </>
          )}
        </div>
      </div>
    </>
  );
}
