export interface Category {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  createdAt?: Date | null;
  updateAt?: Date | null;
}
