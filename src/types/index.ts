import { ComparisonExpressionOperatorReturningBoolean } from 'mongoose';

export interface ICartProduct {
  product: string; //id of this product in the product model
  price: Number; //current price of this product in the cart as of the day it was purchased
  quantity: Number; //quantity of this product in the cart
}
export interface IShippingAddress {
  recieversName: string;
  contact: string;
  address: string;
}
export interface IPaymentDetails {
  given_name: string;
  surname: string;

  payer_id: string;

  country_code: string;

  email: string;
  orderId: string;
}

export interface IOrder {
  cartProducts: ICartProduct[];
  totalPrice: Number;
  shippingAddress: IShippingAddress;
  paymentDetails: IPaymentDetails;
  paid: Boolean;
  delivered: Boolean;
}

export interface ICart {
  user: string;
  orders: IOrder[];
}
