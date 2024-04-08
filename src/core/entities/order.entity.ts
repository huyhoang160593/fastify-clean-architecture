
export interface Order {
  id: string;
  userId: string;
  sellerId: string | null;
  customAddress: string | null;
  customPhoneNumber: string | null;
  createdAt?: Date | null;
  updateAt?: Date | null;
}
