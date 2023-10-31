// import { NextResponse, NextRequest } from "next/server";
// import ProductModel, { Product } from "../models/ProductModel";
// import "../../utils/connectToDB";
// import getUser from "../utils/getUser";
// import getIsLoggedIn from "../utils/getIsLoggedIn";
// import getBrandNames from "../utils/getBrandNames";
// import getFavs from "../utils/getFavs";

// export async function GET(request: NextRequest, response: any) {
//   console.log("request recived!");

//   // Find all products
//   // const products = await productModel.find();
//   const products: Product[] = await ProductModel.find();
//   const productsToPlainObjects = products.map((item) => {
//     return item.toObject();
//   });

//   const loggedIn = getIsLoggedIn(request);
//   if (loggedIn) {
//     const user = await getUser(request);

//     const productsWithFavs = await getFavs(productsToPlainObjects, user);
//     const productsWFavsAndWBrandNames = await getBrandNames(productsWithFavs);
//     return NextResponse.json(productsWFavsAndWBrandNames, { status: 200 });
//   }
//   return NextResponse.json(products, { status: 200 });
// }
