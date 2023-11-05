import { Suspense } from "react";
import Home from "./Home";
import ItemCard from "../components/ItemCard-server-component";

function Page() {
  console.log("rerendered pageee");
  return (
    <Suspense
      fallback={
        <div className=" flex gap-2">
          <ItemCard isSkeleton={true} />
          <ItemCard isSkeleton={true} />
          <ItemCard isSkeleton={true} />
          <ItemCard isSkeleton={true} />
        </div>
      }
    >
      <Home />
    </Suspense>
  );
}
export default Page;
