export type ProductType = {
  _id: string;
  name: string;
  price: number;
  brand: string;
  brandName: string;
  category: string;
  imgs: string[];
  tags: string[];
  isFavourite: boolean;
  quantity?: number;
};
