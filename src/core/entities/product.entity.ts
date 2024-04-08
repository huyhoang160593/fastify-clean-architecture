
export interface Product {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  lockBuy: boolean;
  remain: number;
  price: number;
  createdAt?: Date | null;
  updateAt?: Date | null;
}
