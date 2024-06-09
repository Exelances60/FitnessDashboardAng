export interface Product {
  _id: string;
  name: string;
  price: number;
  amount: number;
  description: string;
  imageUrl: string;
  ownerId: string;
  category: string;
}

export interface GetProductsResponse {
  message: string;
  products: Product[];
}

export interface AddProductResponse {
  message: string;
  product: Product;
  status: number;
}
