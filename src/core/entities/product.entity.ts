
export interface Product {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  lockBuy: boolean;
  remain: number;
  price: number;
  created_at?: Date | null;
  update_at?: Date | null;
}
