import { ProductToPlainObject } from "../models/ProductModel";
import { Account } from "../models/AccountModel";

const getFavs = async (
  products: ProductToPlainObject[],
  user: Account,
): Promise<ProductToPlainObject[]> => {
  let productsWithFavs = products.map((product: ProductToPlainObject) => {
    const frozenProduct = product;
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
