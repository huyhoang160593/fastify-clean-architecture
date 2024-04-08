
export interface OrderProduct {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  createdAt?: Date | null;
  updateAt?: Date | null;
}
