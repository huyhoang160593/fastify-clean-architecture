export interface IGenericRepository<T> {
	create(data: Partial<T>): Promise<T>;
	update(id: string, data: Partial<T>): Promise<T>;
	delete(id: string): Promise<void>;
	findById(id: string): Promise<T>;
	findAll(): Promise<T[]>;
}
