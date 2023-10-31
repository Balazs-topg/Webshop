import ItemCard from "../components/ItemCard";
import WebsiteHeader from "../components/WebsiteHeader";
import WebsiteFooter from "../components/WebsiteFooter";

import { Ripples } from "react-ripples-continued";
import { cookies } from "next/headers";
import { ProductType } from "../types/ProductType";

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
    <button className="relative select-none overflow-hidden whitespace-nowrap rounded-md bg-white px-4 py-1 text-sm font-medium shadow transition-all active:scale-95">
      {title}
      <Ripples fillAndHold color="gray" opacity={0.5} optimize />
    </button>
  );
}

export default async function Home() {
  // const [category, setCategory] = useState([]);
  // const [products, setProducts] = useState([]);

  const cookieStore = cookies();

  let category;
  async function getBrandsList() {
    const response = await fetch(
      "http://localhost:3000/api/products/categories/get",
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();
    category = data;
  }

  console.log("jwt cookies", cookieStore.get("jwt"));

  let products;
  async function getProducts() {
    const response = await fetch("http://localhost:3000/api/products/get", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        jwt: cookieStore.get("jwt")!.value, //! it acutally can be null tho, if the user isn't logged it, it will be null
      },
    });
    const data = await response.json();
    products = data;
  }

  await getBrandsList();
  await getProducts();

  return (
    <>
      <div className="min-h-screen font-poppins">
        <WebsiteHeader />
        <div className="flex gap-2 overflow-auto bg-stone-200 px-4 py-3">
          {category.length > 0 ? (
            category.map((category) => {
              return (
                <div key={category.id}>
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
        <div className="flex items-center gap-2 overflow-scroll p-4 selection:bg-sky-200">
          {products.length > 0 ? (
            products.map((product: ProductType) => {
              return (
                <ItemCard
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
      <WebsiteFooter />
    </>
  );
}
