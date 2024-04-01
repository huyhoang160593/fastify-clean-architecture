export interface IGenericRepository<T> {
  create(data: T): Promise<T>;
  update(id: string, data: T): Promise<T>;
  delete(id: string): Promise<T>;
  findById(id: string): Promise<T>;
  findAll(): Promise<T[]>;
}