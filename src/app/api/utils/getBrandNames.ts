import BrandModel from "../models/BrandModel";

import { ProductToPlainObject } from "../models/ProductModel";

const getBrandNames = async (products: ProductToPlainObject[]) => {
  const updatedProducts = await Promise.all(
    products.map(async (product: any) => {
      const frozenProduct = product;
      const brand = await BrandModel.findById("" + product.brand);
      frozenProduct.brandName = brand && brand.name;
      return frozenProduct;
    })
  );
  return updatedProducts;
};
export default getBrandNames;
