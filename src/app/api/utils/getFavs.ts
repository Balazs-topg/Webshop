import { ProductToPlainObject } from "../models/ProductModel";

const getFavs = async (products: ProductToPlainObject[], user: any) => {
  // get favs
  let productsWithFavs = products.map((product: ProductToPlainObject) => {
    const frozenProduct = product
      ? product
      : { ...(product as ProductToPlainObject) };
    if (user.favourites.map(String).includes(product._id.toString())) {
      frozenProduct.isFavourite = true;
    } else {
      frozenProduct.isFavourite = false;
    }
    return frozenProduct;
  });
  return productsWithFavs;
};
export default getFavs;
