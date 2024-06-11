import { Product } from './product-interface';

export interface OrderForm {
  productName: string;
  amount: number;
  price: number;
  address: string;
  phone: string;
  email: string;
  orderOwner: string;
}

export interface Order {
  _id: string;
  amount: number;
  products: Product[] | string[];
  adress: string;
  totalPrice: number;
  status: 'Pending' | 'Completed' | 'Cancelled' | 'Preparing';
  orderOwner: string;
  phone: number;
  createdAt: string;
  updatedAt: string;
  creator: string;
  orderOwnerEmail: string;
  orderImage: string;
  orderCategory: string;
}

export interface OrderResponse {
  orders: Order;
  message: string;
  status: number;
}

export interface OrderCardData {
  increasePercentageForAmount: number;
  increasePercentageForCompletedSales: number;
  increasePercentageForSales: number;
  totalOrders: number;
  totalSalesCompleted: number;
  totalSalesPrice: number;
}

export interface GetOrderResponse {
  orders: Order[];
  message: string;
  status: number;
  cardData: OrderCardData;
}
