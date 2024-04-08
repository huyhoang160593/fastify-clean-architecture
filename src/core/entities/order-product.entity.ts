
export interface OrderProduct {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  created_at?: Date | null;
  update_at?: Date | null;
}
